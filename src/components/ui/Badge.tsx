interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span
      className="
        inline-flex
        rounded-full
        bg-blue-100
        px-3
        py-1
        text-sm
        font-medium
        text-blue-700
      "
    >
      {children}
    </span>
  );
}