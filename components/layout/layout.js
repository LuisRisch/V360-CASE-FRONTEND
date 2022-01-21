import Header from './header'
import styles from './layout.module.css'

function Layout(props) {
  return (
    <>
      <Header />
      <div className={styles.main_container}>
        {props.children}
      </div>
    </>
  )
}

export default Layout
