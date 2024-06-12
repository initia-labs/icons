import React from 'react'
import styles from './DisplayIcon.module.scss'

export default function DisplayIcon({
  children,
  name,
}: {
  name: string
  children: React.ReactElement
}) {
  return (
    <section className={styles.icon}>
      <div className={styles.icon__container}>{children}</div>
      <p>{name}</p>
    </section>
  )
}
