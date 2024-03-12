import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TheadProps {
  fields: any;
}

function Thead({ fields }: TheadProps) {
  const [renderHead, setRenderHead] = useState<JSX.Element[]>([]);

  const items: Array<string> = Object.keys(fields);
  const newHeadItem = ["edit", "delete"];
  const newItems = items.concat(newHeadItem);

  useEffect(() => {
    const heads = newItems.map((item: string) => {
      return <th key={item}>{item}</th>;
    });
    setRenderHead(heads);
  }, [fields]);

  return (
    <>
      <thead>
        <tr>{renderHead}</tr>
      </thead>
    </>
  );
}

export default Thead;
