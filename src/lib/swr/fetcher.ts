export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const resJson = await res.json();

  if (resJson.error) {
    const message = resJson.message;
    throw new Error(message);
  }

  return resJson;
};
