"use client";

import { Input } from "@nextui-org/react";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="search"
            placeholder="Busque por marca,modelo,ano,cor"
            className="max-w-screen-sm"
          />
        </form>
      </nav>
    </header>
  );
}
