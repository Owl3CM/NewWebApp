import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "a80dd2d1-1f3f-5996-9734-170a3192d6ef";

const minecraftsProductsTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddMinecraftsProduct: async ({ body }: AddMinecraftsProductParams) =>
    Builder.POST<MinecraftProductResponse>({ root, url: `/api/v1/minecraftsProducts`, body }),
  Delete_MinecraftsProducts: async ({ body }: Delete_MinecraftsProductsParams) => Builder.DELETE({ root, url: `/api/v1/minecraftsProducts`, body }),
  UpdateMinecraftsProducts: async ({ body }: UpdateMinecraftsProductsParams) =>
    Builder.PATCH<MinecraftProductResponse>({ root, url: `/api/v1/minecraftsProducts`, body }),
  DeleteMinecraftsProductsByQuery: async () => Builder.DELETE({ root, url: `/api/v1/minecraftsProducts/by-query` }),
  Patch_MinecraftsProductsByQuery: async () => Builder.PATCH({ root, url: `/api/v1/minecraftsProducts/by-query` }),
  MinecraftsProductById: async ({ clearCash, id }: MinecraftsProductByIdParams) =>
    Builder.GET_WithCash<MinecraftProductResponse>({ root, url: `/api/v1/minecraftsProducts/${id}`, storageKey, clearCash }),
  DeleteMinecraftsProduct: async ({ id }: DeleteMinecraftsProductParams) => Builder.DELETE({ root, url: `/api/v1/minecraftsProducts/${id}` }),
  UpdateMinecraftsProduct: async ({ body, id }: UpdateMinecraftsProductParams) =>
    Builder.PATCH<MinecraftProductResponse>({ root, url: `/api/v1/minecraftsProducts/${id}`, body }),

  MinecraftsProductsPaginator: Builder.OffsetPaginatorWithCash<MinecraftsProductsParams, MinecraftProductResponse[]>({
    root,
    url: `/api/v1/minecraftsProducts`,
    storageKey,
  }),
};

export default minecraftsProductsTag;

type AddMinecraftsProductParams = {
  body: MinecraftProductRequest;
};

type Delete_MinecraftsProductsParams = {
  body: string[];
};

type UpdateMinecraftsProductsParams = {
  body: MinecraftProductRequest[];
};

type MinecraftsProductByIdParams = {
  clearCash?: boolean;
  id: string;
};

type DeleteMinecraftsProductParams = {
  id: string;
};

type UpdateMinecraftsProductParams = {
  body: MinecraftProductRequest;
  id: string;
};

type MinecraftsProductsParams = {
  query?: PaginatorMinecraftsProductsQueryParams;
};
