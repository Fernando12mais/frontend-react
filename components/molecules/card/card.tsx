import { twMerge } from "tailwind-merge";
import { CardProps } from "./types";

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "rounded bg-slate-700 p-2 text-slate-50",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
