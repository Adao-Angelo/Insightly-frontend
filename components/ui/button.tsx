import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "sm", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex  items-center justify-center rounded-full font-bold transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-accent-orange text-content-inverse hover:rounded-xl":
              variant === "primary",
            "bg-background-secondary text-accent-orange hover:rounded-xl hover:text-content-primary":
              variant === "secondary",
            "px-4 py-4 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
