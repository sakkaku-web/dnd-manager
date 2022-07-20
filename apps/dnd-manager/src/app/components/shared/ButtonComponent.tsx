import { PropsWithChildren } from 'react';

interface ButtonComponentProps {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonComponent({
  children,
  handleClick,
}: PropsWithChildren<ButtonComponentProps>) {
  return (
    <button
      onClick={handleClick ? (event) => handleClick(event) : undefined}
      className="rounded border bg-red-800 p-1 text-white"
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
