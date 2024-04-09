import SidebarRoute from "../../routes/SidebarRoute";
import "./body.scss";

import { useState } from "react";
import AddingPop from "../popUp/adding/AddingPop";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Body() {
  const [addModalVisible, setAddModelVisible] = useState(false);

  const handleOpenAdd = () => {
    setAddModelVisible(true);
  };

  return (
    <div className="body-container">
      <div className="body-title">
        <button className="add-btn" onClick={handleOpenAdd}>
          <FontAwesomeIcon icon={faPlus} />
          add product
        </button>
        <div className="body-wrap-child">
          <SidebarRoute />
        </div>
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
    </div>
  );
}

export default Body;
