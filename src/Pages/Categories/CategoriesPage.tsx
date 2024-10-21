import { TableWrapper, Table } from "@/Table";
import CategoriesService from "./CategoriesService";
import { QueryContainer } from "@/Containers";

const Categories = () => {
  const service = CategoriesService.Create();
  return (
    <TableWrapper>
      <QueryContainer service={service} />
      <Table service={service} />
    </TableWrapper>
  );
};
export default Categories;
