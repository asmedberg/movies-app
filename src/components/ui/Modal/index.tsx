"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const closeModal = () => router.back();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style = "";
    };
  }, []);

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />
      <button onClick={closeModal} className={styles.button}>
        <span>X</span>
        <span className="sr-only">Close modal</span>
      </button>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
