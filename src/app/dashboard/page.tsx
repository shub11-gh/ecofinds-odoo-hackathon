import { DashboardForm } from "@/components/dashboard/DashboardForm";
import { EcoScoreDisplay } from "@/components/dashboard/EcoScoreDisplay";
import { mockUser } from "@/lib/data";

export default function DashboardPage() {
    // In a real app, you would fetch the current user's data.
    const user = mockUser;

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <DashboardForm user={user} />
                </div>
                <div className="lg:col-span-1">
                    <EcoScoreDisplay user={user} />
                </div>
            </div>
        </div>
    );
}
