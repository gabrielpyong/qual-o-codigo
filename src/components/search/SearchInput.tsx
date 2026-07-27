export function SearchInput() {
  return (
    <input
      type="text"
      placeholder="Pesquisar produto ou código..."
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        p-4
        outline-none
        transition
        focus:border-blue-500
      "
    />
  );
}