import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "b73cc245-5250-5e89-8dfe-af7cb78bc35b";

const cartsTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddCart: async ({ body }: AddCartParams) => Builder.POST<CartResponse>({ root, url: `/api/v1/carts`, body }),
  Delete_Carts: async ({ body }: Delete_CartsParams) => Builder.DELETE({ root, url: `/api/v1/carts`, body }),
  UpdateCarts: async ({ body }: UpdateCartsParams) => Builder.PATCH<CartResponse>({ root, url: `/api/v1/carts`, body }),
  AddCartsBulk: async ({ body }: AddCartsBulkParams) => Builder.POST<CartResponse>({ root, url: `/api/v1/carts/bulk`, body }),
  DeleteCartsByQuery: async () => Builder.DELETE({ root, url: `/api/v1/carts/by-query` }),
  Patch_CartsByQuery: async () => Builder.PATCH({ root, url: `/api/v1/carts/by-query` }),
  CartById: async ({ clearCash, id }: CartByIdParams) => Builder.GET_WithCash<CartSingleResponse>({ root, url: `/api/v1/carts/${id}`, storageKey, clearCash }),
  DeleteCart: async ({ id }: DeleteCartParams) => Builder.DELETE({ root, url: `/api/v1/carts/${id}` }),
  UpdateCart: async ({ body, id }: UpdateCartParams) => Builder.PATCH<CartResponse>({ root, url: `/api/v1/carts/${id}`, body }),

  CartsPaginator: Builder.OffsetPaginatorWithCash<CartsParams, CartResponse[]>({ root, url: `/api/v1/carts`, storageKey }),
};

export default cartsTag;

type AddCartParams = {
  body: CartRequest;
};

type Delete_CartsParams = {
  body: number[];
};

type UpdateCartsParams = {
  body: CartRequest[];
};

type AddCartsBulkParams = {
  body: CartRequest[];
};

type CartByIdParams = {
  clearCash?: boolean;
  id: number;
};

type DeleteCartParams = {
  id: number;
};

type UpdateCartParams = {
  body: CartRequest;
  id: number;
};

type CartsParams = {
  query?: PaginatorCartsQueryParams;
};
