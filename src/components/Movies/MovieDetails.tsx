"use client";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import styles from "./movies.module.css";
import type { MovieDetailsProps } from "./types";

export default function MovieDetails({ id }: { id: string }) {
  const { data: movie, error, isLoading } = useSWR<MovieDetailsProps, Error>(`/api/movie-details/${id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }
  if (!movie) return null;

  return (
    <>
      <div className={styles.detailsHeader}>
        <Image
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={`${movie.title} Backdrop`}
          width="780"
          height="439"
          sizes="(max-width: 48rem) 100vw, 48rem"
          className={styles.detailsImage}
        />
        <div className={styles.detailsTitle}>
          <h1>{movie.title}</h1>
        </div>
      </div>
      <div className={styles.detailsContent}>
        <div className={styles.detailsPoster}>
          <Image
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            width="185"
            height="278"
          />
        </div>
        <div className={styles.detailsOverview}>
          <div className={styles.detailsInfo}>
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
    </>
  );
}
