"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { formSignUpSchema, signUpSchema } from "@/validator";
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
import { Spinner } from "@repo/ui/components/spinner";
import {
  Eye,
  EyeOff,
  Key,
  KeyRound,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { useRegister } from "@/hooks";
import { useAuth } from "@/store";
import { useRouter } from "next/navigation";
import { cn } from "@repo/ui/utils";

export function AppFormSignUp() {
  const { register, loading, error, success, message } = useRegister();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<formSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: formSignUpSchema) => {
    try {
      await register(data);
      if (!success) {
        toast.error(message);
        return;
      }

      const responseLogin = await login({
        email: data.email,
        password: data.password,
      });

      if (!responseLogin.success) {
        toast.error(responseLogin.message);
        return;
      }

      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error("Register gagal, periksa kembali data");
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
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>Buat akun anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-value={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Nama Lengkap</FieldLabel>
                  <InputGroup className={baseClassInputGroup}>
                    <Input
                      {...field}
                      type="text"
                      id="fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="on"
                      className={baseClassInput}
                    />
                    <InputGroupAddon className={baseClassInputGroupAddon}>
                      <User className={baseClassIcon} />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-value={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Nomor Telepon</FieldLabel>
                  <InputGroup className={baseClassInputGroup}>
                    <Input
                      {...field}
                      type="tel"
                      id="phone"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D+/g, "");
                        field.onChange(digitsOnly);
                      }}
                      onBeforeInput={(e) => {
                        const data = (e as unknown as InputEvent).data;
                        if (data && /\D/.test(data)) {
                          e.preventDefault();
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder="081234567890"
                      autoComplete="on"
                      className={baseClassInput}
                    />
                    <InputGroupAddon className={baseClassInputGroupAddon}>
                      <Phone className={baseClassIcon} />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                <Field data-invalid={fieldState.invalid} className="group">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup
                    className={cn(
                      "flex items-center rounded-md border bg-white dark:bg-sidebar overflow-hidden transition",
                      // state fokus (wrapper aktif saat anak fokus)
                      "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30",
                      // state invalid dari Field (pakai data-attribute)
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
                          // ikon ikut highlight saat wrapper fokus
                          "group-focus-within:text-blue-600",
                          // aksesibilitas fokus di tombol
                          "focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-md",
                          // invalid -> warna ikut merah saat fokus
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
                  <InputGroupAddon align="block-end" className="p-0">
                    <InputGroupText className="tabular-nums text-gray-500 group-data-[invalid=true]:text-red-600">
                      Min 8 karakter, A-z, angka, simbol.
                    </InputGroupText>
                  </InputGroupAddon>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Konfirmasi Password
                  </FieldLabel>
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
                      <KeyRound className="w-4 h-4" />
                    </InputGroupAddon>
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confrimPassword"
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
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
              "Sign Up"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
