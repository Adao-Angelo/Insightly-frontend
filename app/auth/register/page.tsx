"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formField";
import { authAPI } from "@/lib/api/endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  username: string;
  password: string;
  bio: string;
}

export default function RegisterPage() {
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      bio: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;

  const { login } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authAPI.register(data);
      const { access_token, user } = response.data;

      login(access_token, user);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration failed:", err);
      methods.setError("root", {
        message: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:block p-4 h-1/3 lg:h-screen w-full lg:w-1/2 rounded-b-2xl lg:rounded-r-2xl">
          <div className="bg-[url('/sun.png')] bg-cover bg-center h-full w-full rounded-2xl"></div>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-accent-orange border-b-2 pb-2 w-fit">
              Create Account
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
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <FormField
                    name="name"
                    label="Name"
                    placeholder="Your full name"
                    className="flex-1"
                    register={register("name", {
                      required: "Name is required",
                    })}
                    error={methods.formState.errors.name}
                  />
                  <FormField
                    name="username"
                    label="Username"
                    placeholder="Your username"
                    className="flex-1"
                    register={register("username", {
                      required: "Username is required",
                    })}
                    error={methods.formState.errors.username}
                  />
                </div>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={methods.formState.errors.password}
                />
              </div>
              <div className="flex justify-center mt-8 sm:mt-12 lg:mt-[64px]">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-2.5"
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="text-content-secondary flex justify-center mt-6 sm:mt-8">
              <p className="text-sm sm:text-base text-center">
                I already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-content-primary font-bold hover:underline"
                >
                  Access Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}
