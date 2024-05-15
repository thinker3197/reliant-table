import styles from "./page.module.css";
import { PlanetsWrapper } from "./planet/planetsWrapper";

export default function Home() {
  return (
    <main className={styles.main}>
      <PlanetsWrapper />
    </main>
  );
}
