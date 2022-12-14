/* eslint-disable @next/next/no-img-element */
import styles from './sponsors.module.scss';

export function Sponsors() {
  return (
    <div className={styles.logos}>
      <img alt="flap" src="/flap.png" />
      <img alt="tyrol" src="/tyrol.jpg" />
      <img alt="newts" src="/newts.png" />
      <img alt="pi" src="/pi.png" />
      <img alt="rctc" src="/rctc.png" />
      <img alt="sarg" className={styles.blacklogo} src="/sarg.png" />
      <img alt="winona" className={styles.blacklogo} src="/winona.png" />
      <img alt="ibm" className={styles.blacklogo} src="/ibm.svg" />
      <img alt="mc" className={styles.blacklogo} src="/mc.svg" />
      <img alt="aqui" className={styles.blacklogo} src="/aqui.png" />
    </div>
  );
}
