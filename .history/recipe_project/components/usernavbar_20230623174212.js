import styles from '../pages/usernavbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <i class="fas fa-home"></i>
                <p>Home</p>
            </div>
            <div className={styles.box}>
                <i class="fas fa-user"></i>
                <p>Profile</p>
            </div>
            <div className={styles.box}>
                <i class="fas fa-cog"></i>
                <p>Settings</p>
            </div>
        </div>  
    );
  }
  
  export default UserNavBar;