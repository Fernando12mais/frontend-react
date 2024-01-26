import { VehicleCards } from "@/components/organisms/vehicle-cards/vehicle-cards";

export default function Admin() {
  return (
    <main className="min-h-screen text-center">
      <section>
        <h1 className="mb-6 text-5xl">Painel do admin</h1>
        <VehicleCards admin />
      </section>
    </main>
  );
}
