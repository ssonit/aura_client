import AddBoardModal from "@/components/global/AddBoardModal";
import InfoProfile from "@/components/profile/InfoProfile";
import ProfileActions from "@/components/profile/ProfileActions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { Pen } from "lucide-react";
import Image from "next/image";
import { cookies } from "next/headers";
import { handleListBoardsByUser } from "@/actions/pins";

const ProfilePage = async () => {
  const access_token = getCookie("access_token", { cookies }) as string;
  const data = await handleListBoardsByUser(access_token);
  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfoProfile></InfoProfile>

        <ProfileActions></ProfileActions>

        {!data && <div className="text-center text-xl">No content</div>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data &&
            data.data.map((board) => (
              <div
                key={board.id}
                className="relative overflow-hidden group cursor-pointer"
              >
                <div className="relative">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      alt={board.id}
                      className="object-cover transition-transform rounded-lg"
                      fill
                      src={`https://picsum.photos/seed/1/400/400`}
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
                  <h2 className="text-2xl font-semibold py-1">{board.name}</h2>
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
