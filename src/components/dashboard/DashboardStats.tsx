import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag } from "lucide-react";

interface DashboardStatsProps {
    stats?: {
        itemsSold: number;
        totalEarnings: number;
        activeListings: number;
    }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    if (!stats) return null;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Items Sold
                    </CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.itemsSold}</div>
                    <p className="text-xs text-muted-foreground">
                        All-time sales
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Earnings
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                        Revenue from sales
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeListings}</div>
                    <p className="text-xs text-muted-foreground">
                        Items currently for sale
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
