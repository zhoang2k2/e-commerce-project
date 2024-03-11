import Button from "../form/Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TbodyProps {
  itemList: Array<any>;
}

function Tbody({ itemList }: TbodyProps) {
  const randomKey = () => Math.floor(Math.random() * 1000);
  return (
    <>
      <tbody>
        {Array.isArray(itemList) &&
          itemList.map((item: any) => {
            const key = randomKey();
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.manufacturer}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.image}</td>
                <td>
                  <Button name="edit" className="edit-btn" />
                </td>
                <td>
                  <Button name="delete" className="del-btn" />
                </td>
              </tr>
            );
          })}
      </tbody>
    </>
  );
}

export default Tbody;
