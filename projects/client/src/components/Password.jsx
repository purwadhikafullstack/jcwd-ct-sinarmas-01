import { Input, Button, InputGroup } from "react-daisyui";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function PassInput(props) {
  const { className, id, name, placeholder, label, error, onChange } = props;
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(show => !show);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1">{label}</label>
      <InputGroup className="mb-2">
        <Input
          type={visible ? "text" : "password"}
          className={`w-full ${className}`}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Button type="button" onClick={toggle}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </InputGroup>
      <label className="text-warning" htmlFor={id}>{error}</label>
    </div>
  );
}
