import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ImageIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold px-1">Aura</h1>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Aura Bro Meow
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Boost your productivity with our intuitive task management
                  platform. Organize, collaborate, and achieve more.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 rounded-lg">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Task Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  Easily create, categorize, and prioritize tasks to streamline
                  your workflow.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  Share tasks, assign responsibilities, and communicate
                  effectively with your team.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  Monitor your progress with intuitive dashboards and detailed
                  reports.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sarah K.</CardTitle>
                  <CardDescription>Project Manager</CardDescription>
                </CardHeader>
                <CardContent>
                  TaskMaster Pro has completely transformed the way my team
                  operates. Highly recommend!
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Alex M.</CardTitle>
                  <CardDescription>Freelance Designer</CardDescription>
                </CardHeader>
                <CardContent>
                  As a freelancer, staying organized is crucial. This platform
                  has been a game-changer for my productivity.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emily R.</CardTitle>
                  <CardDescription>Small Business Owner</CardDescription>
                </CardHeader>
                <CardContent>
                  The collaboration features have made it so much easier to
                  delegate tasks and keep my team aligned.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 rounded-lg bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Simple Pricing
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individuals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$9.99/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li>Up to 100 tasks</li>
                    <li>Basic reporting</li>
                    <li>1 user</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For small teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$24.99/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li>Unlimited tasks</li>
                    <li>Advanced reporting</li>
                    <li>Up to 10 users</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">Custom</p>
                  <ul className="mt-4 space-y-2">
                    <li>Unlimited everything</li>
                    <li>Premium support</li>
                    <li>Custom integrations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to boost your productivity?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of satisfied users and start organizing your
                  tasks like a pro.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/register">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TaskMaster Pro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
