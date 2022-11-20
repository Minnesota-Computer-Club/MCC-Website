import styles from './index.module.scss'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  return (
    <div className={styles.index}>
      <h1>Minnesota Computer Club</h1>
      <h2>👷 Under Construction 👷‍♀️</h2>
      <h3>Check out the <a href='/wcc/' onClick={(e) => { e.preventDefault(); router.push('/wcc/'); }}>Winter Coding Competition</a></h3>
    </div>
  )
}
