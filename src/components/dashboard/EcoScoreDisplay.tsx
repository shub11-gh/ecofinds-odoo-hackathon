'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Award, CheckCircle } from 'lucide-react';
import type { User } from "@/lib/types";

interface EcoScoreDisplayProps {
  user: User;
}

export function EcoScoreDisplay({ user }: EcoScoreDisplayProps) {
  const score = user.ecoScore || 0;
  const tips = user.ecoTips || [];
  const certification = user.ecoCertification || 'Unranked';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline text-2xl">Your Eco-Score</CardTitle>
                <CardDescription>Your impact on the sustainable community.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-accent" />
                <Badge variant={certification === 'Gold' ? 'default' : 'secondary'} className="text-lg">{certification}</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
            <span className="text-lg font-bold text-primary">{score} / 100</span>
          </div>
          <Progress value={score} className="h-4" />
        </div>

        {tips.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent"/>Personalized Tips</h3>
            <ul className="space-y-2 text-sm list-inside">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
