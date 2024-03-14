import Button from "../form/Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TbodyProps {
  itemList: Array<any>;
  handleDel: (id: string) => void;
}

function Tbody({ itemList, handleDel }: TbodyProps) {
  const randomKey = () => Math.floor(Math.random() * 1000);

  return (
    <>
      <tbody>
        {Array.isArray(itemList) &&
          itemList.map((item: any) => {
            const key = randomKey();
            const handlePassId = () => {
              const id = item.id;
              handleDel(id);
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
                  <Button name="edit" className="edit-btn" />
                </td>
                <td>
                  <Button
                    name="delete"
                    className="del-btn"
                    handleSubmit={handlePassId}
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
