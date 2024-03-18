/* eslint-disable @typescript-eslint/no-explicit-any */

import "./body.scss";

interface BodyProps {
  children: React.ReactNode;
  styleNav: string;
  renderTitle: any;
  popupViewStyle: string;
}

function Body({ ...props }: BodyProps) {
  const styleWhilePopup = {
    whilePopUp: {
      filter: "blur(2px)",
    },
    notPopUp: {
      filter: "blur(0px)",
    },
  };

  const style =
    props.popupViewStyle === "onView"
      ? styleWhilePopup.whilePopUp
      : styleWhilePopup.notPopUp;

  return (
    <div style={style} className="body-container">
      <div className="title body-style">
        <h1>{props.renderTitle}</h1>
      </div>
      <div className="wrap-child body-style">{props.children}</div>
    </div>
  );
}

export default Body;
