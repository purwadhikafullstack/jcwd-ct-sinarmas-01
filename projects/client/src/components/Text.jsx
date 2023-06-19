import { Input } from "react-daisyui";

export default function TextInput(props) {
  const { className, name, id, placeholder, error, label, onChange, defaultValue } = props;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1">{label}</label>
      <Input
        defaultValue={defaultValue}
        className={`w-full ${className}`}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label htmlFor={id} className="text-warning mt-2">{error}</label>
    </div>
  );
}
