
'use client';

import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ImagePlus, X, MapPin } from 'lucide-react';
import Image from 'next/image';
import { repairCategories } from '@/lib/data';

const repairFormSchema = z.object({
  itemName: z.string().min(3, 'Item name must be at least 3 characters.'),
  category: z.string().min(1, 'Please select a category.'),
  issueDescription: z.string().min(10, 'Please describe the issue in detail.'),
  location: z.string().min(3, 'Please enter a valid location.'),
  image: z.any().optional(),
});

type RepairFormValues = z.infer<typeof repairFormSchema>;

interface RepairFormProps {
  onSubmit: () => void;
}

export function RepairForm({ onSubmit }: RepairFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<RepairFormValues>({
    resolver: zodResolver(repairFormSchema),
    defaultValues: {
      itemName: '',
      category: '',
      issueDescription: '',
      location: '',
      image: null,
    },
  });

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
  };

  const handleFormSubmit = async (values: RepairFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you would save this to Firestore
      console.log('Repair Request Submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Repair Request Submitted!',
        description: 'A nearby repair shop will be in touch with you shortly.',
      });
      onSubmit();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was a problem submitting your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., iPhone 12 Pro" {...field} />
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
                    <SelectValue placeholder="Select item category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {repairCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
          name="issueDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the problem with your item..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
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
                    <FormLabel>Upload Image/Video of Issue</FormLabel>
                    <FormControl>
                        <div>
                            <Input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleImageChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            {!imagePreview ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full flex items-center gap-2"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <ImagePlus className="h-5 w-5" />
                                    Upload Media
                                </Button>
                            ) : (
                                <div className="relative group w-full aspect-video rounded-md overflow-hidden">
                                    <Image
                                        src={imagePreview}
                                        alt="Issue preview"
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
                                            <span className="sr-only">Remove Media</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Location</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                    <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                </FormControl>
                <Button type="button" variant="outline" size="icon" aria-label="Auto-detect location">
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Repair Request
        </Button>
      </form>
    </Form>
  );
}
