"use client";

import { SearchSchema, searchSchema } from "@/validations/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { SearchProps } from "./types";
import SearchIcon from "@/components/icons/search";

export default function Search({ onSearchSubmit }: SearchProps) {
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = handleSubmit((data) => {
    onSearchSubmit(data.search);
  });
  return (
    <header>
      <nav className="flex items-center justify-center p-4">
        <form className="w-full max-w-screen-sm" onSubmit={onSubmit}>
          <Card>
            <CardBody>
              <Input
                data-cy="search"
                {...register("search")}
                type="search"
                placeholder="Busque por marca,modelo,ano"
                endContent={
                  <Button onClick={onSubmit} isIconOnly>
                    <SearchIcon />
                  </Button>
                }
              />
            </CardBody>
          </Card>
        </form>
      </nav>
    </header>
  );
}
