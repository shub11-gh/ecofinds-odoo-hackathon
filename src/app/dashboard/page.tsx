
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardForm } from "@/components/dashboard/DashboardForm";
import { EcoScoreDisplay } from "@/components/dashboard/EcoScoreDisplay";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { mockUser } from "@/lib/data"; // Keep for default structure

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If there's no user and the auth check has completed, redirect to login
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // Show a loading state or nothing while redirecting or waiting for user data
    if (!user) {
        return null; // Or a loading spinner
    }

    // Combine logged-in user data with mock data for fields that aren't in the context yet
    const displayUser = {
        ...mockUser, // provides stats, activity, etc.
        ...user,     // provides username, email, etc.
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <DashboardStats stats={displayUser.stats} />
                    <ActivityChart data={displayUser.activity} />
                    <DashboardForm user={displayUser} />
                </div>
                <div className="lg:col-span-1">
                    <EcoScoreDisplay user={displayUser} />
                </div>
            </div>
        </div>
    );
}
