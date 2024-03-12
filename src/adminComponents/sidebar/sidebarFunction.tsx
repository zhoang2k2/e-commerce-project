/* eslint-disable @typescript-eslint/no-explicit-any */
interface SidebarFunctionProps {
  handleList: (e: any) => void;
  handleAdd: (e: any) => void;
  styleNavOnView: any;
  styleNav: any;
}

function SidebarFunction({
  handleList,
  handleAdd,
  styleNavOnView,
  styleNav,
}: SidebarFunctionProps) {
  return (
    <>
      <div className="for-admin">
        <h3>Admin Dashboard</h3>
        <ul>
          <li
            onClick={handleAdd}
            style={
              styleNav === "add"
                ? styleNavOnView.onView
                : styleNavOnView.offView
            }
          >
            Adding Product
          </li>
          <li
            onClick={handleList}
            style={
              styleNav === "list"
                ? styleNavOnView.onView
                : styleNavOnView.offView
            }
          >
            Product List
          </li>
          <li>Manage Order</li>
        </ul>
      </div>
    </>
  );
}

export default SidebarFunction;
