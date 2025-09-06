
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import type { RepairShop } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Phone, MapPin } from "lucide-react";

interface RepairShopCardProps {
  shop: RepairShop;
}

export function RepairShopCard({ shop }: RepairShopCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-xl">{shop.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <MapPin className="h-4 w-4" />
                    {shop.distance}
                </CardDescription>
            </div>
            <Badge variant="secondary">{shop.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{shop.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
            <Phone className="mr-2 h-4 w-4" />
            {shop.contact}
        </Button>
      </CardFooter>
    </Card>
  );
}
