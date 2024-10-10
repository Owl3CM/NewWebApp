import Client from "@/Client";
import { TableService } from "@/Table";
import { Queryable } from "@/Libs/eze-services";
import UsersUtils from "./UsersUtils";

export type IUsersService = ReturnType<typeof UsersService.Create>;
export type FormattedUserResponse = UserResponse;

export default class UsersService extends TableService<PaginatorUsersQueryParams, UserResponse, FormattedUserResponse> {
  id = "Users";
  constructor() {
    super({
      columns: UsersUtils.tableColumns(),
      paginator: Client.usersTag.UsersPaginator,
      formatResponse: UsersUtils.formatResponse,
    });
    Queryable.Reset({ service: this });
  }
  filters = [
    //
    { id: "name", type: "string", placement: "InLine" },
    { id: "phone", type: "string", placement: "InLine" },
  ];

  static Create = () => new UsersService();
}
