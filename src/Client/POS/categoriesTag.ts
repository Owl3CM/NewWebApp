import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "e05dbc73-cf5a-53f6-9f72-98727e704cce";

const categoriesTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddCategory: async ({ body }: AddCategoryParams) => Builder.POST<CategoryResponse>({ root, url: `/api/v1/categories`, body }),
  Delete_Categories: async ({ body }: Delete_CategoriesParams) => Builder.DELETE({ root, url: `/api/v1/categories`, body }),
  UpdateCategories: async ({ body }: UpdateCategoriesParams) => Builder.PATCH<CategoryResponse>({ root, url: `/api/v1/categories`, body }),
  AddCategoriesBulk: async ({ body }: AddCategoriesBulkParams) => Builder.POST<CategoryResponse>({ root, url: `/api/v1/categories/bulk`, body }),
  DeleteCategoriesByQuery: async () => Builder.DELETE({ root, url: `/api/v1/categories/by-query` }),
  Patch_CategoriesByQuery: async () => Builder.PATCH({ root, url: `/api/v1/categories/by-query` }),
  CategoryById: async ({ clearCash, id }: CategoryByIdParams) =>
    Builder.GET_WithCash<CategorySingleResponse>({ root, url: `/api/v1/categories/${id}`, storageKey, clearCash }),
  DeleteCategory: async ({ id }: DeleteCategoryParams) => Builder.DELETE({ root, url: `/api/v1/categories/${id}` }),
  UpdateCategory: async ({ body, id }: UpdateCategoryParams) => Builder.PATCH<CategoryResponse>({ root, url: `/api/v1/categories/${id}`, body }),

  CategoriesPaginator: Builder.OffsetPaginatorWithCash<CategoriesParams, CategoryResponse[]>({ root, url: `/api/v1/categories`, storageKey }),
};

export default categoriesTag;

type AddCategoryParams = {
  body: CategoryRequest;
};

type Delete_CategoriesParams = {
  body: number[];
};

type UpdateCategoriesParams = {
  body: CategoryRequest[];
};

type AddCategoriesBulkParams = {
  body: CategoryRequest[];
};

type CategoryByIdParams = {
  clearCash?: boolean;
  id: number;
};

type DeleteCategoryParams = {
  id: number;
};

type UpdateCategoryParams = {
  body: CategoryRequest;
  id: number;
};

type CategoriesParams = {
  query?: PaginatorCategoriesQueryParams;
};
