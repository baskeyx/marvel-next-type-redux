import { useState, useEffect } from 'react'
import createStore from '../store/createStore';
import type { NextPage } from 'next'
import Head from 'next/head'
import Fetch from '../components/Fetch'
import styles from '../styles/Home.module.css'
import Character from '../components/Character'
import Squad from '../components/Squad';
import Input from '../components/Input';

import { GA_TRACKING_ID } from "../utils/gtag";

interface CharacterObject {
  id: number;
  name: string;
  thumbnail: {
    path: string,
    extension: string,
  };
}

interface CharacterObjects extends Array<CharacterObject>{}

interface SearchObject {
  now: number;
  length: number;
}

interface SearchObjects extends Array<SearchObject>{}

const store = createStore();

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [characters, setCharacters] = useState<CharacterObjects>([]);
  const [team, setTeam] = useState<CharacterObjects>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [searches, setSearches] = useState<SearchObjects>([]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentStore = store.getState();
      if (team !== currentStore) setTeam(store.getState());
    });
    return unsubscribe;
  }, [team])

  const handleSearchChange = async (value: string) => {
    const now = Date.now();
    setSearchValue(value);
    if (value.length <3) { 
      setCharacters([]) 
    } else {
      const charactersResponse = await Fetch(`/api/characters/${value}`);
      const tempSearches = searches;
      const filters = tempSearches.filter((s: SearchObject) => s.now > now);
      if (filters.length === 0) {
        setCharacters(charactersResponse);
        searches.push({ now, length: charactersResponse.length })
        setSearches(tempSearches);
      }
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Squads - Build Your Ultimate Alliance</title>
        <meta name="description" content="Build your Marvel Ultimate Alliance! Whether it's Avengers, Guardians of The Galaxy, X-Men, Fantastic Four, Midnight Suns, the Brotherhood of Mutants!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/marvelsquads.png" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />
      </Head>

      <main className={styles.main}>
        <div className={styles.Wrapper}>
          <Input type='text' label='Team Name' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <Input type='search' label='Character Name' value={searchValue} onChange={(e) => handleSearchChange(e.target.value)} />
          <div className={styles.SearchResults}>
            {characters.map(c =>
              <Character 
                key={c.id}
                id={c.id}
                name={c.name}
                thumbnail={c.thumbnail}
                selected={Boolean(team.find((m: CharacterObject) => m.id === c.id))}
                store={store}
              />
            )}
          </div>
          {team.length ? <Squad squadmates={team} teamName={teamName} store={store} /> : null }
        </div>
      </main>
    </div>
  )
}

export default Home
