import Header from "@/components/molecules/header/header";
import { VehicleCards } from "@/components/organisms/vehicle-cards/vehicle-cards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section>
        <VehicleCards />
      </section>
    </main>
  );
}
