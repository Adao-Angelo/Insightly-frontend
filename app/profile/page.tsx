"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formField";
import { Textarea } from "@/components/ui/textarea";
import { userAPI } from "@/lib/api/endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  password: string;
  avatar: string;
}

export default function ProfilePage() {
  const { user } = useAuthStore();

  const methods = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      password: "",
      avatar: user?.avatar || "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    register,
    watch,
    setValue,
  } = methods;

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const router = useRouter();

  const currentAvatar = watch("avatar");

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { email, password, ...profileData } = data;

      console.log("Profile updated:", profileData);
      await userAPI.updateProfile(profileData);

      toast.success("Profile updated successfully!");

      methods.reset(profileData);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setValue("avatar", result, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview("");
    setValue("avatar", "", { shouldDirty: true });
  };

  const handleBack = () => {
    router.back();
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
      <main>
        <div className="flex items-center p-8 gap-8 justify-between">
          <h1 className="text-xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit">
            Profile
          </h1>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="secondary">Back</Button>
            </Link>
            <Button
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>

        <div className="p-8 flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl space-y-8"
          >
            {methods.formState.errors.root && (
              <div className="text-accent-red rounded-md text-sm">
                {methods.formState.errors.root.message}
              </div>
            )}

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-16">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-xl bg-background-secondary border-1 border-background-secondary flex items-center justify-center overflow-hidden">
                    {avatarPreview || currentAvatar ? (
                      <img
                        src={avatarPreview || currentAvatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-accent-orange text-2xl font-bold">
                        {methods.getValues("name").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {(avatarPreview || currentAvatar) && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -top-2 -right-2 bg-accent-red text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  {/* <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      document.getElementById("avatar-upload")?.click()
                    }
                    className="flex items-center gap-2"
                  >
                    <Camera size={16} />
                    Change Avatar
                  </Button> */}
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full">
                {/* Name and Email */}
                <div className="flex gap-6">
                  <FormField
                    name="name"
                    label="Full Name"
                    placeholder="Your full name"
                    className="flex-1"
                    register={register("name", {
                      required: "Name is required",
                    })}
                    error={methods.formState.errors.name}
                  />

                  {/* Email Field - Read Only */}
                  <div className="flex-1">
                    <label className="block mb-2 font-medium text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={methods.getValues("email")}
                      className="w-full px-3 py-2 cursor-not-allowed"
                      readOnly
                      disabled
                    />
                    <p className="text-xs text-content-tertiary mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-2 font-medium text-sm"
                  >
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a little about yourself..."
                    className="min-h-[100px] resize-none"
                    {...register("bio")}
                  />
                </div>
              </div>
            </div>

            {/* Hidden input for avatar URL */}
            <input type="hidden" {...register("avatar")} />

            <input type="hidden" {...register("email")} />
            <input type="hidden" {...register("password")} />
          </form>
        </div>
      </main>
    </FormProvider>
  );
}
