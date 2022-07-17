interface InputComponentProps {
  type: string;
  value?: string;
  id: string;
}
function InputComponent(props: InputComponentProps) {
  return (
    <input
      type={props.type}
      value={props.value}
      id={props.id}
      className="rounded border border-gray-600 p-1"
    />
  );
}

export default InputComponent;
