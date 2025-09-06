"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { UserActivity } from "@/lib/types"

interface ActivityChartProps {
    data?: UserActivity[];
}

export function ActivityChart({ data }: ActivityChartProps) {
    if (!data) return null;
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>Your listings and sales over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{ 
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Legend iconSize={10} />
                        <Bar dataKey="listings" fill="hsl(var(--primary))" name="Listings" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="sales" fill="hsl(var(--accent))" name="Sales" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
