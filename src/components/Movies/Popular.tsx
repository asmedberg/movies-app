"use client";
import useSWR from "swr";
import List from "./List";
import { fetcher } from "@/lib/swr/fetcher";

export default function Popular() {
  const { data, error, isLoading } = useSWR("/api/popular-movies", fetcher);

  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }

  return <List movies={data} isLoading={isLoading} />;
}
