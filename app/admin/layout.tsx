import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout(props: { children: ReactNode }) {
  const token = cookies().get("token");

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `bearer ${token?.value}`,
    },
  });

  const response = await api
    .get("/auth/is-authenticated")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  if (response.status !== 200) return redirect("/login");

  return <>{props.children}</>;
}
