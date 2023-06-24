import styles from '../pages/usernavbar.module.css'
import {GiForkKnifeSpoon} from 'react-icons/gi'

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <GiForkKnifeSpoon/>
                <p>Home</p>
            </div>
            <div className={styles.box}>
                {/* <FontAwesomeIcon icon={['fad', 'coffee']} swapOpacity /> */}
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