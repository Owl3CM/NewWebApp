import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "1d205920-225b-5a7e-94f5-18d77f6fab78";

const cartsItemsTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddCartsItem: async ({ body }: AddCartsItemParams) => Builder.POST<CartItemResponse>({ root, url: `/api/v1/cartsItems`, body }),
  Delete_CartsItems: async ({ body }: Delete_CartsItemsParams) => Builder.DELETE({ root, url: `/api/v1/cartsItems`, body }),
  UpdateCartsItems: async ({ body }: UpdateCartsItemsParams) => Builder.PATCH<CartItemResponse>({ root, url: `/api/v1/cartsItems`, body }),
  AddCartsItemsBulk: async ({ body }: AddCartsItemsBulkParams) => Builder.POST<CartItemResponse>({ root, url: `/api/v1/cartsItems/bulk`, body }),
  DeleteCartsItemsByQuery: async () => Builder.DELETE({ root, url: `/api/v1/cartsItems/by-query` }),
  Patch_CartsItemsByQuery: async () => Builder.PATCH({ root, url: `/api/v1/cartsItems/by-query` }),
  CartsItemById: async ({ clearCash, id }: CartsItemByIdParams) =>
    Builder.GET_WithCash<CartItemSingleResponse>({ root, url: `/api/v1/cartsItems/${id}`, storageKey, clearCash }),
  DeleteCartsItem: async ({ id }: DeleteCartsItemParams) => Builder.DELETE({ root, url: `/api/v1/cartsItems/${id}` }),
  UpdateCartsItem: async ({ body, id }: UpdateCartsItemParams) => Builder.PATCH<CartItemResponse>({ root, url: `/api/v1/cartsItems/${id}`, body }),

  CartsItemsPaginator: Builder.OffsetPaginatorWithCash<CartsItemsParams, CartItemResponse[]>({ root, url: `/api/v1/cartsItems`, storageKey }),
};

export default cartsItemsTag;

type AddCartsItemParams = {
  body: CartItemRequest;
};

type Delete_CartsItemsParams = {
  body: number[];
};

type UpdateCartsItemsParams = {
  body: CartItemRequest[];
};

type AddCartsItemsBulkParams = {
  body: CartItemRequest[];
};

type CartsItemByIdParams = {
  clearCash?: boolean;
  id: number;
};

type DeleteCartsItemParams = {
  id: number;
};

type UpdateCartsItemParams = {
  body: CartItemRequest;
  id: number;
};

type CartsItemsParams = {
  query?: PaginatorCartsItemsQueryParams;
};
