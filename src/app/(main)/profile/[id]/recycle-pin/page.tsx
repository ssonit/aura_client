"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Pin } from "@/types/pin";
import { handleListSoftDeletedPins, handleRestorePin } from "@/actions/pins";
import { getCookie } from "cookies-next";
import { formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function RestorePinsPage() {
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [deletedPins, setDeletedPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPins = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await handleListSoftDeletedPins({
          access_token,
        });

        if (res.data) {
          setDeletedPins(res.data);
        }
      } catch (err) {
        setError("Failed to fetch deleted pins. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPins();
  }, [access_token]);

  const handleRestore = async (id: string) => {
    try {
      await handleRestorePin({
        id,
        access_token,
      });
      setDeletedPins((pins) => pins.filter((pin) => pin.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-[200px] w-full rounded-md" />
                <div className="flex items-center mt-2">
                  <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (deletedPins.length === 0) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No deleted pins</AlertTitle>
          <AlertDescription>
            You do not have any deleted pins to restore.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deletedPins.map((pin) => (
          <Card key={pin.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{pin.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-square max-h-[280px] w-full">
                <Image
                  src={pin.media.url}
                  alt={pin.id}
                  className="object-cover rounded-md w-full h-full"
                  width={400}
                  height={400}
                  sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
                  loading="lazy"
                />
              </div>
              {pin.deleted_at ? (
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Deleted: {formatDate(pin.deleted_at)}</span>
                </div>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleRestore(pin.id)}
                disabled={isLoading}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Restore Pin
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-5 mb-4">
        <Button
          variant="white"
          size={"icon"}
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Restore Deleted Pins</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-150px)]">
        {renderContent()}
      </ScrollArea>
    </div>
  );
}
