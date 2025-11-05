export const generateQuery = (params: Record<string, string | number>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  return searchParams;
};
