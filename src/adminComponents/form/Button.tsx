/* eslint-disable @typescript-eslint/no-explicit-any */
import "./button.scss";

interface ButtonProps {
  name: string;
  className: string;
  handleSubmit?: (e:any)=> void
}

function Button({ name, className, ...props }: ButtonProps) {
  return (
    <>
      <button className={className} onClick={props.handleSubmit}>{name}</button>
    </>
  );
}

export default Button;
