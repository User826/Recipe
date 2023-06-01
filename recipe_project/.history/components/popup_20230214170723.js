function Popup() {
    const [showPopup, setShowPopup] = useState(false);
  
    return (
      <div>
        <button onClick={() => setShowPopup(true)}>Show Popup </button>
        {showPopup && (
          <div
            style={{
              background: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px"
            }}
          >
            <h2>Popup Content</h2>
            <p>Here's some content for the popup!</p>
            <button onClick={() => setShowPopup(false)}> Hide Popup </button>
          </div>
        )}
      </div>
    );
  }