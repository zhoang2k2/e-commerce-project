import Button from "../form/Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TbodyProps {
  itemList: Array<any>;
  sendIdForDelete: (id: string) => void;
  sendValueForEdit: (id: string) => void;
}

function Tbody({ itemList, ...props }: TbodyProps) {
  const randomKey = () => Math.floor(Math.random() * 1000);

  return (
    <>
      <tbody>
        {Array.isArray(itemList) &&
          itemList.map((item: any) => {
            const key = randomKey();

            //Get id for delete
            const handlePassIdDel = () => {
              props.sendIdForDelete(item.id);
            };

            // Get id & data for edit
            const handlePassIdEdit = () => {
              props.sendValueForEdit(item.id);
            };

            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.image}</td>
                <td>{item.manufacturer}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    name="edit"
                    className="edit-btn"
                    handleSubmit={handlePassIdEdit}
                  />
                </td>
                <td>
                  <Button
                    name="delete"
                    className="del-btn"
                    handleSubmit={handlePassIdDel}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
}

export default Tbody;
