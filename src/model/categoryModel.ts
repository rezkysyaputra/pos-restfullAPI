export type CategoryModel = {
  name: string;
};

type Item = {
  id: number;
  name: string;
};

type paging = {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
};

export type CategoryResponse = {
  data: Item[];
  paging: paging;
};

export type ListCategoryRequest = {
  name?: string;
  page?: number;
  size?: number;
};

export type CategoryRequestId = number;

export type CategoryResponseById = {
  id: number;
  name: string;
};

export type CategoryUpdateRequest = {
  categoryId: number;
  name: string;
};
