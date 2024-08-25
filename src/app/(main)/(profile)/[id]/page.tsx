import AddBoardModal from "@/components/global/AddBoardModal";
import ProfileActions from "@/components/profile/ProfileActions";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Share2, MoreHorizontal, Pen } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Image
            alt="Profile picture"
            className="mx-auto mb-4 rounded-full"
            height="128"
            src="https://picsum.photos/seed/1/400/400"
            style={{
              aspectRatio: "128/128",
              objectFit: "cover",
            }}
            width="128"
          />
          <h1 className="text-3xl font-bold">Jane Doe</h1>
          <p className="text-gray-500">@janedoe</p>
          <p className="mt-2 text-gray-700">
            Creative designer and photography enthusiast
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <div>
              <span className="font-semibold">1.5k</span> followers
            </div>
            <div>
              <span className="font-semibold">843</span> following
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <Button>Follow</Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="icon" variant="outline">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>

        <ProfileActions></ProfileActions>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    alt={`Pin ${i + 1}`}
                    className="object-cover transition-transform rounded-lg"
                    fill
                    src={`https://picsum.photos/seed/${i}/400/400`}
                  />
                </AspectRatio>
                <Button
                  className="absolute bottom-2 right-2 opacity-0 z-30 group-hover:opacity-100 transition-opacity rounded-full"
                  size="icon"
                  variant="secondary"
                >
                  <Pen className="w-4 h-4"></Pen>
                </Button>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />

              <div className="text-foreground">
                <h2 className="text-2xl font-semibold py-1">Pin {i + 1}</h2>
                <div className="font-light text-sm">100 Pins</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AddBoardModal></AddBoardModal>
    </div>
  );
};

export default ProfilePage;
