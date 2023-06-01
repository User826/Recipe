function UserButton(props) {
    return (
      <button onClick={props.onClick}>
        User
      </button>
    );
  }
  
  function AdminButton(props) {
    return (
      <button onClick={props.onClick}>
        Admin
      </button>
    );
  }

  export {UserButton, AdminButton}