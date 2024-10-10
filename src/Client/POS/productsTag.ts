import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "bc4431a0-763b-5a3c-8c9a-8a741c16bf3f";

const productsTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddProduct: async ({ body }: AddProductParams) => Builder.POST<ProductResponse>({ root, url: `/api/v1/products`, body }),
  Delete_Products: async ({ body }: Delete_ProductsParams) => Builder.DELETE({ root, url: `/api/v1/products`, body }),
  UpdateProducts: async ({ body }: UpdateProductsParams) => Builder.PATCH<ProductResponse>({ root, url: `/api/v1/products`, body }),
  AddProductsBulk: async ({ body }: AddProductsBulkParams) => Builder.POST<ProductResponse>({ root, url: `/api/v1/products/bulk`, body }),
  DeleteProductsByQuery: async () => Builder.DELETE({ root, url: `/api/v1/products/by-query` }),
  Patch_ProductsByQuery: async () => Builder.PATCH({ root, url: `/api/v1/products/by-query` }),
  ProductById: async ({ clearCash, id }: ProductByIdParams) =>
    Builder.GET_WithCash<ProductSingleResponse>({ root, url: `/api/v1/products/${id}`, storageKey, clearCash }),
  DeleteProduct: async ({ id }: DeleteProductParams) => Builder.DELETE({ root, url: `/api/v1/products/${id}` }),
  UpdateProduct: async ({ body, id }: UpdateProductParams) => Builder.PATCH<ProductResponse>({ root, url: `/api/v1/products/${id}`, body }),

  ProductsPaginator: Builder.OffsetPaginatorWithCash<ProductsParams, ProductResponse[]>({ root, url: `/api/v1/products`, storageKey }),
};

export default productsTag;

type AddProductParams = {
  body: ProductRequest;
};

type Delete_ProductsParams = {
  body: number[];
};

type UpdateProductsParams = {
  body: ProductRequest[];
};

type AddProductsBulkParams = {
  body: ProductRequest[];
};

type ProductByIdParams = {
  clearCash?: boolean;
  id: number;
};

type DeleteProductParams = {
  id: number;
};

type UpdateProductParams = {
  body: ProductRequest;
  id: number;
};

type ProductsParams = {
  query?: PaginatorProductsQueryParams;
};
