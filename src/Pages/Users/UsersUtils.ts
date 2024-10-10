import { TableColumnDef, CellBuilder, TableUpdateAction, TableShowMore, TableDeleteAction, CellOptionsBuilder, CellPriceBuilder } from "@/Table";
import { FormattedUserResponse } from "./UsersService";

const UsersUtils = {
  formatResponse: (data: UserResponse[]) => {
    return data as any as FormattedUserResponse[];
  },
  tableColumns: () => {
    const headers: TableColumnDef<FormattedUserResponse>[] = [
      { id: "created_at", cell: (item) => CellBuilder(item.created_at) },
      { id: "id", cell: (item) => CellBuilder(item.id) },
      { id: "name", cell: (item) => CellBuilder(item.name) },
      { id: "password", cell: (item) => CellBuilder(item.password) },
      { id: "phone", cell: (item) => CellBuilder(item.phone) },
      { id: "reference_id", cell: (item) => CellBuilder(item.reference_id) },
      { id: "updated_at", cell: (item) => CellBuilder(item.updated_at) },
    ];
    return headers.filter((tc) => tc !== null);
  },
};
export default UsersUtils;
