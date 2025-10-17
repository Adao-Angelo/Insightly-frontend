"use client";

import { FeedbackList } from "@/components/dashboard/feedback-list";
import { LinksManager } from "@/components/dashboard/links-manager";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    redirect("/auth/login");
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          className: "bg-background-secondary text-content-primary",
          style: {
            background: "#181818",
            color: "#dbd8d8",
          },
        }}
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-8 gap-4 sm:gap-8 justify-between">
        <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-8 border-accent-orange border-b-2 pb-2 w-fit">
          Hi: {user?.name}
        </h1>

        <div className="order-3 sm:order-2 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-border-primary rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 bg-background-secondary w-full sm:w-auto">
            <Link
              className="hover:text-accent-orange hover:underline pb-1 text-center sm:text-left w-full sm:w-auto"
              href={`/${user?.username}`}
            >
              Public Page
            </Link>

            <Button
              onClick={handleLogout}
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              Logout
            </Button>
          </div>
        </div>

        <Link
          href={`/profile`}
          className="order-2 sm:order-3 self-end sm:self-auto"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background-secondary border-1 border-background-secondary flex items-center justify-center overflow-hidden">
            <div className="text-accent-orange text-xl sm:text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <LinksManager></LinksManager>
      </div>
      <div className="max-w-3xl mx-auto px-4 m">
        <FeedbackList></FeedbackList>
      </div>
    </div>
  );
}
