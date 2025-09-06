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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { generateEcoScore } from '@/ai/flows/personalized-eco-score';
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long.'),
  email: z.string().email('Please enter a valid email address.'),
});

interface DashboardFormProps {
    user: User;
}

export function DashboardForm({ user }: DashboardFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log('Profile updated:', values);

      const ecoScoreResult = await generateEcoScore({
        userProfile: `User ${values.username} (${values.email}) has updated their profile.`,
      });
      
      console.log('EcoScore Result:', ecoScoreResult);

      toast({
        title: 'Profile Updated!',
        description: 'Your changes have been saved.',
      });

       if (ecoScoreResult.shouldDisplayInformation) {
        toast({
            title: "Eco-Score Update!",
            description: `New certification: ${ecoScoreResult.certificationLevel}. Check your new tips!`,
        });
      }

      // In a real app, you would refetch the user data here.
      // For now, we just refresh the page.
      router.refresh();
    } catch (error) {
      console.error('Failed to update profile:', error);
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
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user.username}`} alt={user.username} />
              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline text-2xl">Profile Settings</CardTitle>
                <CardDescription>Manage your account details.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>We'll never share your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
