exports.id = 665;
exports.ids = [665];
exports.modules = {

/***/ 1684:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ RecipeReviewCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8167);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9361);
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6731);
/* harmony import */ var _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8455);
/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3691);
/* harmony import */ var _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_Collapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5732);
/* harmony import */ var _mui_material_Collapse__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Collapse__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2120);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5574);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_material_colors__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7372);
/* harmony import */ var _mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_icons_material_Share__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8234);
/* harmony import */ var _mui_icons_material_Share__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Share__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8148);
/* harmony import */ var _mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6952);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2465);
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3773);
/* harmony import */ var firebase_compat_storage__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(451);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebase__WEBPACK_IMPORTED_MODULE_17__, firebase_compat_app__WEBPACK_IMPORTED_MODULE_18__, firebase_compat_storage__WEBPACK_IMPORTED_MODULE_19__]);
([_firebase__WEBPACK_IMPORTED_MODULE_17__, firebase_compat_app__WEBPACK_IMPORTED_MODULE_18__, firebase_compat_storage__WEBPACK_IMPORTED_MODULE_19__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















 //Need this in order to use firebase


const ExpandMore = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((props)=>{
    const { expand , ...other } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10___default()), {
        ...other
    });
})(({ theme , expand  })=>({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    }));
function RecipeReviewCard({ cardTitle , cardSubheader , cardImageURI , cardSummary , cardSteps  }) {
    const [expanded, setExpanded] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
    const [imageUrl, setImageUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleExpandClick = ()=>{
        setExpanded(!expanded);
    };
    const getImageUrl = async ()=>{
        console.log("cardImageURI is");
        console.log(cardImageURI);
        const imageRef = firebase_compat_app__WEBPACK_IMPORTED_MODULE_18__["default"].storage().refFromURL(cardImageURI);
        const downloadUrl = await imageRef.getDownloadURL();
        setImageUrl(downloadUrl);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getImageUrl();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Card__WEBPACK_IMPORTED_MODULE_3___default()), {
        sx: {
            maxWidth: 345
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_4___default()), {
                avatar: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_9___default()), {
                    sx: {
                        bgcolor: _mui_material_colors__WEBPACK_IMPORTED_MODULE_12__.red[500]
                    },
                    "aria-label": "recipe",
                    children: "R"
                }),
                action: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10___default()), {
                    "aria-label": "settings",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_16___default()), {})
                }),
                title: cardTitle,
                subheader: cardSubheader
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_5___default()), {
                component: "img",
                height: "194",
                image: imageUrl,
                alt: cardSummary
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_11___default()), {
                    variant: "body2",
                    color: "text.secondary",
                    children: cardSummary
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_CardActions__WEBPACK_IMPORTED_MODULE_7___default()), {
                disableSpacing: true,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10___default()), {
                        "aria-label": "add to favorites",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_13___default()), {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_10___default()), {
                        "aria-label": "share",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Share__WEBPACK_IMPORTED_MODULE_14___default()), {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ExpandMore, {
                        expand: expanded,
                        onClick: handleExpandClick,
                        "aria-expanded": expanded,
                        "aria-label": "show more",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_ExpandMore__WEBPACK_IMPORTED_MODULE_15___default()), {})
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Collapse__WEBPACK_IMPORTED_MODULE_8___default()), {
                in: expanded,
                timeout: "auto",
                unmountOnExit: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_11___default()), {
                            paragraph: true,
                            children: "Method:"
                        }),
                        cardSteps.map((step)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_11___default()), {
                                paragraph: true,
                                children: step
                            }, step))
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2465:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export app */
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3773);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3745);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3392);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__, firebase_app__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__, firebase_app__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDu_hEsypDSCaC4d52ZUNYH8IG7sLrBaww",
    authDomain: "recipe-project-58ad7.firebaseapp.com",
    projectId: "recipe-project-58ad7",
    storageBucket: "recipe-project-58ad7.appspot.com",
    messagingSenderId: "640300221963",
    appId: "1:640300221963:web:eb5b158c2fb5d0d073290e",
    measurementId: "G-Z6WEVWCFEB"
};
// const analytics = getAnalytics(app);
firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].initializeApp(firebaseConfig);
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_1__.initializeApp)(firebaseConfig);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9090:
/***/ (() => {



/***/ })

};
;