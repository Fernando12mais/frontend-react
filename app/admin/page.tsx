"use client";

import { VehicleCards } from "@/components/organisms/vehicle-cards/vehicle-cards";
import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  const logout = async () => {
    router.push("/login");
    Cookies.remove("token");
  };
  return (
    <main className="min-h-screen">
      <section>
        <div className="flex justify-end">
          <Button onClick={logout} size="lg" color="primary">
            Sair
          </Button>
        </div>
        <h1 className="mb-6 text-center text-5xl">Painel do admin</h1>

        <VehicleCards admin />
      </section>
    </main>
  );
}
