import styles from "./movies.module.css";

export const ListSkeleton = ({ items }: { items: number }) => {
  return (
    <div className={styles.listLayout}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className={styles.loadingItem} />
      ))}
    </div>
  );
};
