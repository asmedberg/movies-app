"use client";
import useSWR from "swr";
import List from "./List";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const resJson = await res.json();

  if (resJson.error) {
    const message = resJson.message;
    throw new Error(message);
  }

  return resJson;
};

export default function Popular() {
  const { data, error, isLoading } = useSWR("/api/popular-movies", fetcher);

  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }

  return <List movies={data} isLoading={isLoading} />;
}
