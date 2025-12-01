"use client";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import styles from "./movies.module.css";

export default function MovieDetails({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR(id ? `/api/movie-details/${id}` : null, fetcher);

  if (error) {
    const message = String(error);
    console.log(message);
    return <div>{message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className={styles.detailsHeader}>
        <Image
          src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
          alt={`${data.title} Backdrop`}
          width="780"
          height="439"
          sizes="(max-width: 40rem) 100vw, 40rem"
          className={styles.detailsImage}
        />
        <div className={styles.detailsInfo}>
          <h1>{data.title}</h1>
          <span>{new Date(data.release_date).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
