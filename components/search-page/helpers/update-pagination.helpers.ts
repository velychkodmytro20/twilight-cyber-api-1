export const updatePagination = (
  data: any,
  setPagination: React.Dispatch<React.SetStateAction<any>>,
  setCredentialPagination: React.Dispatch<React.SetStateAction<any>>,
  setMainInfoPagination: React.Dispatch<React.SetStateAction<any>>
) => {
  setPagination({ current: 1, total: data.items_count, pageSize: 5 });
  setCredentialPagination({
    current: 1,
    total: data.data.flatMap((item: any) => item.credentials).length,
    pageSize: 3,
  });
  setMainInfoPagination({ current: 1, total: data.items_count, pageSize: 3 });
};

export const updatePage = (
  page: number,
  setPagination: React.Dispatch<React.SetStateAction<any>>
) => {
  setPagination((prev: any) => ({ ...prev, current: page }));
};
