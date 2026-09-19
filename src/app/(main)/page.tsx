import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { Flame, Plus, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Design System Showcase</h1>
        <p className="text-muted-foreground">Premium, clean, and mobile-first.</p>
      </header>

      {/* Typography & Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">Buttons & Actions</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="icon"><Plus className="w-5 h-5" /></Button>
        </div>
      </section>

      {/* Cards, Badges & Progress */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">Cards & Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Daily Meditation</CardTitle>
              <Badge variant="success">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold">12 Days</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress to 14 days</span>
                  <span>85%</span>
                </div>
                <ProgressBar value={85} max={100} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Check In Today</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Read 10 Pages</CardTitle>
              <Badge variant="outline">Lost</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="w-5 h-5 text-muted-foreground" />
                <span className="text-2xl font-bold text-muted-foreground">0 Days</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress to 7 days</span>
                  <span>0%</span>
                </div>
                <ProgressBar value={0} max={100} className="bg-muted" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Restart Streak</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">Forms</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Streak Name</label>
              <Input placeholder="e.g., Drink 2L of water" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Empty State */}
      <section className="space-y-6 pb-20">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">Empty States</h2>
        <EmptyState 
          icon={<CheckCircle2 className="w-8 h-8" />}
          title="No active streaks"
          description="You haven't created any streaks yet. Start building better habits today."
          action={<Button><Plus className="w-4 h-4 mr-2" /> Create Streak</Button>}
        />
      </section>
    </div>
  );
}
