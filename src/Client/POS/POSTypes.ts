type UUID = string;
type DateTime = string;
type Time = string;
type Enum = string;
type Int32 = number;
type Int64 = number;
type Float = number;
type Double = number;

type CartItemRequest = {
  cart_id: number;
  cost_price: number;
  description: string;
  images: string;
  name: string;
  product: ProductRequest;
  product_id: number;
  quantity: number;
  sale_price: number;
};

type CartRequest = {
  items: CartItemRequest[];
  items_quantity: number;
  total_amount: number;
  user_id: number;
};

type CategoryRequest = {
  description: string;
  image: string;
  name: string;
};

type ProductRequest = {
  category_id: number;
  cost_price: number;
  description: string;
  image: string;
  name: string;
  sale_price: number;
};

type UserRequest = {
  name: string;
  password: string;
  phone: string;
  reference_id: number;
};

type CartItemResponse = {
  cart_id: number;
  cost_price: number;
  created_at: string;
  description: string;
  id: number;
  images: string;
  name: string;
  product: ProductResponse;
  product_id: number;
  quantity: number;
  sale_price: number;
  updated_at: string;
};

type CartItemSingleResponse = {
  cart_id: number;
  cost_price: number;
  created_at: string;
  description: string;
  id: number;
  images: string;
  name: string;
  product: ProductResponse;
  product_id: number;
  quantity: number;
  sale_price: number;
  updated_at: string;
};

type CartResponse = {
  created_at: string;
  id: number;
  items: CartItemResponse[];
  items_quantity: number;
  total_amount: number;
  updated_at: string;
  user_id: number;
};

type CartSingleResponse = {
  created_at: string;
  id: number;
  items: CartItemResponse[];
  items_quantity: number;
  total_amount: number;
  updated_at: string;
  user_id: number;
};

type CategoryResponse = {
  created_at: string;
  description: string;
  id: number;
  image: string;
  name: string;
  updated_at: string;
};

type CategorySingleResponse = {
  created_at: string;
  description: string;
  id: number;
  image: string;
  name: string;
  updated_at: string;
};

type ProductResponse = {
  category: CategoryResponse;
  category_id: number;
  cost_price: number;
  created_at: string;
  description: string;
  id: number;
  image: string;
  name: string;
  sale_price: number;
  updated_at: string;
};

type ProductSingleResponse = {
  category_id: number;
  cost_price: number;
  created_at: string;
  description: string;
  id: number;
  image: string;
  name: string;
  sale_price: number;
  updated_at: string;
};

type UserResponse = {
  created_at: string;
  id: number;
  name: string;
  password: string;
  phone: string;
  reference_id: number;
  updated_at: string;
};

type UserSingleResponse = {
  created_at: string;
  id: number;
  name: string;
  password: string;
  phone: string;
  reference_id: number;
  updated_at: string;
};

type PaginatorCartsQueryParams = {
  offset?: number;
  limit?: number;
};

type CartByIdPathParams = {
  id: number;
};

type DeleteCartPathParams = {
  id: number;
};

type UpdateCartPathParams = {
  id: number;
};

type PaginatorCartsItemsQueryParams = {
  offset?: number;
  limit?: number;
};

type CartsItemByIdPathParams = {
  id: number;
};

type DeleteCartsItemPathParams = {
  id: number;
};

type UpdateCartsItemPathParams = {
  id: number;
};

type PaginatorCategoriesQueryParams = {
  offset?: number;
  limit?: number;
};

type CategoryByIdPathParams = {
  id: number;
};

type DeleteCategoryPathParams = {
  id: number;
};

type UpdateCategoryPathParams = {
  id: number;
};

type PaginatorProductsQueryParams = {
  offset?: number;
  limit?: number;
};

type ProductByIdPathParams = {
  id: number;
};

type DeleteProductPathParams = {
  id: number;
};

type UpdateProductPathParams = {
  id: number;
};

type PaginatorUsersQueryParams = {
  offset?: number;
  limit?: number;
};

type UserByIdPathParams = {
  id: number;
};

type DeleteUserPathParams = {
  id: number;
};

type UpdateUserPathParams = {
  id: number;
};
