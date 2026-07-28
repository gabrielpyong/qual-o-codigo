type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        text-gray-900
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
      "
    />
  );
}
