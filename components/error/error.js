import React from 'react'
import styles from './error.module.css'

function Error() {
  return (
    <div className={styles.container}>
      <h1>Error</h1>
      <p> Você pode tentar recarregar a página ou deslogar </p>
    </div>
  )
}

export default Error
