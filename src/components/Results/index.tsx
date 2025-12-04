"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import List from "../Movies/List";
import { ListSkeleton } from "../Movies/ListSkeleton";
import type { MovieListProps } from "../Movies/types";

export default function Results() {
  const [movies, setMovies] = useState<MovieListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const genre = useSearchParams().get("genre");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = new URLSearchParams();

        if (genre) params.set("genre", genre);

        const query = params.toString();

        const response = await fetch(`/api/discover-movies${genre ? `?${query}` : ""}`);
        if (!response.ok) {
          console.log(response.statusText, response.status);
          setError(true);
        }
        setMovies(await response.json());
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    getMovies().finally(() => setIsLoading(false));
  }, [genre]);

  if (error) return <p>Something went wrong!</p>;
  if (isLoading) return <ListSkeleton items={20} />;

  return <List movies={movies} />;
}
