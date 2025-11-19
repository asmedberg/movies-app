import Image from "next/image";
import type { MovieProps } from "./types";
import styles from "./movies.module.css";

export default function List({ movies, isLoading }: { movies: MovieProps[]; isLoading: boolean }) {
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className={styles.listLayout}>
      {movies?.map(m => (
        <div key={m.id} className={styles.listItem}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
            alt={`${m.original_title} Poster`}
            width="500"
            height="750"
            title={m.original_title}
            className={styles.listImage}
          />
        </div>
      ))}
    </div>
  );
}
