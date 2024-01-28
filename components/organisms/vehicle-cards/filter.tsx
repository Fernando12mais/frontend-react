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
import { filterValues } from "./utils";

const maxValue = filterValues.at(-1)?.value as number;

export default function Filter({ onFilterChange }: FilterProps) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxValue);

  const maxValues = filterValues.filter((value) => value.value > min);

  return (
    <Popover>
      <PopoverTrigger className="my-4" data-cy="filter-trigger">
        <Button color="primary">Filtros</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card className="flex max-w-96 flex-row flex-wrap">
          <CardBody>
            <Select
              data-cy="filter-from"
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
              {filterValues.map(({ label, value }, index) => (
                <SelectItem data-cy={`filter-from-option-${index}`} key={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
          <CardBody>
            <Select
              data-cy="filter-to"
              selectedKeys={max && max > min ? [max.toString()] : []}
              onChange={(e) => {
                setMax(Number(e.target.value));
              }}
              isDisabled={!min || min == maxValue}
              label="Até"
              placeholder="Filtros por preço"
            >
              {maxValues.map(({ label, value }, index) => (
                <SelectItem data-cy={`filter-to-option-${index}`} key={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          </CardBody>

          <CardBody>
            <Button
              data-cy="filter-apply"
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
