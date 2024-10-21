import { QueryContainer } from "@/Containers";
import { Table, TableWrapper } from "@/Table";
import ProductsService from "./ProductsService";
import { ObserverBee } from "eze-services";

const ProductTable = () => {
  const service = ProductsService.Create();
  return (
    <TableWrapper>
      <>
        <QueryContainer service={service} />
        <ObserverBee
          hive={service.selectedItemsHive}
          Component={({ honey }) => {
            return <div className="p-xl">{honey.length}</div>;
          }}
        />
      </>
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
