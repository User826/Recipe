import styles from '../pages/testnavbar.module.css'
function TestNavBar() {
    return(<div className={styles.container}>
    <div className={styles.box}>
      <i class="fas fa-home"></i>
      <p>Submit a Recipe</p>
    </div>
    <div className={styles.box}>
      <i class="fas fa-user"></i>
      <p>My Account</p>
    </div>
    <div className={styles.box}>
      <i class="fas fa-cog"></i> \
      <p>Search for Recipes</p>
    </div>
  </div>)
}
export default TestNavBar;