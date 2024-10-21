import { CellBuilder, TableColumnDef } from "@/Table";
import { FormattedCategoryResponse } from "./CategoriesService";

const CategoriesUtils = {
  formatResponse: (data: CategoryResponse[]) => {
    return data as any as FormattedCategoryResponse[];
  },
  tableColumns: () => {
    const headers: TableColumnDef<FormattedCategoryResponse>[] = [
      { id: "name", cell: (item) => CellBuilder(item.name) },
      { id: "description", cell: (item) => CellBuilder(item.description) },
    ];
    return headers.filter((tc) => tc !== null);
  },
};
export default CategoriesUtils;
