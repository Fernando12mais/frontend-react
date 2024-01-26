"use client";

import useVehicle from "@/hooks/vehicle";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Button, Card, CardBody } from "@nextui-org/react";

export default function VehicleId({ params }: { params: { id: string } }) {
  const { data } = useVehicle(params.id);

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <main>
      <section>
        <Card className="mx-auto max-w-screen-lg">
          <CardBody>
            {!!data?.images.length && (
              <ImageGallery
                items={
                  data?.images.map((image) => ({
                    original: image.url,
                    thumbnail: image.url,
                  })) || []
                }
                thumbnailPosition="right"
                showBullets
                showNav
                showPlayButton={false}
                showFullscreenButton
              />
            )}
          </CardBody>

          <CardBody>
            <ul>
              <li>{data?.name}</li>
              <li>{data?.brand}</li>
              <li>{data?.model}</li>
              <li>{data?.price}</li>
              <Button>Comprar</Button>
            </ul>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}
