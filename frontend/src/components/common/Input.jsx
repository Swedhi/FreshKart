import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full
            px-4
            py-3
            border
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-green-700
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;