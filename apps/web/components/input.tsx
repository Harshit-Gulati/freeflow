"use client";

import { forwardRef } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", placeholder, className, value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`p-2 bg-unit-bg2 rounded-md text-primary-text focus:outline-2 focus:outline-purpure ${className}`}
      />
    );
  }
);
