import { useRouter } from 'next/router';
import styles from "../pages/useradmin.module.css";

function UserButton(props) {
    return (
        <button className={styles.user} onClick={props.onClick}>
            User
        </button>
    );
}

function AdminButton() {
    const router = useRouter();

    const handleAdminClick = () => {
        router.push('/admin'); // Redirect to the /admin page
    };

    return (
        <button className={styles.admin} onClick={handleAdminClick}>
            Admin
        </button>
    );
}

export { UserButton, AdminButton };
