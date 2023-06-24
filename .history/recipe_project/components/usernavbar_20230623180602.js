import styles from '../pages/usernavbar.module.css'
import {GiForkKnifeSpoon} from 'react-icons/gi'

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <GiForkKnifeSpoon size={70}/>
                <p>Submit a Recipe</p>
            </div>
            <div className={styles.box}>
                {/* <FontAwesomeIcon icon={['fad', 'coffee']} swapOpacity /> */}
                <p>My Account</p>
            </div>
            <div className={styles.box}>
                <i class="fas fa-cog"></i>
                <p>Search for Recipes</p>
            </div>
        </div>  
    );
  }
  
  export default UserNavBar;