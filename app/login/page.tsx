"use client";

import Card from "@/components/molecules/card/card";
import { LoginSchema, loginSchema } from "@/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { api } from "@/libs/axios";
import { Button, Input } from "@nextui-org/react";
import { useEffect } from "react";
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const fetcher = async (
    url: string,
    { arg }: { arg: { email: string; password: string } },
  ) => {
    const formData = new FormData();

    formData.append("username", arg.email);
    formData.append("password", arg.password);
    return api
      .post(url, formData)
      .then((response) => response.data)
      .catch((error) => {
        if (error.status == 500) {
          setError("email", {
            message:
              "Desculpe, mas ocorreu um erro em nossos servidores, tente novamente mais tarde",
          });
          setError("password", {
            message:
              "Desculpe, mas ocorreu um erro em nossos servidores, tente novamente mais tarde",
          });

          return;
        }

        setError("email", {
          message: error.response.data.detail,
        });
        setError("password", {
          message: error.response.data.detail,
        });

        console.log();
      });
  };

  const { trigger } = useSWRMutation("/auth/login", fetcher);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    trigger(data).then((response) => {
      console.log({ response });
      localStorage.setItem("token", response.access_token);
    });
  });

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="w-full">
        <Card className="mx-auto flex max-w-96 flex-col items-center gap-4">
          <Input
            {...register("email")}
            label="Email:"
            errorMessage={errors.email?.message}
          />
          <Input
            {...register("password")}
            label="Senha:"
            type="password"
            errorMessage={errors.password?.message}
          />
          <Button type="submit" color="primary">
            Entrar
          </Button>
        </Card>
      </form>
    </main>
  );
}
