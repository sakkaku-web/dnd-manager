interface PrimaryButtonComponentProps {
  value: string;
}

function PrimaryButtonComponent(props: PrimaryButtonComponentProps) {
  return (
    <button className="rounded  border bg-red-800 p-1 text-white">
      {props.value}
    </button>
  );
}

export default PrimaryButtonComponent;
