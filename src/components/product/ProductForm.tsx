'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

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
import type { Product } from '@/lib/types';
import { generateEcoScore } from '@/ai/flows/personalized-eco-score';
import { ImagePlus, Loader2 } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  category: z.enum(categories),
});

type ProductFormProps = {
  product?: Product;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || categories[0],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Here you would typically save the product to your database.
      // We'll simulate that and then call the AI.
      console.log('Form submitted:', values);

      // Call the GenAI flow
      const ecoScoreResult = await generateEcoScore({
        userProfile: 'A user named SustainableSam is creating a new listing.',
        productListing: JSON.stringify(values),
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
      
      // Redirect to my listings page
      router.push('/my-listings');
      router.refresh(); // To show the new item
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
                        <SelectItem key={cat} value={cat}>
                          {cat}
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
            
            <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <Button type="button" variant="outline" className="w-full flex items-center gap-2">
                        <ImagePlus className="h-5 w-5" />
                        + Add Image (Placeholder)
                    </Button>
                </FormControl>
                <FormDescription>
                    This is a placeholder. In a real app, you would upload an image.
                </FormDescription>
            </FormItem>

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
