"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  FieldError,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  className = "",
  register,
  error,
}: FormFieldProps) {
  const { clearErrors } = useFormContext();

  const hasError = !!error;

  const handleClearError = () => {
    clearErrors(name);
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block mb-2 font-medium text-sm">
        {label}
      </label>
      <div className="relative">
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full ${
            hasError
              ? "border-accent-red focus:border-accent-red focus:ring-accent-red bg-background-blur"
              : ""
          }`}
          {...register}
        />
        {hasError && (
          <button
            type="button"
            onClick={handleClearError}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-red hover:text-red-700"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {hasError && (
        <p className="text-accent-red text-sm mt-1 flex items-center gap-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
