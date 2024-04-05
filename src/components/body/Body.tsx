/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Product } from "../../types/ProductType";
import Button from "../button/Button";
import { useAdminContext } from "../context/AdminContext";
import SidebarRoute from "../routes/SidebarRoute";
import "./body.scss";

function Body() {
  // const renderTitle =
  //   styleNav === "add" ? "ADDING NEW PRODUCT" : "MANAGING LIST";

  // const styleWhilePopup = {
  //   whilePopUp: {
  //     filter: "blur(2px)",
  //   },
  //   notPopUp: {
  //     filter: "blur(0px)",
  //   },
  // };

  // const style =
  //   props.popupViewStyle === "onView"
  //     ? styleWhilePopup.whilePopUp
  //     : styleWhilePopup.notPopUp;

  const { handleOpenAdd } = useAdminContext();

  const handleClick = () => {
    handleOpenAdd();
  };

  return (
    <div className="body-container">
      <div className="title body-style">
        <Button
          name="add product"
          className="add-btn"
          handleSubmit={handleClick}
        />
      </div>
      <div className="wrap-child body-style">
        <SidebarRoute />
      </div>
    </div>
  );
}

export default Body;
