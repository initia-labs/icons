import styles from './App.module.scss'
import logo from './assets/logo.svg'
import * as iconsComponents from '@initia/icons-react'
import { IconSearch } from '@initia/icons-react'
import DisplayIcon from './DisplayIcon'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const icons = Object.entries(iconsComponents).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={logo} alt='ICONS' className={styles.header__img} />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.search}>
          <IconSearch size={18} />
          <input
            type='text'
            className={styles.search__input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.icons__container}>
          {icons.length ? (
            icons.map(([name, Component]) => (
              <DisplayIcon name={name} key={name}>
                {<Component size={24} />}
              </DisplayIcon>
            ))
          ) : (
            <p>No icon found</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App
