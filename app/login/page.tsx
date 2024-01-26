"use client";

import { LoginSchema, loginSchema } from "@/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { publicApi } from "@/libs/axios";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
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
    return await publicApi
      .post(url, formData)
      .then((response) => {
        console.log(response.data);

        return response.data;
      })
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

  const { trigger, isMutating } = useSWRMutation("/auth/login", fetcher);

  const onSubmit = handleSubmit(async (data) => {
    const response = await trigger(data);

    if (response?.access_token) {
      localStorage.setItem("token", response?.access_token);
    }
  });

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto max-w-96">
        <form onSubmit={onSubmit}>
          <CardBody className="grid gap-4">
            <Input
              size="lg"
              isRequired
              {...register("email")}
              label="Email:"
              errorMessage={errors.email?.message}
              placeholder="Email de administrador"
              isInvalid={!!errors.email?.message}
              defaultValue="fernando@gmail.com"
            />
            <Input
              isInvalid={!!errors.email?.message}
              size="lg"
              isRequired
              {...register("password")}
              label="Senha:"
              type="password"
              errorMessage={errors.password?.message}
              placeholder="Sua senha por favor..."
              defaultValue="fernando"
            />
            <Button isLoading={isMutating} type="submit" color="primary">
              {!isMutating ? "Entrar" : "Carregando ..."}
            </Button>
          </CardBody>
        </form>
      </Card>
    </main>
  );
}
