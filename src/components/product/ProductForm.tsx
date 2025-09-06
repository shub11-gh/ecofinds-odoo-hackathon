'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import type { Product, Category, SubCategory } from '@/lib/types';
import { generateEcoScore } from '@/ai/flows/personalized-eco-score';
import { ImagePlus, Loader2, X } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  category: z.custom<Category>(val => categories.map(c => c.name).includes(val as Category), {
    message: "Please select a valid category"
  }),
  subcategory: z.string().min(1, "Please select a sub-category"),
  image: z.any().optional(),
});

type ProductFormProps = {
  product?: Product;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    product?.imageUrl || null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || undefined,
      subcategory: product?.subcategory || '',
    },
  });

  const selectedCategory = form.watch('category');
  const subcategories = categories.find(c => c.name === selectedCategory)?.subcategories || [];

  React.useEffect(() => {
    // Reset subcategory if category changes and the old subcategory is not valid anymore
    if (!subcategories.includes(form.getValues('subcategory') as SubCategory<Category>)) {
        form.setValue('subcategory', '');
    }
  }, [selectedCategory, subcategories, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('image', null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log('Form submitted:', values);

      const ecoScoreResult = await generateEcoScore({
        userProfile: 'A user named SustainableSam is creating a new listing.',
        productListing: JSON.stringify({
            title: values.title,
            description: values.description,
            price: values.price,
            category: values.category,
        }),
      });

      console.log('EcoScore Result:', ecoScoreResult);

      toast({
        title: product ? 'Listing Updated!' : 'Listing Created!',
        description: 'Your product is now live on EcoFinds.',
      });

      if (ecoScoreResult.shouldDisplayInformation) {
        toast({
            title: "Eco-Score Update!",
            description: `New certification: ${ecoScoreResult.certificationLevel}. Check your dashboard for new tips!`,
        });
      }
      
      router.push('/my-listings');
      router.refresh();
    } catch (error) {
      console.error('Failed to submit listing:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Vintage Leather Jacket" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>
                            {cat.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sub-category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCategory}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a sub-category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {subcategories.map((subcat) => (
                                <SelectItem key={subcat} value={subcat}>
                                {subcat}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
           
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item in detail..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="image"
                render={() => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                                {!imagePreview ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full flex items-center gap-2"
                                        onClick={() => fileInput-ref.current?.click()}
                                    >
                                        <ImagePlus className="h-5 w-5" />
                                        Upload Image
                                    </Button>
                                ) : (
                                    <div className="relative group w-full aspect-video rounded-md overflow-hidden">
                                        <Image
                                            src={imagePreview}
                                            alt="Product preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={handleRemoveImage}
                                            >
                                                <X className="h-5 w-5" />
                                                <span className="sr-only">Remove Image</span>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>
                           Upload a clear image of your item.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {product ? 'Save Changes' : 'Submit Listing'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
