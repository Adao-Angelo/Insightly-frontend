import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border-none placeholder:text-content-tertiary py-6 px-3 text-[14px] bg-background-secondary text-content-secondary focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
