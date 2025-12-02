"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import List from "./List";
import { ListSkeleton } from "./ListSkeleton";
import { MovieListProps } from "./types";

export default function Popular() {
  const { data, error, isLoading } = useSWR<MovieListProps[], Error>("/api/popular-movies", fetcher);

  if (isLoading) return <ListSkeleton items={20} />;
  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }
  if (!data) return null;

  return <List movies={data} />;
}
