import styles from '../pages/testnavbar.module.css'
function TestNavBar() {
    return(<div className={styles.container}>
    <div className={styles.box}>
      <i class="fas fa-home"></i>
      <p>Home</p>
    </div>
    <div class="box">
      <i class="fas fa-user"></i>
      <p>Profile</p>
    </div>
    <div class="box">
      <i class="fas fa-cog"></i>
      <p>Settings</p>
    </div>
  </div>)
}
export default TestNavBar;