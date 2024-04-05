import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThead } from "../../redux/reducer/TheadSlide";
import type { RootState } from "../../redux/Store";

function Thead() {
  const dispatch = useDispatch();
  const tHeadList = useSelector(
    (state: RootState) => state.getTheadItems.TheadItems
  );

  const newHeadItem = [
    {
      id: "9",
      thead: "edit",
    },
    {
      id: "10",
      thead: "delete",
    },
  ];
  const newItems = tHeadList.concat(newHeadItem);

  const tHeadItem = newItems.map((item) => <th key={item.id}>{item.thead}</th>);

  useEffect(() => {
    dispatch(fetchThead());
  }, [dispatch]);

  return (
    <>
      <thead>
        <tr>{tHeadItem}</tr>
      </thead>
    </>
  );
}

export default Thead;
