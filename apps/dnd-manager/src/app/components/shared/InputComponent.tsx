interface InputComponentProps {
  type: string;
  id: string;
  value?: string | number;
  minNumber?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputComponent({ type, id, value, minNumber, handleChange }: InputComponentProps) {
  return (
    <input
      value={value}
      type={type}
      id={id}
      min={minNumber}
      className="rounded border border-gray-600 p-1"
      onChange={(event) => handleChange(event)}
    />
  );
}

export default InputComponent;
