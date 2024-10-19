import Client from "@/Client";
import { TableService } from "@/Table";
import { Queryable } from "@/Libs/eze-services";
import CategoriesUtils from "./CategoriesUtils";

export type ICategoriesServices = ReturnType<typeof CategoriesServices.Create>;
export type FormattedCategoryResponse = CategoryRequest;

export default class CategoriesServices extends TableService<PaginatorCategoriesQueryParams, CategoryResponse, FormattedCategoryResponse> {
  id = "Categories";
  constructor() {
    super({
      columns: CategoriesUtils.tableColumns(),
      paginator: Client.categoriesTag.CategoriesPaginator,
      formatResponse: CategoriesUtils.formatResponse,
    });
    Queryable.Reset({ service: this });
  }
  filters = [
    //
    { id: "name", type: "string", placement: "InLine" },
  ];

  static Create = () => new CategoriesServices();
}
