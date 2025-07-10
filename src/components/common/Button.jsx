"use client";

import Link from "next/link";

const Button = ({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 text-black hover:bg-blue-900",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    light: "bg-white text-gray-800 hover:bg-gray-100",
    "outline-light":
      "border border-white text-white hover:bg-white hover:text-primary",
  };

  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-colors inline-block text-center";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
