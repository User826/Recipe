import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../pages/usernavbar.module.css'
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {LuChefHat} from 'react-icons/lu'
import {GrSearch} from 'react-icons/gr'

function UserNavBar() {
    return (
        <div className={styles.container}>
            <div className={styles.mybox}>
                <GiForkKnifeSpoon size={35}/>
                <p>Submit a Recipe</p>
            </div>
            <div className={styles.mybox}>
                <LuChefHat className={styles.LuChefHat} size={35}/>
                <p id={styles['MyAccount']}>My Account</p>
            </div>
            <div className={styles.mybox}>
                <GrSearch size={35}/>
                <p>Search for Recipes</p>
            </div>
        </div>  
    );
  }
  
  export default UserNavBar;