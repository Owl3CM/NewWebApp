import { TableWrapper, Table } from "@/Table";
import UsersService from "./UsersService";
import { QueryContainer } from "@/Containers";

const Users = () => {
  const service = UsersService.Create();
  return (
    <TableWrapper>
      <QueryContainer service={service} />
      <Table service={service} />
    </TableWrapper>
  );
};
export default Users;
