"use client";

import { formatCurrency } from "@/utils/money";
import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FilterProps } from "./types";

const values = Array.from({ length: 30 }).map((value, index) => ({
  label: formatCurrency(10000 * (index + 1)),
  value: 10000 * (index + 1),
}));

const maxValue = values.at(-1)?.value as number;

export default function Filter({ onFilterChange }: FilterProps) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxValue);

  const maxValues = values.filter((value) => value.value > min);

  return (
    <Popover>
      <PopoverTrigger className="my-4 text-start">
        <Button color="primary">Filtros</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card className="flex max-w-96 flex-row flex-wrap">
          <CardBody>
            <Select
              selectedKeys={min ? [min.toString()] : []}
              onChange={(e) => {
                const value = Number(e.target.value);

                console.log(value, "here");
                setMin(value);

                if (value >= max) {
                  setMax(maxValue);
                }
              }}
              label="De"
              placeholder="Filtros por preço"
            >
              {values.map(({ label, value }) => (
                <SelectItem key={value}>{label}</SelectItem>
              ))}
            </Select>
          </CardBody>
          <CardBody>
            <Select
              selectedKeys={max && max > min ? [max.toString()] : []}
              onChange={(e) => {
                setMax(Number(e.target.value));
              }}
              isDisabled={!min || min == maxValue}
              label="Até"
              placeholder="Filtros por preço"
            >
              {maxValues.map(({ label, value }) => (
                <SelectItem key={value}>{label}</SelectItem>
              ))}
            </Select>
          </CardBody>

          <CardBody>
            <Button
              onClick={() => onFilterChange({ min, max })}
              color="primary"
            >
              Aplicar filtros
            </Button>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
