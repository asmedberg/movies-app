"use client";
import { useCallback } from "react";
import useLocalStorage from "use-local-storage";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import styles from "./details.module.css";
import type { MovieDetailsProps } from "../types";

interface StorageValues {
  id: number;
  title: string;
  poster: string;
}

export default function MovieDetails({ id }: { id: string }) {
  const { data: movie, error, isLoading } = useSWR<MovieDetailsProps, Error>(`/api/movie-details/${id}`, fetcher);
  const [movieList, setMovieList] = useLocalStorage<StorageValues[]>("movie-list", []);
  const hasMovie = movieList?.find((m: StorageValues) => m.id === Number(id));

  const handleAddToList = useCallback(() => {
    if (!movie) return;

    const values: StorageValues = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
    };

    if (!hasMovie) {
      setMovieList(prev => [...(prev ?? []), values]);
    }
  }, [movie, hasMovie, setMovieList]);

  const handleRemoveFromList = useCallback(() => {
    if (!movie) return;

    const updatedList = (movieList ?? []).filter(m => m.id !== movie.id);

    setMovieList(updatedList);
  }, [movie, movieList, setMovieList]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={`${movie.title} Backdrop`}
          width="780"
          height="439"
          sizes="(max-width: 48rem) 100vw, 48rem"
          className={styles.backdropImage}
        />
        <div className={styles.title}>
          <h1>{movie.title}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.actions}>
          <Image
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            width="185"
            height="278"
            className={styles.posterImage}
          />
          {!hasMovie ? (
            <button onClick={handleAddToList} className={`${styles.button} ${styles.add}`}>
              + Add
            </button>
          ) : (
            <button onClick={handleRemoveFromList} className={`${styles.button} ${styles.remove}`}>
              - Remove
            </button>
          )}
        </div>
        <div className={styles.overview}>
          <div className={styles.info}>
            <div>
              <p>
                <strong>YEAR</strong>
              </p>
              <p>{new Date(movie.release_date).getFullYear()}</p>
            </div>
            <div>
              <p>
                <strong>RUNTIME</strong>
              </p>
              <p>{movie.runtime} minutes</p>
            </div>
          </div>
          {movie.genres.length > 0 && (
            <ul className={styles.genreList}>
              {movie.genres.map(g => (
                <li key={g.id} className={styles.genreListItem}>
                  {g.name}
                </li>
              ))}
            </ul>
          )}
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
