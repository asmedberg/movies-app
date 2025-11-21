import Image from "next/image";
import type { MovieProps } from "./types";
import styles from "./movies.module.css";

const Skeleton = ({ items }: { items: number }) => {
  return (
    <div className={styles.listLayout}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className={styles.loadingItem} />
      ))}
    </div>
  );
};

export default function List({ movies, isLoading }: { movies: MovieProps[]; isLoading: boolean }) {
  if (isLoading) return <Skeleton items={20} />;

  return (
    <div className={styles.listLayout}>
      {movies.map(m => (
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
