"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GenreButton from "../ui/GenreButton";
import styles from "./genre-filters.module.css";

interface GenreProps {
  id: number;
  name: string;
}

export default function GenreFilters() {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);

  const genre = useSearchParams().get("genre");

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch("/api/movie-genres");

        if (!response.ok) {
          console.log(response.statusText, response.status);
          setError(true);
        }
        setGenres(await response.json());
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getGenres().finally(() => setIsLoading(false));
  }, []);

  if (error) return <p>Something went wrong!</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {genres.map(g => (
        <GenreButton key={g.id} pathname="/" query={`${g.id}`} active={genre === String(g.id) ? true : false}>
          {g.name}
        </GenreButton>
      ))}
    </div>
  );
}
