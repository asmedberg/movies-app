"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { MovieListProps } from "./types";
import styles from "./movies.module.css";

export default function List({ movies }: { movies: MovieListProps[] }) {
  const searchParams = useSearchParams();

  return (
    <div className={styles.listLayout}>
      {movies.map(m => (
        <Link
          key={m.id}
          href={`/movie/${m.id}${searchParams ? `?${searchParams.toString()}` : ""}`}
          className={styles.listItem}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
            alt={`${m.title} Poster`}
            width="500"
            height="750"
            title={m.title}
            sizes="(max-width: 40rem) 50vw, (max-width: 48rem) 25vw, 16rem"
            className={styles.listImage}
          />
        </Link>
      ))}
    </div>
  );
}
