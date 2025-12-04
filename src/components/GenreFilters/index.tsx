"use client";
import { useSearchParams } from "next/navigation";
import GenreButton from "../ui/GenreButton";
import styles from "./genre-filters.module.css";

export default function GenreFilters() {
  const genre = useSearchParams().get("genre");

  return (
    <div className={styles.container}>
      <GenreButton pathname="/" query="27" active={genre === "27" ? true : false}>
        Horror
      </GenreButton>
    </div>
  );
}
