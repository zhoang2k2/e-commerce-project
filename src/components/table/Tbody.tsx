/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button/Button";
import { useAdminContext } from "../context/AdminContext";

function Tbody() {
  const { products } = useAdminContext();
  const randomKey = () => Math.floor(Math.random() * 1000);

  return (
    <>
      <tbody>
        {Array.isArray(products) &&
          products.map((product: any) => {
            const key = randomKey();
            const deleteID = product.id;
            const handleDelete = () => {
              console.log("get ID to Delete", deleteID);
            };

            return (
              <tr key={key}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.image}</td>
                <td>{product.manufacturer}</td>
                <td>{product.category}</td>
                <td>{product.status}</td>
                <td>
                  <Button name="edit" className="edit-btn" />
                </td>
                <td>
                  <Button
                    name="delete"
                    className="del-btn"
                    handleSubmit={handleDelete}
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
