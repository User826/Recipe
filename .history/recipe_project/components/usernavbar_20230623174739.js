import styles from '../pages/usernavbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <FontAwesomeIcon icon={faCoffee} />
                <p>Home</p>
            </div>
            <div className={styles.box}>
                <FontAwesomeIcon icon={['fad', 'coffee']} swapOpacity />
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