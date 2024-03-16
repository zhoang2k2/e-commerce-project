/* eslint-disable @typescript-eslint/no-explicit-any */

import "./body.scss";

interface BodyProps {
  children: React.ReactNode;
  titleByView: string;
  styleWhilePopup: any;
  popupViewStyle: string;
}

function Body({ children, titleByView, ...props }: BodyProps) {
  const style =
    props.popupViewStyle === "onView"
      ? props.styleWhilePopup.whilePopUp
      : props.styleWhilePopup.notPopUp;

  return (
    <div style={style} className="body-container">
      <div className="title body-style">
        <h1>{titleByView}</h1>
      </div>
      <div className="wrap-child body-style">{children}</div>
    </div>
  );
}

export default Body;
