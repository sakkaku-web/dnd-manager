interface InputComponentProps {
  type: string;
  id: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputComponent({
  type,
  id,
  value,
  handleChange,
}: InputComponentProps) {
  return (
    <input
      value={value}
      type={type}
      id={id}
      className="rounded border border-gray-600 p-1"
      onChange={(event) => handleChange(event)}
    />
  );
}

export default InputComponent;
