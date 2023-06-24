import styles from '../pages/usernavbar.module.css'
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {LuChefHat} from 'react-icons/lu'
import {GrSearch} from 'react-icons/gr'

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <GiForkKnifeSpoon size={35}/>
                <p>Submit a Recipe</p>
            </div>
            <div className={styles.box}>
                <LuChefHat color='red' size={35}/>
                <p>My Account</p>
            </div>
            <div className={styles.box}>
                <GrSearch size={35}/>
                <p>Search for Recipes</p>
            </div>
        </div>  
    );
  }
  
  export default UserNavBar;