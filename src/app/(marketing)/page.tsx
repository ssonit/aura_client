import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import MarketingForm from "@/components/global/MarketingForm";

const discover = [
  {
    id: 1,
    src: "/assets/interior_design_inspiration.jpg",
    alt: "Interior design inspiration",
  },
  {
    id: 2,
    src: "/assets/fashion_inspiration.jpg",
    alt: "Fashion inspiration",
  },
  {
    id: 3,
    src: "/assets/food_recipe.jpg",
    alt: "Food recipe inspiration",
  },
  {
    id: 4,
    src: "/assets/travel.jpg",
    alt: "Travel inspiration",
  },
];

const categories = [
  {
    id: 1,
    title: "Home Decor",
    src: "/assets/home_decor.jpg",
    alt: "Home decor",
  },
  {
    id: 2,
    title: "Recipes",
    src: "/assets/recipe.jpg",
    alt: "Food recipe",
  },
  {
    id: 3,
    title: "Fashion",
    src: "/assets/fashion_inspiration.jpg",
    alt: "Fashion",
  },
  {
    id: 4,
    title: "Travel",
    src: "/assets/travel_free.jpg",
    alt: "Travel",
  },
  {
    id: 5,
    title: "DIY & Crafts",
    src: "/assets/diy_crafts.jpg",
    alt: "DIY & Crafts",
  },
  {
    id: 6,
    title: "Technology",
    src: "/assets/technology.jpg",
    alt: "Technology",
  },
  {
    id: 7,
    title: "Health & Fitness",
    src: "/assets/health_fitness.jpg",
    alt: "Health & Fitness",
  },
  { id: 8, title: "Art", src: "/assets/art.jpg", alt: "Art" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PinIcon className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-2xl font-bold text-red-500">PinSpire</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
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
            Business
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Blog
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-10 md:py-24 lg:py-28 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Get your next creative idea
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover recipes, home ideas, style inspiration and other
                    ideas to try.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <MarketingForm />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By signing up, you agree to our Terms of Service.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-[400px] gap-2 sm:grid-cols-2 md:max-w-[700px] lg:max-w-[900px]">
                {discover.map((item) => (
                  <Card
                    key={item.id}
                    className="h-[200px] sm:h-[250px] lg:h-[300px] overflow-hidden"
                  >
                    <CardContent className="p-0 w-full h-full">
                      <Image
                        alt={item.alt}
                        className="object-cover w-full h-full"
                        height="300"
                        src={item.src}
                        style={{
                          aspectRatio: "300/300",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How PinSpire works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <SearchIcon className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">Search for ideas</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Find inspiration for your projects, hobbies, and more with our
                  powerful search.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <SaveIcon className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">Save what you love</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Collect and organize your favorite ideas into boards for easy
                  access.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <ShareIcon className="h-10 w-10 text-red-500" />
                <h3 className="text-xl font-bold">Share and collaborate</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with others, share your ideas, and collaborate on
                  projects.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Explore popular categories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      alt={`${category.alt} inspiration`}
                      className="object-cover w-full h-48"
                      height="160"
                      src={category.src}
                      style={{
                        aspectRatio: "320/160",
                        objectFit: "cover",
                      }}
                      width="320"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{category.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to get inspired?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join millions of people discovering and sharing ideas on
                  PinSpire.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/register">Sign up now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 PinSpire. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookies
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function PinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SaveIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function ShareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
