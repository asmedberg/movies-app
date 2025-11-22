"use client";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const closeModal = () => router.back();

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.container}>
        <button onClick={closeModal} className={styles.button}>
          Close modal
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
