import { VehicleCards } from "@/components/organisms/vehicle-cards/vehicle-cards";
import { Button, Link } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section>
        <div className="flex justify-end">
          <Button
            href="/login"
            as={Link}
            size="lg"
            showAnchorIcon
            color="primary"
          >
            Login
          </Button>
        </div>
        <VehicleCards />
      </section>
    </main>
  );
}
