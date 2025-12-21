"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { formSignInSchema, signInSchema } from "@/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@repo/ui/components/input-group";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Spinner } from "@repo/ui/components/spinner";
import Link from "next/link";
import { Checkbox } from "@repo/ui/components/checkbox";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/store";
import { cn } from "@repo/ui/utils";

export function AppFormSignIn() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<formSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (credentials: formSignInSchema) => {
    try {
      const response = await login(credentials);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Berhasil login");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Email atau password salah");
    }
  };

  const baseClassInput =
    "flex-1 border-0 focus-visible:ring-0 focus:outline-none bg-transparent px-3 py-2";
  const baseClassInputGroup =
    "flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden";
  const baseClassInputGroupAddon =
    "px-3 text-gray-500 flex items-center justify-center bg-transparent";
  const baseClassIcon = "w-4 h-4";

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">Sign In</CardTitle>
        <CardDescription>
          Sign In dengan akun yang terdaftar anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <InputGroup className={baseClassInputGroup}>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@gmail.com"
                      autoComplete="on"
                      className={baseClassInput}
                    />
                    <InputGroupAddon className={baseClassInputGroupAddon}>
                      <Mail className={baseClassIcon} />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup
                    className={cn(
                      "flex items-center rounded-md border bg-white dark:bg-sidebar overflow-hidden transition",
                      "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30",
                      "group-data-[invalid=true]:border-red-500 group-data-[invalid=true]:focus-within:ring-red-500/30 group-data-[invalid=true]:focus-within:border-red-500"
                    )}
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className={baseClassInputGroupAddon}
                    >
                      <Lock className="w-4 h-4" />
                    </InputGroupAddon>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="*************"
                      className="flex-1 border-0 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-0"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        className={cn(
                          "p-2 cursor-pointer outline-none hover:bg-transparent",
                          "group-focus-within:text-blue-600",
                          "focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md",
                          "group-data-[invalid=true]:group-focus-within:text-red-600 focus-visible:group-data-[invalid=true]:ring-red-500/40"
                        )}
                        type="button"
                        form="form-signin"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="remember"
              control={form.control}
              render={({ field }) => (
                <Field className="bg-none">
                  <InputGroup
                    className={cn(
                      "flex items-center justify-between border-0  shadow-none max-h-[20px] dark:bg-zinc-950 md:dark:bg-sidebar"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <FieldLabel
                        htmlFor="remember"
                        className="text-sm select-none cursor-pointer leading-none"
                      >
                        <span>Remember me?</span>
                      </FieldLabel>
                    </div>

                    <InputGroupAddon align={"inline-end"} className="">
                      <InputGroupText className="p-0">
                        <Link
                          href={"/"}
                          className="text-blue-500 hover:underline hover:underline-offset-2"
                        >
                          Lupa Password?
                        </Link>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="form-signin" disabled={loading}>
            {loading ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
