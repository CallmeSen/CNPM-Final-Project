(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/react-router-bridge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserRouter",
    ()=>BrowserRouter,
    "Link",
    ()=>Link,
    "Route",
    ()=>Route,
    "Routes",
    ()=>Routes,
    "useNavigate",
    ()=>useNavigate,
    "useParams",
    ()=>useParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const Link = (param)=>{
    let { to, ...rest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: to,
        ...rest
    }, void 0, false, {
        fileName: "[project]/src/lib/react-router-bridge.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Link;
const useNavigate = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNavigate.useCallback": (to, options)=>{
            if (typeof to === "number") {
                if (to < 0) {
                    router.back();
                } else {
                    router.refresh();
                }
                return;
            }
            if (options === null || options === void 0 ? void 0 : options.replace) {
                router.replace(to, {
                    scroll: options.scroll
                });
            } else {
                router.push(to, {
                    scroll: options === null || options === void 0 ? void 0 : options.scroll
                });
            }
        // Accept the `state` option for compatibility, even though we do not persist it.
        }
    }["useNavigate.useCallback"], [
        router
    ]);
};
_s(useNavigate, "ZfeF/n2MjblzbBNA9N1I1g+AAac=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
const useParams = ()=>{
    _s1();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    return params;
};
_s1(useParams, "ptVOBrNG+HxHoHgEKX35E3Dmx+Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
const BrowserRouter = (param)=>{
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};
_c1 = BrowserRouter;
const Routes = (param)=>{
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};
_c2 = Routes;
const Route = (param)=>{
    let { element } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: element
    }, void 0, false);
};
_c3 = Route;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Link");
__turbopack_context__.k.register(_c1, "BrowserRouter");
__turbopack_context__.k.register(_c2, "Routes");
__turbopack_context__.k.register(_c3, "Route");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAuthServiceUrl",
    ()=>buildAuthServiceUrl,
    "buildOrderServiceUrl",
    ()=>buildOrderServiceUrl,
    "buildPaymentServiceUrl",
    ()=>buildPaymentServiceUrl,
    "buildRestaurantServiceUrl",
    ()=>buildRestaurantServiceUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const stripTrailingSlash = (value)=>value.replace(/\/+$/, "");
