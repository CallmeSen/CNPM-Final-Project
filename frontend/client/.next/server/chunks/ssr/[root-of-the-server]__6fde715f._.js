module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/react-router-bridge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Link = ({ to, ...rest })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: to,
        ...rest
    }, void 0, false, {
        fileName: "[project]/src/lib/react-router-bridge.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useNavigate = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((to, options)=>{
        if (typeof to === "number") {
            if (to < 0) {
                router.back();
            } else {
                router.refresh();
            }
            return;
        }
        if (options?.replace) {
            router.replace(to, {
                scroll: options.scroll
            });
        } else {
            router.push(to, {
                scroll: options?.scroll
            });
        }
    // Accept the `state` option for compatibility, even though we do not persist it.
    }, [
        router
    ]);
};
const useParams = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    return params;
};
const BrowserRouter = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
const Routes = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
const Route = ({ element })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: element
    }, void 0, false);
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/config/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const stripTrailingSlash = (value)=>value.replace(/\/+$/, "");
const DEFAULT_RESTAURANT_BASE_URL = "http://localhost:5002";
const DEFAULT_AUTH_BASE_URL = "http://localhost:5001";
const DEFAULT_ORDER_BASE_URL = "http://localhost:5005";
const DEFAULT_PAYMENT_BASE_URL = "http://localhost:5004";
const shouldProxyApi = (("TURBOPACK compile-time value", "true") ?? "true").toLowerCase() === "true";
const RESTAURANT_SERVICE_BASE_URL = stripTrailingSlash(("TURBOPACK compile-time value", "http://localhost:5002") ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_RESTAURANT_BASE_URL);
const AUTH_SERVICE_BASE_URL = stripTrailingSlash(("TURBOPACK compile-time value", "http://localhost:5001") ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_AUTH_BASE_URL);
const ORDER_SERVICE_BASE_URL = stripTrailingSlash(("TURBOPACK compile-time value", "http://localhost:5005") ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_ORDER_BASE_URL);
const PAYMENT_SERVICE_BASE_URL = stripTrailingSlash(("TURBOPACK compile-time value", "http://localhost:5004") ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_PAYMENT_BASE_URL);
const buildServiceUrl = (baseUrl, path)=>{
    if (!path) {
        return baseUrl;
    }
    if (/^https?:\/\//i.test(path)) {
        return path;
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (shouldProxyApi && normalizedPath.startsWith("/api/")) {
        return normalizedPath;
    }
    return `${baseUrl}${normalizedPath}`;
};
const buildRestaurantServiceUrl = (path)=>buildServiceUrl(RESTAURANT_SERVICE_BASE_URL, path);
const buildAuthServiceUrl = (path)=>buildServiceUrl(AUTH_SERVICE_BASE_URL, path);
const buildOrderServiceUrl = (path)=>buildServiceUrl(ORDER_SERVICE_BASE_URL, path);
const buildPaymentServiceUrl = (path)=>buildServiceUrl(PAYMENT_SERVICE_BASE_URL, path);
}),
"[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/* eslint-disable @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/react-router-bridge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/bs/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/contexts/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.ts [app-ssr] (ecmascript)");
"use client";
;
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
        let base64 = parts[1] ?? "";
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
    const { cartItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartContext"]);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [orderData, setOrderData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        customerId: "",
        restaurantId: "",
        deliveryAddress: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [customerName, setCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [restaurantName, setRestaurantName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoadingCustomer, setIsLoadingCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const isSubmitting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false); // Prevent duplicate submissions
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return null;
        }
        //TURBOPACK unreachable
        ;
    }, []);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return cartItems.reduce((total, item)=>{
            const quantity = typeof item.quantity === "number" && item.quantity > 0 ? Math.floor(item.quantity) : 1;
            const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String(item.price ?? 0)) || 0;
            return total + priceValue * quantity;
        }, 0);
    }, [
        cartItems
    ]);
    const firstRestaurantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (cartItems.length > 0) {
            return String(cartItems[0].restaurantId ?? "");
        }
        return "";
    }, [
        cartItems
    ]);
    const displayRestaurantName = restaurantName || "Loading restaurant...";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const getCustomerName = async ()=>{
            setIsLoadingCustomer(true);
            try {
                if (!token) {
                    setCustomerName("No Token Found");
                    setIsLoadingCustomer(false);
                    return;
                }
                const tokenPayload = decodeJwtPayload(token) ?? {};
                const rawCustomerId = tokenPayload.id ?? tokenPayload._id ?? tokenPayload.userId ?? tokenPayload.user_id ?? tokenPayload.userID ?? tokenPayload.sub;
                const customerId = rawCustomerId ? String(rawCustomerId) : "";
                const possibleEndpoints = [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/auth/customer/profile"),
                    customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])(`/api/auth/customer/${customerId}`) : null,
                    customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])(`/api/customers/${customerId}`) : null,
                    customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])(`/api/auth/customers/${customerId}`) : null,
                    customerId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])(`/api/users/${customerId}`) : null
                ].filter(Boolean);
                let customerData = null;
                for (const endpoint of possibleEndpoints){
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(endpoint, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (response?.data) {
                            customerData = response.data;
                            break;
                        }
                    } catch  {
                        continue;
                    }
                }
                let resolvedCustomerName = "";
                if (customerData) {
                    const nested = customerData.data?.customer ?? customerData.customer ?? customerData;
                    const firstName = String(nested.firstName ?? "");
                    const lastName = String(nested.lastName ?? "");
                    if (firstName || lastName) {
                        resolvedCustomerName = `${firstName} ${lastName}`.trim();
                    } else {
                        resolvedCustomerName = String(nested.name ?? "") || String(nested.fullName ?? "") || String(nested.username ?? "") || String(nested.email ?? "") || "Customer";
                    }
                }
                if (!resolvedCustomerName) {
                    const firstName = String(tokenPayload.firstName ?? "");
                    const lastName = String(tokenPayload.lastName ?? "");
                    if (firstName || lastName) {
                        resolvedCustomerName = `${firstName} ${lastName}`.trim();
                    } else {
                        resolvedCustomerName = String(tokenPayload.name ?? "") || String(tokenPayload.username ?? "") || String(tokenPayload.email ?? "") || (customerId ? `Customer_${customerId.slice(0, 8)}` : "Customer");
                    }
                }
                setCustomerName(resolvedCustomerName);
                setOrderData((prev)=>({
                        ...prev,
                        customerId: customerId || ""
                    }));
            } catch (err) {
                console.error("Error resolving customer name", err);
                setCustomerName("Token Error");
            } finally{
                setIsLoadingCustomer(false);
            }
        };
        const getRestaurantDetails = async ()=>{
            const restaurantId = firstRestaurantId;
            if (!restaurantId) {
                setRestaurantName("No Restaurant Selected");
                return;
            }
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])(`/api/restaurant/details/${restaurantId}`));
                const matchedRestaurant = response.data?.restaurant;
                if (matchedRestaurant) {
                    setRestaurantName(String(matchedRestaurant.name ?? ""));
                    setOrderData((prev)=>({
                            ...prev,
                            restaurantId: String(matchedRestaurant._id ?? "")
                        }));
                } else {
                    setRestaurantName("Unknown Restaurant");
                }
            } catch (err) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isAxiosError(err) && err.response?.status === 404) {
                    try {
                        const fallback = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])("/api/restaurant/all"));
                        const restaurants = fallback.data?.restaurants ?? [];
                        const matchedRestaurant = restaurants.find((restaurant)=>String(restaurant._id) === restaurantId);
                        if (matchedRestaurant) {
                            setRestaurantName(String(matchedRestaurant.name ?? ""));
                            setOrderData((prev)=>({
                                    ...prev,
                                    restaurantId: String(matchedRestaurant._id ?? "")
                                }));
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
        };
        getCustomerName();
        getRestaurantDetails();
    }, [
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
                const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String(item.price ?? 0)) || 0;
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
            const existingPendingOrder = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Create order on backend first to get orderId
            const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            const ORDER_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5005") || "http://localhost:5005";
            console.log("🔵 Creating order on backend...", orderPayload);
            const response = await fetch(`${ORDER_SERVICE_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {}
                },
                body: JSON.stringify(orderPayload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Failed to create order:", response.status, errorText);
                throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
    const isSmallScreen = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px 0"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bs$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BsArrowLeftCircle"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "1600px",
                    margin: "0 auto",
                    padding: "0 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "1.2fr 1fr",
                        gap: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "40px",
                        alignItems: "start"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "white",
                                borderRadius: "20px",
                                padding: "30px",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "30px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: "30px"
                                    },
                                    children: cartItems.map((item, index)=>{
                                        const priceValue = typeof item.price === "number" ? item.price : Number.parseFloat(String(item.price ?? 0)) || 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "15px 0",
                                                borderBottom: index < cartItems.length - 1 ? "1px solid #eee" : "none"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.image ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildRestaurantServiceUrl"])(String(item.image ?? "")) : "https://placehold.co/60x60?text=Food",
                                                    alt: String(item.name ?? "Food Item"),
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            style: {
                                                                color: "#333",
                                                                fontSize: "16px",
                                                                fontWeight: 600,
                                                                margin: "0 0 5px 0"
                                                            },
                                                            children: String(item.name ?? "Food Item")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/orderManagement/CreateOrderFromCart.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                color: "#666",
                                                                fontSize: "14px",
                                                                margin: 0
                                                            },
                                                            children: String(item.category ?? "Unknown")
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: "right"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        }, item._id ? `${item._id}-${index}` : `idx-${index}`, true, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "15px",
                                        padding: "20px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: "white",
                                borderRadius: "20px",
                                padding: "30px",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)",
                                minHeight: "600px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "30px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: "100%"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "25px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                !isLoadingCustomer && !customerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "25px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "30px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            }, ("TURBOPACK compile-time value", void 0)) : `🍽️ Place Order • ${totalPrice.toLocaleString()} VND`
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
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
const __TURBOPACK__default__export__ = CreateOrderFromCart;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6fde715f._.js.map