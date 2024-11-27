import { FC } from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "icon";
};

export const Button: FC<ButtonProps> = ({
  variant = "icon",
  children,
  ...props
}) => {
  return (
    <button
      className={
        variant === "icon"
          ? "hover:text-gray-700 transition-colors flex items-center justify-center"
          : "text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
      }
      {...props}
    >
      {children}
    </button>
  );
};
