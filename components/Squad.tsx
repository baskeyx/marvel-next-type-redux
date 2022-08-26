import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { Store } from '@reduxjs/toolkit';
import { clearTeamMembers, removeTeamMember } from '../store/teamMembers';
import styles from '../styles/Squad.module.scss';

interface CharacterObject {
  id: number;
  name: string;
  thumbnail: {
    path: string,
    extension: string,
  };
}

interface Props {
  squadmates: Array<CharacterObject>;
  teamName: string;
  store: Store;
}

const Squad: React.FC<Props> = ({ squadmates, teamName, store }) => {
  const [display, setDisplay] = useState<Boolean>(true);
  return (
    <section className={styles.Squad}>
      <div className={styles.SquadInfo}>
        <h2 className={styles.SquadName}>{teamName}</h2>
        <div className={styles.SquadBar}>
          <Button onClick={() => store.dispatch(clearTeamMembers())}>
            <img src='/bin2.svg' alt='Reset' width={17} height={17} />
          </Button>
          <Button onClick={() => setDisplay(!display)}>
            {display
              ? <img src='/arrow-down.svg' alt='Down' width={20} height={20} />
              : <img src='/arrow-up.svg' alt='Up' width={20} height={20} />
            }
          </Button>
        </div>
      </div>
      <div className={styles.Squadmates} style={{display: display ? 'flex' : 'none'}}>
        {squadmates.map(squadmate =>
          <div className={styles.SquadmateImage} key={squadmate.id}>
            <Image
              src={`${squadmate.thumbnail.path}.${squadmate.thumbnail.extension}`}
              alt={squadmate.name}
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </section>
  )
}
 
export default Squad; 