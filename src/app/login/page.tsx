import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Log in to your EcoFinds account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Login</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