const DEFAULT_RESTAURANT_BASE_URL = "http://localhost:5002";
const DEFAULT_AUTH_BASE_URL = "http://localhost:5001";
const DEFAULT_ORDER_BASE_URL = "http://localhost:5005";
const DEFAULT_PAYMENT_BASE_URL = "http://localhost:5004";
var _process_env_NEXT_PUBLIC_USE_API_PROXY;
const shouldProxyApi = ((_process_env_NEXT_PUBLIC_USE_API_PROXY = ("TURBOPACK compile-time value", "true")) !== null && _process_env_NEXT_PUBLIC_USE_API_PROXY !== void 0 ? _process_env_NEXT_PUBLIC_USE_API_PROXY : "true").toLowerCase() === "true";
var _process_env_NEXT_PUBLIC_RESTAURANT_SERVICE_URL, _ref;
const RESTAURANT_SERVICE_BASE_URL = stripTrailingSlash((_ref = (_process_env_NEXT_PUBLIC_RESTAURANT_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5002")) !== null && _process_env_NEXT_PUBLIC_RESTAURANT_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_RESTAURANT_SERVICE_URL : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL) !== null && _ref !== void 0 ? _ref : DEFAULT_RESTAURANT_BASE_URL);
var _process_env_NEXT_PUBLIC_AUTH_SERVICE_URL, _ref1;
const AUTH_SERVICE_BASE_URL = stripTrailingSlash((_ref1 = (_process_env_NEXT_PUBLIC_AUTH_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5001")) !== null && _process_env_NEXT_PUBLIC_AUTH_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_AUTH_SERVICE_URL : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL) !== null && _ref1 !== void 0 ? _ref1 : DEFAULT_AUTH_BASE_URL);
var _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL, _ref2;
const ORDER_SERVICE_BASE_URL = stripTrailingSlash((_ref2 = (_process_env_NEXT_PUBLIC_ORDER_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5005")) !== null && _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL) !== null && _ref2 !== void 0 ? _ref2 : DEFAULT_ORDER_BASE_URL);
var _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL, _ref3;
const PAYMENT_SERVICE_BASE_URL = stripTrailingSlash((_ref3 = (_process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5004")) !== null && _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL) !== null && _ref3 !== void 0 ? _ref3 : DEFAULT_PAYMENT_BASE_URL);
const buildServiceUrl = (baseUrl, path)=>{
    if (!path) {
        return baseUrl;
    }
    if (/^https?:\/\//i.test(path)) {
        return path;
    }
    const normalizedPath = path.startsWith("/") ? path : "/".concat(path);
    if (shouldProxyApi && normalizedPath.startsWith("/api/")) {
        return normalizedPath;
    }
    return "".concat(baseUrl).concat(normalizedPath);
};
const buildRestaurantServiceUrl = (path)=>buildServiceUrl(RESTAURANT_SERVICE_BASE_URL, path);
const buildAuthServiceUrl = (path)=>buildServiceUrl(AUTH_SERVICE_BASE_URL, path);
const buildOrderServiceUrl = (path)=>buildServiceUrl(ORDER_SERVICE_BASE_URL, path);
const buildPaymentServiceUrl = (path)=>buildServiceUrl(PAYMENT_SERVICE_BASE_URL, path);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/* eslint-disable @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/react-router-bridge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bs/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const decodeJwtPayload = (token)=>{
    if (!token) {
        return null;
    }
    try {
        const parts = token.split(".");
        if (parts.length < 2) {
            return null;
        }
        var _parts_;
        let base64 = (_parts_ = parts[1]) !== null && _parts_ !== void 0 ? _parts_ : "";
        base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
        while(base64.length % 4 !== 0){
            base64 += "=";
        }
        const payloadJson = atob(base64);
        return JSON.parse(payloadJson);
    } catch (error) {
        console.error("Error decoding token payload", error);
        return null;
    }
};
const CreateOrderFromCart = ()=>{
    _s();
    const { cartItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartContext"]);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [orderData, setOrderData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customerId: "",
        restaurantId: "",
        deliveryAddress: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customerName, setCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [restaurantName, setRestaurantName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoadingCustomer, setIsLoadingCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isSubmitting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Prevent duplicate submissions
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateOrderFromCart.useMemo[token]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return localStorage.getItem("token");
        }
    }["CreateOrderFromCart.useMemo[token]"], []);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateOrderFromCart.useMemo[totalPrice]": ()=>{
            return cartItems.reduce({
                "CreateOrderFromCart.useMemo[totalPrice]": (total, item)=>{
                    const quantity = typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1;
                    var _item_price;
                    const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : 0)) || 0;
                    return total + priceValue * quantity;
                }
            }["CreateOrderFromCart.useMemo[totalPrice]"], 0);
        }
    }["CreateOrderFromCart.useMemo[totalPrice]"], [
        cartItems
    ]);
    const firstRestaurantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CreateOrderFromCart.useMemo[firstRestaurantId]": ()=>{
            if (cartItems.length > 0) {
                var _restaurantId;
                return String((_restaurantId = cartItems[0].restaurantId) !== null && _restaurantId !== void 0 ? _restaurantId : "");
            }
            return "";
        }
    }["CreateOrderFromCart.useMemo[firstRestaurantId]"], [
        cartItems
    ]);
    const displayRestaurantName = restaurantName || "Loading restaurant...";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreateOrderFromCart.useEffect": ()=>{
            const getCustomerName = {
                "CreateOrderFromCart.useEffect.getCustomerName": async ()=>{
                    setIsLoadingCustomer(true);
                    try {
                        if (!token) {
                            setCustomerName("No Token Found");
                            setIsLoadingCustomer(false);
                            return;
                        }
                        var _decodeJwtPayload;
                        const tokenPayload = (_decodeJwtPayload = decodeJwtPayload(token)) !== null && _decodeJwtPayload !== void 0 ? _decodeJwtPayload : {};
                        var _tokenPayload_id, _ref, _ref1, _ref2, _ref3;
                        const rawCustomerId = (_ref3 = (_ref2 = (_ref1 = (_ref = (_tokenPayload_id = tokenPayload.id) !== null && _tokenPayload_id !== void 0 ? _tokenPayload_id : tokenPayload._id) !== null && _ref !== void 0 ? _ref : tokenPayload.userId) !== null && _ref1 !== void 0 ? _ref1 : tokenPayload.user_id) !== null && _ref2 !== void 0 ? _ref2 : tokenPayload.userID) !== null && _ref3 !== void 0 ? _ref3 : tokenPayload.sub;
                        const customerId = rawCustomerId ? String(rawCustomerId) : "";
                        const possibleEndpoints = [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/auth/customer/profile"),
                            customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/auth/customer/".concat(customerId)) : null,
                            customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/customers/".concat(customerId)) : null,
                            customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/auth/customers/".concat(customerId)) : null,
                            customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/users/".concat(customerId)) : null
                        ].filter(Boolean);
                        let customerData = null;
                        for (const endpoint of possibleEndpoints){
                            try {
                                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(endpoint, {
                                    headers: {
                                        Authorization: "Bearer ".concat(token)
                                    }
                                });
                                if (response === null || response === void 0 ? void 0 : response.data) {
                                    customerData = response.data;
                                    break;
                                }
                            } catch (e) {
                                continue;
                            }
                        }
                        let resolvedCustomerName = "";
                        if (customerData) {
                            var _this;
                            var _customer, _ref4;
                            const nested = (_ref4 = (_customer = (_this = customerData.data) === null || _this === void 0 ? void 0 : _this.customer) !== null && _customer !== void 0 ? _customer : customerData.customer) !== null && _ref4 !== void 0 ? _ref4 : customerData;
                            var _firstName;
                            const firstName = String((_firstName = nested.firstName) !== null && _firstName !== void 0 ? _firstName : "");
                            var _lastName;
                            const lastName = String((_lastName = nested.lastName) !== null && _lastName !== void 0 ? _lastName : "");
                            if (firstName || lastName) {
                                resolvedCustomerName = "".concat(firstName, " ").concat(lastName).trim();
                            } else {
                                var _name, _fullName, _username, _email;
                                resolvedCustomerName = String((_name = nested.name) !== null && _name !== void 0 ? _name : "") || String((_fullName = nested.fullName) !== null && _fullName !== void 0 ? _fullName : "") || String((_username = nested.username) !== null && _username !== void 0 ? _username : "") || String((_email = nested.email) !== null && _email !== void 0 ? _email : "") || "Customer";
                            }
                        }
                        if (!resolvedCustomerName) {
                            var _tokenPayload_firstName;
                            const firstName = String((_tokenPayload_firstName = tokenPayload.firstName) !== null && _tokenPayload_firstName !== void 0 ? _tokenPayload_firstName : "");
                            var _tokenPayload_lastName;
                            const lastName = String((_tokenPayload_lastName = tokenPayload.lastName) !== null && _tokenPayload_lastName !== void 0 ? _tokenPayload_lastName : "");
                            if (firstName || lastName) {
                                resolvedCustomerName = "".concat(firstName, " ").concat(lastName).trim();
                            } else {
                                var _tokenPayload_name, _tokenPayload_username, _tokenPayload_email;
                                resolvedCustomerName = String((_tokenPayload_name = tokenPayload.name) !== null && _tokenPayload_name !== void 0 ? _tokenPayload_name : "") || String((_tokenPayload_username = tokenPayload.username) !== null && _tokenPayload_username !== void 0 ? _tokenPayload_username : "") || String((_tokenPayload_email = tokenPayload.email) !== null && _tokenPayload_email !== void 0 ? _tokenPayload_email : "") || (customerId ? "Customer_".concat(customerId.slice(0, 8)) : "Customer");
                            }
                        }
                        setCustomerName(resolvedCustomerName);
                        setOrderData({
                            "CreateOrderFromCart.useEffect.getCustomerName": (prev)=>({
                                    ...prev,
                                    customerId: customerId || ""
                                })
                        }["CreateOrderFromCart.useEffect.getCustomerName"]);
                    } catch (err) {
                        console.error("Error resolving customer name", err);
                        setCustomerName("Token Error");
                    } finally{
                        setIsLoadingCustomer(false);
                    }
                }
            }["CreateOrderFromCart.useEffect.getCustomerName"];
            const getRestaurantDetails = {
                "CreateOrderFromCart.useEffect.getRestaurantDetails": async ()=>{
                    const restaurantId = firstRestaurantId;
                    if (!restaurantId) {
                        setRestaurantName("No Restaurant Selected");
                        return;
                    }
                    try {
                        var _response_data;
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])("/api/restaurant/details/".concat(restaurantId)));
                        const matchedRestaurant = (_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.restaurant;
                        if (matchedRestaurant) {
                            var _matchedRestaurant_name;
                            setRestaurantName(String((_matchedRestaurant_name = matchedRestaurant.name) !== null && _matchedRestaurant_name !== void 0 ? _matchedRestaurant_name : ""));
                            setOrderData({
                                "CreateOrderFromCart.useEffect.getRestaurantDetails": (prev)=>{
                                    var _matchedRestaurant__id;
                                    return {
                                        ...prev,
                                        restaurantId: String((_matchedRestaurant__id = matchedRestaurant._id) !== null && _matchedRestaurant__id !== void 0 ? _matchedRestaurant__id : "")
                                    };
                                }
                            }["CreateOrderFromCart.useEffect.getRestaurantDetails"]);
                        } else {
                            setRestaurantName("Unknown Restaurant");
                        }
                    } catch (err) {
                        var _err_response;
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(err) && ((_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.status) === 404) {
                            try {
                                var _fallback_data;
                                const fallback = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])("/api/restaurant/all"));
                                var _fallback_data_restaurants;
                                const restaurants = (_fallback_data_restaurants = (_fallback_data = fallback.data) === null || _fallback_data === void 0 ? void 0 : _fallback_data.restaurants) !== null && _fallback_data_restaurants !== void 0 ? _fallback_data_restaurants : [];
                                const matchedRestaurant = restaurants.find({
                                    "CreateOrderFromCart.useEffect.getRestaurantDetails.matchedRestaurant": (restaurant)=>String(restaurant._id) === restaurantId
                                }["CreateOrderFromCart.useEffect.getRestaurantDetails.matchedRestaurant"]);
                                if (matchedRestaurant) {
                                    var _matchedRestaurant_name1;
                                    setRestaurantName(String((_matchedRestaurant_name1 = matchedRestaurant.name) !== null && _matchedRestaurant_name1 !== void 0 ? _matchedRestaurant_name1 : ""));
                                    setOrderData({
                                        "CreateOrderFromCart.useEffect.getRestaurantDetails": (prev)=>{
                                            var _matchedRestaurant__id;
                                            return {
                                                ...prev,
                                                restaurantId: String((_matchedRestaurant__id = matchedRestaurant._id) !== null && _matchedRestaurant__id !== void 0 ? _matchedRestaurant__id : "")
                                            };
                                        }
                                    }["CreateOrderFromCart.useEffect.getRestaurantDetails"]);
                                    return;
                                }
                            } catch (fallbackError) {
                                console.error("Fallback restaurant lookup failed", fallbackError);
                            }
                        } else {
                            console.error("Error fetching restaurant details", err);
                        }
                        setRestaurantName("Unknown Restaurant");
                    }
                }
            }["CreateOrderFromCart.useEffect.getRestaurantDetails"];
            getCustomerName();
            getRestaurantDetails();
        }
    }["CreateOrderFromCart.useEffect"], [
        cartItems,
        firstRestaurantId,
        token
    ]);
    const validateForm = ()=>{
        if (!orderData.customerId.trim()) {
            setError("Customer account is required. Please sign in again.");
            return false;
        }
        if (!orderData.deliveryAddress.trim()) {
            setError("Delivery address is required");
            return false;
        }
        if (cartItems.length === 0) {
            setError("Cart is empty. Please add items to cart first.");
            return false;
        }
        return true;
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        event.stopPropagation(); // Prevent event bubbling
        console.log("🔵 handleSubmit called, isSubmitting:", isSubmitting.current, "loading:", loading);
        // Prevent duplicate submissions
        if (isSubmitting.current || loading) {
            console.log("⚠️ Already submitting order, ignoring duplicate click");
            return;
        }
        isSubmitting.current = true;
        setLoading(true);
        setError("");
        setSuccess("");
        if (!validateForm()) {
            setLoading(false);
            isSubmitting.current = false;
            return;
        }
        try {
            const orderItems = cartItems.map((item)=>{
                var _item_price;
                const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : 0)) || 0;
                const quantity = typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1;
                return {
                    foodId: item._id,
                    quantity,
                    price: priceValue
                };
            });
            const calculatedTotalPrice = orderItems.reduce((sum, item)=>sum + item.quantity * item.price, 0);
            const orderPayload = {
                customerId: orderData.customerId,
                restaurantId: orderData.restaurantId || firstRestaurantId,
                items: orderItems,
                deliveryAddress: orderData.deliveryAddress,
                totalPrice: calculatedTotalPrice
            };
            // Check if there's already a pending order to avoid duplicates
            const existingPendingOrder = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("pendingOrder") : "TURBOPACK unreachable";
            if (existingPendingOrder) {
                try {
                    const parsed = JSON.parse(existingPendingOrder);
                    if (parsed.orderId) {
                        console.log("⚠️ Found existing pending order, reusing:", parsed.orderId);
                        navigate("/checkout", {
                            state: {
                                orderData: parsed,
                                fromCart: true
                            }
                        });
                        return;
                    }
                } catch (e) {
                    // Clear invalid data
                    localStorage.removeItem("pendingOrder");
                }
            }
            // Create order on backend first to get orderId
            const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable";
            const ORDER_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5005") || "http://localhost:5005";
            console.log("🔵 Creating order on backend...", orderPayload);
            const response = await fetch("".concat(ORDER_SERVICE_URL, "/api/orders"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...token ? {
                        Authorization: "Bearer ".concat(token)
                    } : {}
                },
                body: JSON.stringify(orderPayload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Failed to create order:", response.status, errorText);
                throw new Error("Failed to create order: ".concat(response.status, " - ").concat(errorText));
            }
            const createdOrder = await response.json();
            console.log("✅ Order created successfully:", createdOrder);
            if (!createdOrder.orderId) {
                console.error("⚠️ Warning: Order created but no orderId in response!", createdOrder);
            }
            // Save order with orderId to localStorage
            const orderWithId = {
                ...orderPayload,
                _id: createdOrder._id,
                orderId: createdOrder.orderId
            };
            console.log("💾 Saving order to localStorage:", orderWithId);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("pendingOrder", JSON.stringify(orderWithId));
            }
            navigate("/checkout", {
                state: {
                    orderData: orderWithId,
                    fromCart: true
                }
            });
        } catch (err) {
            console.error("Error preparing order", err);
            setError("Failed to prepare order. Please try again.");
            isSubmitting.current = false; // Reset flag on error
        } finally{
            setLoading(false);
        // Don't reset isSubmitting.current here to prevent re-submission after navigation
        }
    };
    const handleInputChange = (event)=>{
        const { name, value } = event.target;
        setOrderData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleBackMouseEnter = (event)=>{
        event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        event.currentTarget.style.transform = "translateY(-2px)";
    };
    const handleBackMouseLeave = (event)=>{
        event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        event.currentTarget.style.transform = "translateY(0)";
    };
    const handleSubmitMouseEnter = (event)=>{
        if (!loading && cartItems.length > 0) {
            event.currentTarget.style.backgroundColor = "#ff5722";
            event.currentTarget.style.transform = "translateY(-2px)";
            event.currentTarget.style.boxShadow = "0 15px 30px rgba(255, 127, 80, 0.4)";
        }
    };
    const handleSubmitMouseLeave = (event)=>{
        if (!loading && cartItems.length > 0) {
            event.currentTarget.style.backgroundColor = "#ff7f50";
            event.currentTarget.style.transform = "translateY(0)";
            event.currentTarget.style.boxShadow = "0 10px 20px rgba(255, 127, 80, 0.3)";
        }
    };
    const isSmallScreen = ("TURBOPACK compile-time truthy", 1) ? window.innerWidth <= 1024 : "TURBOPACK unreachable";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px 0"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>navigate("/customer/cart"),
                    style: {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "none",
                        borderRadius: "50px",
                        padding: "12px 20px",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "30px",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease"
                    },
                    onMouseEnter: handleBackMouseEnter,
                    onMouseLeave: handleBackMouseLeave,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BsArrowLeftCircle"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                            lineNumber: 480,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        "Back to Cart"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                    lineNumber: 460,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "1600px",
                    margin: "0 auto",
                    padding: "0 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: isSmallScreen ? "1fr" : "1.2fr 1fr",
                        gap: isSmallScreen ? "20px" : "40px",
                        alignItems: "start"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "white",
                                borderRadius: "20px",
                                padding: "30px",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "30px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "#ff7f50",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "15px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "24px"
                                                },
                                                children: "🛒"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                lineNumber: 516,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                color: "#333",
                                                fontSize: "28px",
                                                fontWeight: 700,
                                                margin: 0
                                            },
                                            children: "Order Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 518,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: "30px"
                                    },
                                    children: cartItems.map((item, index)=>{
                                        var _item_price;
                                        const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : 0)) || 0;
                                        var _item_image, _item_name, _item_name1, _item_category;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "15px 0",
                                                borderBottom: index < cartItems.length - 1 ? "1px solid #eee" : "none"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.image ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])(String((_item_image = item.image) !== null && _item_image !== void 0 ? _item_image : "")) : "https://placehold.co/60x60?text=Food",
                                                    alt: String((_item_name = item.name) !== null && _item_name !== void 0 ? _item_name : "Food Item"),
                                                    style: {
                                                        width: "60px",
                                                        height: "60px",
                                                        borderRadius: "12px",
                                                        objectFit: "cover",
                                                        marginRight: "15px"
                                                    },
                                                    onError: (event)=>{
                                                        event.currentTarget.src = "https://placehold.co/60x60?text=Food";
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            style: {
                                                                color: "#333",
                                                                fontSize: "16px",
                                                                fontWeight: 600,
                                                                margin: "0 0 5px 0"
                                                            },
                                                            children: String((_item_name1 = item.name) !== null && _item_name1 !== void 0 ? _item_name1 : "Food Item")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                color: "#666",
                                                                fontSize: "14px",
                                                                margin: 0
                                                            },
                                                            children: String((_item_category = item.category) !== null && _item_category !== void 0 ? _item_category : "Unknown")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                            lineNumber: 570,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 559,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: "right"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: "#ff7f50",
                                                            fontSize: "18px",
                                                            fontWeight: 700,
                                                            margin: 0
                                                        },
                                                        children: [
                                                            priceValue.toLocaleString(),
                                                            " VND"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, item._id ? "".concat(item._id, "-").concat(index) : "idx-".concat(index), true, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 531,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 523,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "15px",
                                        padding: "20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "20px",
                                                fontWeight: 600,
                                                color: "#333"
                                            },
                                            children: "Total Amount:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 601,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "28px",
                                                fontWeight: 700,
                                                color: "#ff7f50"
                                            },
                                            children: [
                                                totalPrice.toLocaleString(),
                                                " VND"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 604,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 591,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                            lineNumber: 494,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "white",
                                borderRadius: "20px",
                                padding: "30px",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)",
                                minHeight: "600px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "30px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "#667eea",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "15px"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "24px"
                                                },
                                                children: "📝"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                lineNumber: 633,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 621,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                color: "#333",
                                                fontSize: "28px",
                                                fontWeight: 700,
                                                margin: 0
                                            },
                                            children: "Delivery Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 635,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 620,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: "#fee",
                                        color: "#c33",
                                        padding: "15px",
                                        borderRadius: "12px",
                                        marginBottom: "20px",
                                        border: "1px solid #fcc"
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 641,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: "#efe",
                                        color: "#3c3",
                                        padding: "15px",
                                        borderRadius: "12px",
                                        marginBottom: "20px",
                                        border: "1px solid #cfc"
                                    },
                                    children: success
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 655,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: "100%"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "25px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: "block",
                                                        marginBottom: "8px",
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                        color: "#333"
                                                    },
                                                    children: "👤 Customer Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: "100%",
                                                        padding: "15px",
                                                        border: "2px solid #eee",
                                                        borderRadius: "12px",
                                                        fontSize: "16px",
                                                        backgroundColor: "#f8f9fa",
                                                        color: "#666",
                                                        boxSizing: "border-box",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        minHeight: "54px"
                                                    },
                                                    children: isLoadingCustomer ? "Loading customer name..." : customerName || "Customer name not available"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                !isLoadingCustomer && !customerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#999",
                                                        marginTop: "5px"
                                                    },
                                                    children: "Debug: Check browser console for detailed logs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 670,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "25px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: "block",
                                                        marginBottom: "8px",
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                        color: "#333"
                                                    },
                                                    children: "🏪 Restaurant Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 709,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: "100%",
                                                        padding: "15px",
                                                        border: "2px solid #eee",
                                                        borderRadius: "12px",
                                                        fontSize: "16px",
                                                        backgroundColor: "#f8f9fa",
                                                        color: "#666",
                                                        boxSizing: "border-box",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        minHeight: "54px"
                                                    },
                                                    children: displayRestaurantName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 720,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "hidden",
                                                    name: "restaurantId",
                                                    value: orderData.restaurantId || firstRestaurantId
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 708,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "30px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: "block",
                                                        marginBottom: "8px",
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                        color: "#333"
                                                    },
                                                    children: "📍 Delivery Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 745,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    name: "deliveryAddress",
                                                    value: orderData.deliveryAddress,
                                                    onChange: handleInputChange,
                                                    placeholder: "Enter your complete delivery address...",
                                                    required: true,
                                                    rows: 2,
                                                    style: {
                                                        width: "100%",
                                                        padding: "10px",
                                                        border: "2px solid #eee",
                                                        borderRadius: "12px",
                                                        fontSize: "16px",
                                                        color: "#111827",
                                                        fontWeight: 400,
                                                        transition: "border-color 0.3s ease",
                                                        outline: "none",
                                                        resize: "vertical",
                                                        boxSizing: "border-box",
                                                        fontFamily: "inherit",
                                                        lineHeight: "1.4"
                                                    },
                                                    onFocus: (event)=>{
                                                        event.currentTarget.style.borderColor = "#667eea";
                                                    },
                                                    onBlur: (event)=>{
                                                        event.currentTarget.style.borderColor = "#eee";
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSubmit,
                                            disabled: loading || cartItems.length === 0,
                                            style: {
                                                width: "100%",
                                                padding: "18px",
                                                backgroundColor: loading ? "#ccc" : "#ff7f50",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "15px",
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                cursor: loading ? "not-allowed" : "pointer",
                                                transition: "all 0.3s ease",
                                                boxShadow: "0 10px 20px rgba(255, 127, 80, 0.3)",
                                                boxSizing: "border-box",
                                                marginTop: "auto"
                                            },
                                            onMouseEnter: handleSubmitMouseEnter,
                                            onMouseLeave: handleSubmitMouseLeave,
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "20px",
                                                            height: "20px",
                                                            border: "2px solid transparent",
                                                            borderTop: "2px solid white",
                                                            borderRadius: "50%",
                                                            animation: "spin 1s linear infinite"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Creating Order..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                lineNumber: 809,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)) : "🍽️ Place Order • ".concat(totalPrice.toLocaleString(), " VND")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                            lineNumber: 787,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                    lineNumber: 669,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                            lineNumber: 610,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                    lineNumber: 486,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                lineNumber: 485,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n          @keyframes spin {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n          }\n        "
            }, void 0, false, {
                fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                lineNumber: 838,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
        lineNumber: 452,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CreateOrderFromCart, "CysrcnY4b0g2P69RjkATTqZ18DI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"]
    ];
});
_c = CreateOrderFromCart;
const __TURBOPACK__default__export__ = CreateOrderFromCart;
var _c;
__turbopack_context__.k.register(_c, "CreateOrderFromCart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a150d784._.js.map