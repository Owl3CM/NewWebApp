import Builder from "@/Client/Builder";

const root = "pos";
const storageKey = "6d71e872-c678-5533-933a-a9eac561e55e";

const samplesTag = {
  ClearAllCash: async () => Builder.clearCash(storageKey),
  AddCustomSamples: async ({ body }: AddCustomSamplesParams) => Builder.POST<SampleCustomEntityResponse>({ root, url: `/api/v1/custom-samples`, body }),
  AddSample: async ({ body }: AddSampleParams) => Builder.POST<SampleEntityResponse>({ root, url: `/api/v1/samples`, body }),
  Delete_Samples: async ({ body }: Delete_SamplesParams) => Builder.DELETE({ root, url: `/api/v1/samples`, body }),
  UpdateSamples: async ({ body }: UpdateSamplesParams) => Builder.PATCH<SampleEntityResponse>({ root, url: `/api/v1/samples`, body }),
  DeleteSamplesByQuery: async () => Builder.DELETE({ root, url: `/api/v1/samples/by-query` }),
  SampleById: async ({ clearCash, id }: SampleByIdParams) =>
    Builder.GET_WithCash<SampleEntityResponse>({ root, url: `/api/v1/samples/${id}`, storageKey, clearCash }),
  DeleteSample: async ({ id }: DeleteSampleParams) => Builder.DELETE({ root, url: `/api/v1/samples/${id}` }),
  UpdateSample: async ({ body, id }: UpdateSampleParams) => Builder.PATCH<SampleEntityResponse>({ root, url: `/api/v1/samples/${id}`, body }),

  CustomSamplesPaginator: Builder.OffsetPaginatorWithCash<CustomSamplesParams, SampleCustomEntityResponse[]>({
    root,
    url: `/api/v1/custom-samples`,
    storageKey,
  }),
  JustStringSamplesPaginator: Builder.OffsetPaginatorWithCash<JustStringSamplesParams, any[]>({ root, url: `/api/v1/just-string-samples`, storageKey }),
  SamplesPaginator: Builder.OffsetPaginatorWithCash<SamplesParams, SampleEntityResponse[]>({ root, url: `/api/v1/samples`, storageKey }),
};

export default samplesTag;

type AddCustomSamplesParams = {
  body: SampleEntityRequest[];
};

type AddSampleParams = {
  body: SampleEntityRequest;
};

type Delete_SamplesParams = {
  body: string[];
};

type UpdateSamplesParams = {
  body: SampleEntityRequest[];
};

type SampleByIdParams = {
  clearCash?: boolean;
  id: string;
};

type DeleteSampleParams = {
  id: string;
};

type UpdateSampleParams = {
  body: SampleEntityRequest;
  id: string;
};

type CustomSamplesParams = {
  query?: PaginatorCustomSamplesQueryParams;
};

type JustStringSamplesParams = {
  query?: PaginatorJustStringSamplesQueryParams;
};

type SamplesParams = {
  query?: PaginatorSamplesQueryParams;
};
