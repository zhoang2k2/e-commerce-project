import "./body.scss";

interface BodyProps {
  children: React.ReactNode;
}

function Body({ children }: BodyProps) {
  return (
    <div className="body-container">
      <div className="title">
        <h1>ADDING NEW PRODUCT</h1>
      </div>
      <div className="wrap-child">{children}</div>
    </div>
  );
}

export default Body;
