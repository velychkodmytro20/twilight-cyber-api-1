import { InfectionDataItem } from "@interfaces/infection-data.types";

export const getPaginatedCredentials = (
  data: InfectionDataItem[] | undefined,
  current: number,
  pageSize: number
) => {
  return data
    ?.flatMap((item) => item.credentials)
    .slice((current - 1) * pageSize, current * pageSize);
};

export const getPaginatedMainInfo = (
  data: InfectionDataItem[] | undefined,
  current: number,
  pageSize: number
) => {
  return data?.slice((current - 1) * pageSize, current * pageSize);
};
