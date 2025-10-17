"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formField";
import { authAPI } from "@/lib/api/endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;

  const { login } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authAPI.login(data);
      const { access_token, user } = response.data;

      login(access_token, user);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Toaster
        toastOptions={{
          className: "bg-background-secondary text-content-primary",
          style: {
            background: "#181818",
            color: "#dbd8d8",
          },
        }}
      />
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:block p-4 h-1/3 lg:h-screen w-full lg:w-1/2 rounded-b-2xl lg:rounded-r-2xl">
          <div className="bg-[url('/sun.png')] bg-cover bg-center h-full w-full rounded-2xl"></div>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-accent-orange border-b-2 pb-2 w-fit">
              Access Account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {methods.formState.errors.root && (
                <div className="text-accent-red rounded-md text-sm p-3 bg-red-50 border border-red-200">
                  {methods.formState.errors.root.message}
                </div>
              )}
              <div className="space-y-4 sm:space-y-5">
                <FormField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Your email address"
                  register={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={methods.formState.errors.email}
                />
                <FormField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  register={register("password", {
                    required: "Password is required",
                  })}
                  error={methods.formState.errors.password}
                />
              </div>
              <div className="flex justify-center mt-6 sm:mt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-2.5"
                >
                  {isSubmitting ? "Accessing..." : "Access Account"}
                </Button>
              </div>
            </form>

            <div className="text-content-secondary flex justify-center mt-6 sm:mt-8">
              <p className="text-sm sm:text-base text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-content-primary font-bold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
