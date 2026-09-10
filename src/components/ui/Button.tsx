interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl
        bg-blue-600
        px-5
        py-3
        font-medium
        text-white
        transition
        hover:bg-blue-700
      "
    >
      {children}
    </button>
  );
}