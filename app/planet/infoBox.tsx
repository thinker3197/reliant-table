import styles from "./styles.module.css";

export function InfoBox() {
  return (
    <div className={styles.infobox}>
      <ul className={styles.infoboxList}>
        <li>
          <p>
            <code>Shift + Click</code> an option to copy &apos;alternative&apos;
            to new row.
          </p>
        </li>
        <li>
          <p>
            Choosing a new value will first try find next editable field in the
            same row or column
          </p>
        </li>
        <li>
          <p>Third party modules - SWAPI & AgGrid</p>
        </li>
      </ul>
    </div>
  );
}
