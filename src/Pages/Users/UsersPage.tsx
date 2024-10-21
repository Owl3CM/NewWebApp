import { TableWrapper, Table } from "@/Table";
import UsersService from "./UsersService";
import { QueryContainer } from "@/Containers";
import { Input, TextQuery } from "@/Elements";
import { Queryable } from "@/Libs/eze-services";

const Users = () => {
  const service = UsersService.Create();
  return (
    <TableWrapper>
      <QueryContainer service={service} />
      {/* <input
        onChange={({ target }) => {
          console.log("value", target);
          service.updateQueryParams({ name: target.value });

        }}
      /> */}

      {/* <TextQuery queryBuilder={Queryable} id="name" /> */}
      <Table service={service} />
    </TableWrapper>
  );
};
export default Users;
