export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-green-900 text-white hover:bg-green-800",

    outline:
      "border border-green-900 text-green-900 hover:bg-green-50",

    ghost:
      "text-green-900 hover:bg-green-100",

    saffron:
      "bg-orange-500 text-white hover:bg-orange-600",
  };

  return (
    <button
      type={type}
      className={`
        px-5
        py-2
        rounded-xl
        font-medium
        transition-all
        duration-200
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}