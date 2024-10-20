import { QueryContainer } from "@/Containers";
import { Table, TableWrapper } from "@/Table";
import ProductsService from "./ProductsService";

const ProductTable = () => {
  const service = ProductsService.Create();
  return (
    <TableWrapper>
      <QueryContainer service={service} />
      <Table service={service} />
    </TableWrapper>
  );
};

export const CellBtnBuilder = (label: string, onClick: () => void, props?: any, btnProps?: any) => {
  return (
    <td {...props}>
      <button onClick={onClick} className="bg-owl text-prim p-lg round-md select-none cursor-pointer" {...btnProps}>
        {label}
      </button>
    </td>
  );
};

export default ProductTable;
