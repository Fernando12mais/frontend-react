"use client";

import { Card, CardBody, Input } from "@nextui-org/react";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-center p-4">
        <form
          className="w-full max-w-screen-sm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Card>
            <CardBody>
              <Input
                type="search"
                placeholder="Busque por marca,modelo,ano,cor"
              />
            </CardBody>
          </Card>
        </form>
      </nav>
    </header>
  );
}
