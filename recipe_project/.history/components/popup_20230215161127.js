import { useState } from "react";

function PopupTrigger() {
    const [showPopup, setShowPopup] = useState(false);

    const handleClickInside = (event) => {
        event.stopPropagation();
      };
  
    return (
      <div>
        <button onClick={() => setShowPopup(true)}> Show Popup </button>
        <div onClick={handleClickInside}>
            <Backdrop show={showPopup} onClick={() => setShowPopup(false)} />
            <Popup show={showPopup} onClick={() => setShowPopup(false)} />
        </div>
        
      </div>
    );
  }

function Backdrop({ show, onClick }) {
    return show ? (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(37, 150, 190)",
          zIndex: 1
        }}
        onClick={onClick}
      />
    ) : null;
  }
  
  function Popup({ show, onClick }) {
    return show ? (
      <div
        style={{
          background: "white",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          zIndex: 2
        }}
      >
        <h2>Popup Content</h2>
        <p>Here is some content for the popup!</p>
        <button onClick={onClick}> Hide Popup </button>
      </div>
    ) : null;
  }


  export {PopupTrigger,Backdrop, Popup};