"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/formField";
import { Textarea } from "@/components/ui/textarea";
import { userAPI } from "@/lib/api/endpoints";
import { useAuthStore } from "@/lib/store/auth-store";
import { isAxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate",
  duration: 0.5,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const avatarVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
  disabled: { scale: 1, opacity: 0.6 },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 15,
};

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
      const { email: _email, password: _password, ...profileData } = data;

      await userAPI.updateProfile(profileData);

      toast.success("Profile updated successfully!");

      methods.reset(profileData);
    } catch (err: unknown) {
      const message =
        isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Failed to update profile. Please try again.";
      toast.error(message);
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
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <motion.div
          className="flex items-center p-8 gap-8 justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit"
          >
            Profile
          </motion.h1>
          <motion.div className="flex gap-4" variants={itemVariants}>
            <Link href="/dashboard">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="secondary">Back</Button>
              </motion.div>
            </Link>
            <motion.div
              variants={buttonVariants}
              whileHover={!isSubmitting && isDirty ? "hover" : "disabled"}
              whileTap={!isSubmitting && isDirty ? "tap" : "disabled"}
            >
              <Button
                variant="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="p-4 md:p-8 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl w-full space-y-6 md:space-y-8"
            variants={containerVariants}
          >
            <AnimatePresence>
              {methods.formState.errors.root && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={springTransition}
                  className="text-accent-red rounded-md text-sm overflow-hidden"
                >
                  {methods.formState.errors.root.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar Section */}
            <motion.div
              className="flex flex-col items-center gap-8 md:gap-16"
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col items-center gap-4"
                variants={itemVariants}
              >
                <motion.div
                  className="relative"
                  variants={avatarVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-background-secondary border-1 border-background-secondary flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {avatarPreview || currentAvatar ? (
                        <motion.div
                          key="avatar-image"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={springTransition}
                        >
                          <Image
                            src={avatarPreview || currentAvatar}
                            alt="Avatar"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="avatar-initial"
                          className="text-accent-orange text-xl md:text-2xl font-bold"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={springTransition}
                        >
                          {methods.getValues("name").charAt(0).toUpperCase()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {(avatarPreview || currentAvatar) && (
                      <motion.button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-accent-red text-white rounded-full p-1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={springTransition}
                      >
                        <X size={12} className="md:size-[14px]" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  className="flex flex-col gap-2"
                  variants={itemVariants}
                >
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex-1 space-y-4 md:space-y-6 w-full"
                variants={containerVariants}
              >
                {/* Name and Email */}
                <motion.div
                  className="flex flex-col md:flex-row gap-4 md:gap-6"
                  variants={itemVariants}
                >
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
                  <motion.div className="flex-1" variants={itemVariants}>
                    <label className="block mb-2 font-medium text-sm">
                      Email Address
                    </label>
                    <motion.input
                      type="email"
                      value={methods.getValues("email") || ""}
                      className="w-full px-3 py-2 cursor-not-allowed bg-background-secondary rounded-md text-content-primary"
                      readOnly
                      disabled
                      whileFocus={{ scale: 1.02 }}
                      transition={springTransition}
                    />
                    <p className="text-xs text-content-tertiary mt-1">
                      Email cannot be changed
                    </p>
                  </motion.div>
                </motion.div>

                {/* Bio */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="bio"
                    className="block mb-2 font-medium text-sm"
                  >
                    Bio
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={springTransition}
                  >
                    <Textarea
                      id="bio"
                      placeholder="Tell us a little about yourself..."
                      className="min-h-[80px] md:min-h-[100px] resize-none w-full"
                      {...register("bio")}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hidden input for avatar URL */}
            <input type="hidden" {...register("avatar")} />

            <input type="hidden" {...register("email")} />
            <input type="hidden" {...register("password")} />
          </motion.form>
        </motion.div>
      </motion.main>
    </FormProvider>
  );
}
