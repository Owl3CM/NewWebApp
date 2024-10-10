import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "20a3fa25-42c5-55eb-8118-c55dbd6e086d";

const usersTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddUser: async ({ body }: AddUserParams) => Builder.POST<UserResponse>({ root, url: `/api/v1/users`, body }),
  Delete_Users: async ({ body }: Delete_UsersParams) => Builder.DELETE({ root, url: `/api/v1/users`, body }),
  UpdateUsers: async ({ body }: UpdateUsersParams) => Builder.PATCH<UserResponse>({ root, url: `/api/v1/users`, body }),
  AddUsersBulk: async ({ body }: AddUsersBulkParams) => Builder.POST<UserResponse>({ root, url: `/api/v1/users/bulk`, body }),
  DeleteUsersByQuery: async () => Builder.DELETE({ root, url: `/api/v1/users/by-query` }),
  Patch_UsersByQuery: async () => Builder.PATCH({ root, url: `/api/v1/users/by-query` }),
  UserById: async ({ clearCash, id }: UserByIdParams) => Builder.GET_WithCash<UserSingleResponse>({ root, url: `/api/v1/users/${id}`, storageKey, clearCash }),
  DeleteUser: async ({ id }: DeleteUserParams) => Builder.DELETE({ root, url: `/api/v1/users/${id}` }),
  UpdateUser: async ({ body, id }: UpdateUserParams) => Builder.PATCH<UserResponse>({ root, url: `/api/v1/users/${id}`, body }),

  UsersPaginator: Builder.OffsetPaginatorWithCash<UsersParams, UserResponse[]>({ root, url: `/api/v1/users`, storageKey }),
};

export default usersTag;

type AddUserParams = {
  body: UserRequest;
};

type Delete_UsersParams = {
  body: number[];
};

type UpdateUsersParams = {
  body: UserRequest[];
};

type AddUsersBulkParams = {
  body: UserRequest[];
};

type UserByIdParams = {
  clearCash?: boolean;
  id: number;
};

type DeleteUserParams = {
  id: number;
};

type UpdateUserParams = {
  body: UserRequest;
  id: number;
};

type UsersParams = {
  query?: PaginatorUsersQueryParams;
};
