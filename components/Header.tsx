import styles from '../styles/Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => (
  <Link href='/'>
    <header className={styles.Header}>
      <Image width={80} height={32} className={styles.HeaderLogo} src='/marvel.svg' alt='Marvel Squad Builder' />
      <span className={styles.HeaderTitle}>Squad Builder</span>
    </header>
  </Link>
)

export default Header;