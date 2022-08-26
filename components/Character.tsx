import Button from './Button';
import Image from 'next/image';
import { Store } from '@reduxjs/toolkit';
import { addTeamMember, removeTeamMember } from '../store/teamMembers';
import styles from '../styles/Character.module.scss'

interface Props {
  id: number;
  name: string;
  thumbnail: {
    path: string,
    extension: string,
  };
  selected: boolean;
  store: Store;
}

const Character: React.FC<Props> = ({ id, name, thumbnail, selected, store }) => (
  <div className={styles.Character}>
    <div className={styles.CharacterInfo}>
      <div className={styles.CharacterImage}>
        <Image width={60} height={60} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
      </div>
      <div>{name}</div>
    </div>
    <div>
      { selected 
        ? <Button onClick={() => store.dispatch(removeTeamMember({id}))} >
            <img src='/cross.svg' alt='Remove' width={14} height={14} />
          </Button>
        : <Button onClick={() => store.dispatch(addTeamMember({id, name, thumbnail}))} >
            <img src='/plus.svg' alt='Add' width={14} height={14} />
          </Button>
      }
    </div>
  </div>
);

export default Character;