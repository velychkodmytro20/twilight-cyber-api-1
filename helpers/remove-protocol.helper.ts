export const removeProtocolAndTrailingSlash = (domain: string) => {
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
};
