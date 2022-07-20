interface InputComponentProps {
  type: string;
  id: string;
  inputValue?: string;
  inputName: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function InputComponent({
  type,
  id,
  inputValue,
  inputName,
  handleChange,
}: InputComponentProps) {
  return (
    <input
      value={inputValue}
      type={type}
      id={id}
      className="rounded border border-gray-600 p-1"
      name={inputName}
      onChange={(event) => handleChange(event)}
    />
  );
}

export default InputComponent;
