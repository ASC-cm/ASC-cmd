"use client";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
