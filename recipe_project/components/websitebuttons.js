import styles from "../pages/useradmin.module.css"

function UserButton(props) {
    return (
      <button className = {styles.user} onClick={props.onClick}>
        User
      </button>
    );
  }
  
  function AdminButton(props) {
    return (
      <button className = {styles.admin} onClick={props.onClick}>
        Admin
      </button>
    );
  }

  export {UserButton, AdminButton}