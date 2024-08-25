import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Share, MoreHorizontal, Download } from "lucide-react";
import Image from "next/image";
import BackButton from "@/components/global/BackButton";

const DetailPage = () => {
  return (
    <div className="mx-auto px-2 py-8">
      <div className="fixed z-[100] pl-4">
        <BackButton></BackButton>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl max-w-[1016px] mx-auto">
        <div className="md:w-1/2">
          <div className="relative rounded-xl">
            <Image
              src="https://i.pinimg.com/originals/47/d2/d8/47d2d8fb5b55f27eb7b6d0421c374097.jpg"
              alt="Pin Image"
              className="rounded-xl w-full h-auto object-cover"
              priority
              width={600}
              height={800}
            />
          </div>
        </div>

        {/* Pin Details */}
        <div className="md:w-1/2">
          <div className="p-3 space-y-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-3xl font-bold text-muted pointer-events-none">
              Beautiful Landscape Photography
            </h1>

            <p className="text-muted-foreground">
              Capture the essence of nature with these stunning landscape
              photography techniques. Learn how to use light, composition, and
              perspective to create breathtaking images.
            </p>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="@username"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-muted">Username</p>
                <p className="text-sm text-muted-foreground">1.5k followers</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1">
                <Heart className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Pins */}
      <div className="mt-12 container">
        <h2 className="text-2xl font-bold mb-6 text-center">More like this</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="relative group">
              <Image
                src={`https://picsum.photos/seed/picsum/200/300`}
                alt={`Related Pin ${i + 1}`}
                className="rounded-lg w-full h-auto object-cover"
                width={200}
                height={200 + i * 20}
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Save
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
