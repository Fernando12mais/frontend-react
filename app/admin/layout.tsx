"use client";
import { privateApi } from "@/libs/axios";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import useSWR from "swr";

export default function Layout(props: { children: ReactNode }) {
  const { data, isLoading } = useSWR("/auth/is-authenticated", (url) =>
    privateApi.get(url).then((res) => res.data),
  );
  const { push } = useRouter();

  // if (isLoading) return <div>loading...</div>;

  // if (!data) return <>{push("/login")}</>;

  return <main>{props.children}</main>;
}
