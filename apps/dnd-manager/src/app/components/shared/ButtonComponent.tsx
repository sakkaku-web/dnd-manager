interface ButtonComponentProps {
  value: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonComponent({ value, handleClick }: ButtonComponentProps) {
  return (
    <button
      onClick={handleClick ? (event) => handleClick(event) : undefined}
      className="rounded border bg-red-800 p-1 text-white"
    >
      {value}
    </button>
  );
}

export default ButtonComponent;
