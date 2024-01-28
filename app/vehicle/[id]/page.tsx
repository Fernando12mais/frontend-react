"use client";

import useVehicle from "@/hooks/vehicle";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Button, Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import { formatCurrency } from "@/utils/money";
import { useRouter } from "next/navigation";
import NoImage from "@/components/icons/no-image";

export default function VehicleId({ params }: { params: { id: string } }) {
  const { data } = useVehicle(params.id);
  const router = useRouter();

  return (
    <main>
      <section>
        <Button className="mb-6" onClick={() => router.back()}>
          Voltar
        </Button>

        <Card
          className={`mx-auto max-w-screen-lg ${!data?.images.length ? "light" : ""}`}
        >
          <Skeleton isLoaded={!!data} className="lg:min-h-[500px]">
            <CardBody>
              {!!data?.images.length ? (
                <ImageGallery
                  items={
                    data?.images.map((image) => ({
                      original: image.url,
                      thumbnail: image.url,
                    })) || []
                  }
                  thumbnailPosition={
                    window.innerWidth > 640 ? "right" : "bottom"
                  }
                  showBullets
                  showNav
                  showPlayButton={false}
                  showFullscreenButton
                />
              ) : (
                <div className="mx-auto">
                  <NoImage />
                </div>
              )}
            </CardBody>
          </Skeleton>
          <Skeleton isLoaded={!!data} className="mt-6">
            <CardBody>
              <h2 className="text-3xl">{data?.name}</h2>
              <ul className="mt-4 flex flex-wrap gap-4">
                <Chip variant="bordered" as="li" color="success" size="lg">
                  {formatCurrency(data?.price || 0)}
                </Chip>
                <Chip as="li" color="primary">
                  {data?.brand}
                </Chip>
                <Chip as="li" color="default">
                  {data?.model}
                </Chip>
              </ul>
              <Button className="mt-4">Comprar</Button>
            </CardBody>
          </Skeleton>
        </Card>
      </section>
    </main>
  );
}
