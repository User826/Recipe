"use strict";
exports.id = 892;
exports.ids = [892];
exports.modules = {

/***/ 8892:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qh": () => (/* binding */ PopupTrigger)
/* harmony export */ });
/* unused harmony exports Backdrop, Popup */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function PopupTrigger() {
    const [showPopup, setShowPopup] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleClickInside = (event)=>{
        event.stopPropagation();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>setShowPopup(true),
                children: " Show Popup "
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                onClick: handleClickInside,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Backdrop, {
                        show: showPopup,
                        onClick: ()=>setShowPopup(false)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Popup, {
                        show: showPopup,
                        onClick: ()=>setShowPopup(false)
                    })
                ]
            })
        ]
    });
}
function Backdrop({ show , onClick  }) {
    return show ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(51,51,51,255)",
            zIndex: 1
        },
        onClick: onClick
    }) : null;
}
function Popup({ show , onClick  }) {
    return show ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            background: "white",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            zIndex: 2
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Popup Content"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: "Here is some content for the popup!"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: onClick,
                children: " Hide Popup "
            })
        ]
    }) : null;
}



/***/ })

};
;