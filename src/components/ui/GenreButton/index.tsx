import Link from "next/link";
import styles from "./genre-button.module.css";

export default function GenreButton({
  children,
  pathname,
  query,
  active
}: {
  children: React.ReactNode;
  pathname: string;
  query: string;
  active: boolean;
}) {
  return (
    <Link
      href={{ pathname: pathname, query: { genre: query } }}
      className={`${styles.button} ${active ? styles.active : ""}`.trim()}
    >
      {children}
    </Link>
  );
}
