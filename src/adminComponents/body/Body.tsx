/* eslint-disable @typescript-eslint/no-explicit-any */

import "./body.scss";

interface BodyProps {
  children: React.ReactNode;
  titleByView: string;
}

function Body({ children, titleByView }: BodyProps) {
  return (
    <div className="body-container">
      <div className="title body-style">
        <h1>{titleByView}</h1>
      </div>
      <div className="wrap-child body-style">{children}</div>
    </div>
  );
}

export default Body;
