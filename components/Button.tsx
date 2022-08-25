import styles from '../styles/Button.module.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, ...props }) => (
  <button className={styles.Button} {...props}>{children}</button>
)

export default Button;
