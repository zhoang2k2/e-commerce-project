import SidebarRoute from "../routes/SidebarRoute";
import "./body.scss";

import { useState } from "react";
import AddingPop from "../popUp/adding/AddingPop";
import { createPortal } from "react-dom";

function Body() {
  const [addModalVisible, setAddModelVisible] = useState(false);

  const handleOpenAdd = () => {
    setAddModelVisible(true);
  };

  return (
    <div className="body-container">
      <div className="title body-style">
        <button className="add-btn" onClick={handleOpenAdd}>
          add product
        </button>
      </div>
      <div className="wrap-child body-style">
        <SidebarRoute />
      </div>
      {addModalVisible &&
        createPortal(
          <AddingPop
            onSubmitSuccess={() => {}}
            mode="add"
            onCancle={() => setAddModelVisible(false)}
          />,
          document.body
        )}
      .
    </div>
  );
}

export default Body;
