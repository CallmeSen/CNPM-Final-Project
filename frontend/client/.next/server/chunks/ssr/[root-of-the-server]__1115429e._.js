module.exports = [
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
"[project]/src/app/styles/checkout.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backLink": "checkout-module__d81G3q__backLink",
  "breadcrumbCurrent": "checkout-module__d81G3q__breadcrumbCurrent",
  "breadcrumbLink": "checkout-module__d81G3q__breadcrumbLink",
  "breadcrumbSeparator": "checkout-module__d81G3q__breadcrumbSeparator",
  "breadcrumbs": "checkout-module__d81G3q__breadcrumbs",
  "buttonIcon": "checkout-module__d81G3q__buttonIcon",
  "cardBrand": "checkout-module__d81G3q__cardBrand",
  "cardDetailsGrid": "checkout-module__d81G3q__cardDetailsGrid",
  "cardElement": "checkout-module__d81G3q__cardElement",
  "cardElementContainer": "checkout-module__d81G3q__cardElementContainer",
  "cardFieldWrapper": "checkout-module__d81G3q__cardFieldWrapper",
  "cardLabel": "checkout-module__d81G3q__cardLabel",
  "cashActions": "checkout-module__d81G3q__cashActions",
  "cashDescription": "checkout-module__d81G3q__cashDescription",
  "cashSection": "checkout-module__d81G3q__cashSection",
  "checkoutContainer": "checkout-module__d81G3q__checkoutContainer",
  "checkoutFallback": "checkout-module__d81G3q__checkoutFallback",
  "checkoutFooter": "checkout-module__d81G3q__checkoutFooter",
  "checkoutGrid": "checkout-module__d81G3q__checkoutGrid",
  "emptyCartActions": "checkout-module__d81G3q__emptyCartActions",
  "emptyCartDescription": "checkout-module__d81G3q__emptyCartDescription",
  "emptyCartIcon": "checkout-module__d81G3q__emptyCartIcon",
  "emptyCartTitle": "checkout-module__d81G3q__emptyCartTitle",
  "emptyCheckoutCard": "checkout-module__d81G3q__emptyCheckoutCard",
  "emptyCheckoutWrapper": "checkout-module__d81G3q__emptyCheckoutWrapper",
  "errorMessage": "checkout-module__d81G3q__errorMessage",
  "fadeInUp": "checkout-module__d81G3q__fadeInUp",
  "methodDescription": "checkout-module__d81G3q__methodDescription",
  "methodEmoji": "checkout-module__d81G3q__methodEmoji",
  "methodNotice": "checkout-module__d81G3q__methodNotice",
  "methodOption": "checkout-module__d81G3q__methodOption",
  "methodOptions": "checkout-module__d81G3q__methodOptions",
  "methodSection": "checkout-module__d81G3q__methodSection",
  "methodTitle": "checkout-module__d81G3q__methodTitle",
  "paymentForm": "checkout-module__d81G3q__paymentForm",
  "paymentHeader": "checkout-module__d81G3q__paymentHeader",
  "paymentIcon": "checkout-module__d81G3q__paymentIcon",
  "paymentSection": "checkout-module__d81G3q__paymentSection",
  "paymentSubtitle": "checkout-module__d81G3q__paymentSubtitle",
  "paymentTitle": "checkout-module__d81G3q__paymentTitle",
  "primaryButton": "checkout-module__d81G3q__primaryButton",
  "secondaryButton": "checkout-module__d81G3q__secondaryButton",
  "submitButton": "checkout-module__d81G3q__submitButton",
  "successMessage": "checkout-module__d81G3q__successMessage",
  "summaryAddress": "checkout-module__d81G3q__summaryAddress",
  "summaryAddressLabel": "checkout-module__d81G3q__summaryAddressLabel",
  "summaryFooter": "checkout-module__d81G3q__summaryFooter",
  "summaryHeader": "checkout-module__d81G3q__summaryHeader",
  "summaryIcon": "checkout-module__d81G3q__summaryIcon",
  "summaryItem": "checkout-module__d81G3q__summaryItem",
  "summaryItemBody": "checkout-module__d81G3q__summaryItemBody",
  "summaryItemName": "checkout-module__d81G3q__summaryItemName",
  "summaryItemPrice": "checkout-module__d81G3q__summaryItemPrice",
  "summaryItemQuantity": "checkout-module__d81G3q__summaryItemQuantity",
  "summaryItems": "checkout-module__d81G3q__summaryItems",
  "summarySection": "checkout-module__d81G3q__summarySection",
  "summarySubtitle": "checkout-module__d81G3q__summarySubtitle",
  "summaryTitle": "checkout-module__d81G3q__summaryTitle",
  "supportBox": "checkout-module__d81G3q__supportBox",
});
}),
"[project]/src/app/pages/payment/Checkout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/lib/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/contexts/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/styles/checkout.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
;
;
;
const publishableKey = ("TURBOPACK compile-time value", "pk_test_51S6DRtPb5k3ojf4pY5t8beaMLClnsc0CwnowMxbCJW6henbjlN8uju2CVextQkMuncqKToNSZO18YdKXuOMTwQYl00Z6BWamZc") ?? "";
const stripePromise = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadStripe"])(publishableKey) : "TURBOPACK unreachable";
const ORDER_SERVICE_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5005") ?? "http://localhost:5005";
const PAYMENT_SERVICE_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5004") ?? "http://localhost:5004";
const formatCurrency = (amount)=>amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
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
    } catch (tokenError) {
        console.error("Failed to decode auth token", tokenError);
        return null;
    }
};
const decodeCustomerIdFromToken = (token)=>{
    const payload = decodeJwtPayload(token);
    if (!payload) {
        return "";
    }
    const candidate = payload.id ?? payload._id ?? payload.sub ?? payload.userId ?? payload.user_id ?? payload.userID;
    if (!candidate) {
        return "";
    }
    return String(candidate).trim();
};
const buildOrderSubmissionPayload = (order, token)=>{
    if (!order) {
        return {
            error: "No order data available."
        };
    }
    const decodedIdFromToken = decodeCustomerIdFromToken(token);
    let resolvedCustomerId = decodedIdFromToken;
    if (!resolvedCustomerId) {
        resolvedCustomerId = typeof order?.customerId === "string" ? order.customerId.trim() : "";
    }
    if (!resolvedCustomerId) {
        return {
            error: "We could not validate your account for this order. Please sign in again and retry."
        };
    }
    const restaurantId = String(order.restaurantId ?? "").trim();
    if (!restaurantId) {
        return {
            error: "We could not determine the restaurant for this order. Please return to your cart and try again."
        };
    }
    const deliveryAddress = String(order.deliveryAddress ?? "").trim();
    if (!deliveryAddress) {
        return {
            error: "Your delivery address is missing. Please update it in your cart and try again."
        };
    }
    const sanitizedItems = order.items?.reduce((acc, item)=>{
        const foodId = String(item.foodId ?? "").trim();
        if (!foodId) {
            return acc;
        }
        const rawQuantity = Number(item.quantity ?? 0);
        const quantity = Number.isFinite(rawQuantity) ? Math.max(1, Math.floor(rawQuantity)) : 0;
        const rawPrice = Number(item.price ?? 0);
        const price = Number.isFinite(rawPrice) ? Math.round(rawPrice * 100) / 100 : 0;
        if (quantity <= 0 || price <= 0) {
            return acc;
        }
        acc.push({
            foodId,
            quantity,
            price
        });
        return acc;
    }, []) ?? [];
    if (sanitizedItems.length === 0) {
        return {
            error: "We could not find any items in your order. Please add items to your cart and try again."
        };
    }
    const totalPrice = sanitizedItems.reduce((sum, item)=>sum + item.quantity * item.price, 0);
    return {
        payload: {
            customerId: resolvedCustomerId,
            restaurantId,
            items: sanitizedItems,
            deliveryAddress,
            totalPrice
        }
    };
};
const usePendingOrder = ()=>{
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const orderPayloadRaw = searchParams.get("order");
    if (orderPayloadRaw) {
        try {
            const parsed = JSON.parse(decodeURIComponent(orderPayloadRaw));
            if (parsed && typeof parsed === "object") {
                return parsed;
            }
        } catch (error) {
            console.error("Failed to parse order payload from URL", error);
        }
    }
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
    const saved = undefined;
};
// Main checkout content component
const CheckoutContent = ({ stripeEnabled })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const order = usePendingOrder();
    const [selectedMethod, setSelectedMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customerProfile, setCustomerProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check authentication and redirect to login if not authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
        const token = undefined;
    }, [
        router
    ]);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const amount = order?.totalPrice ?? 0;
        return Number.isFinite(amount) ? amount : 0;
    }, [
        order
    ]);
    const billingDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const firstName = customerProfile?.firstName ?? "Customer";
        const lastName = customerProfile?.lastName ?? "";
        const email = customerProfile?.email ?? "customer@example.com";
        const phone = customerProfile?.phone ?? "";
        return {
            firstName,
            lastName,
            fullName: [
                firstName,
                lastName
            ].filter(Boolean).join(" "),
            email,
            phone
        };
    }, [
        customerProfile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchCustomerProfile = async ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const token = undefined;
        };
        fetchCustomerProfile();
    }, []);
    const handleMethodSelect = (method)=>{
        setSelectedMethod(method);
    };
    if (!order || !order.items || order.items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCheckoutWrapper,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCheckoutCard,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCartIcon,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "120",
                            height: "120",
                            viewBox: "0 0 120 120",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "60",
                                    fill: "#F0F4F8"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M40 45C40 43.8954 40.8954 43 42 43H78C79.1046 43 80 43.8954 80 45V75C80 76.1046 79.1046 77 78 77H42C40.8954 77 40 76.1046 40 75V45Z",
                                    stroke: "#94A3B8",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M50 43V40C50 34.4772 54.4772 30 60 30C65.5228 30 70 34.4772 70 40V43",
                                    stroke: "#94A3B8",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M45 60L55 70L75 50",
                                    stroke: "#3B82F6",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    opacity: "0.3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                            lineNumber: 293,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCartTitle,
                        children: "Your Cart is Empty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCartDescription,
                        children: "Looks like you haven't added any items to your cart yet. Browse our delicious menu and find something you love!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCartActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primaryButton,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].buttonIcon,
                                        children: "🍽️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Explore Restaurants"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/customer/order-history",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton,
                                children: "View Order History"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 291,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/pages/payment/Checkout.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checkoutContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbs,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbLink,
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/customer/cart",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbLink,
                        children: "Cart"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbCurrent,
                        children: "Checkout"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checkoutGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderSummary, {
                        order: order,
                        totalPrice: totalPrice,
                        billingDetails: billingDetails
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentMethodSelection, {
                        stripeEnabled: stripeEnabled,
                        onSelect: handleMethodSelect
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 335,
                        columnNumber: 37
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "cash" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CashPaymentSection, {
                        order: order,
                        totalPrice: totalPrice,
                        onBack: ()=>setSelectedMethod(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "stripe" && stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StripePaymentSection, {
                        order: order,
                        totalPrice: totalPrice,
                        billingDetails: billingDetails,
                        onBack: ()=>setSelectedMethod(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "stripe" && !stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodNotice,
                                children: "Card payments are unavailable right now. Please select cash on delivery."
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton,
                                onClick: ()=>setSelectedMethod(null),
                                children: "Go back"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checkoutFooter,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Secure checkout with flexible payment options."
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Need to make changes? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                children: "Go back"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 362,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// Order summary component
const OrderSummary = ({ order, totalPrice, billingDetails })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summarySection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryIcon,
                        children: "🧾"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 381,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryTitle,
                                children: "Order Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 383,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            billingDetails.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summarySubtitle,
                                children: billingDetails.fullName
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 384,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 382,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 380,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItems,
                children: order?.items?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItemBody,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItemName,
                                        children: item.name ?? "Food Item"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItemQuantity,
                                        children: [
                                            "Qty: ",
                                            item.quantity ?? 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryItemPrice,
                                children: formatCurrency(item.price ?? 0)
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, `${item.foodId ?? `item-${index}`}`, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 387,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryFooter,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Total"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 399,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: formatCurrency(totalPrice)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 400,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 398,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            order?.deliveryAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryAddress,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].summaryAddressLabel,
                        children: "Delivery Address"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: order.deliveryAddress
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 379,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// Payment method selection component
const PaymentMethodSelection = ({ stripeEnabled, onSelect })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "💰"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 421,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Choose Payment Method"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 423,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentSubtitle,
                                children: "Select how you would like to pay for this order"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 424,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 422,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 420,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodOptions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodOption,
                        onClick: ()=>onSelect("cash"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodEmoji,
                                children: "💵"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 430,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodTitle,
                                children: "Cash on Delivery"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 431,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodDescription,
                                children: "Pay when your food arrives"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 432,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 429,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodOption,
                        onClick: ()=>onSelect("stripe"),
                        disabled: !stripeEnabled,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodEmoji,
                                children: "💳"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 440,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodTitle,
                                children: "Pay with Card"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 441,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodDescription,
                                children: stripeEnabled ? "Secure online payment via Stripe" : "Card payments unavailable"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 442,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 434,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 428,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            !stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].methodNotice,
                children: "Card payments are currently unavailable. Please choose cash on delivery."
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 449,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 419,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// Cash payment component (no Stripe hooks)
const CashPaymentSection = ({ order, totalPrice, onBack })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartContext"]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleCashPayment = async ()=>{
        if (!order) {
            setError("No order data available.");
            return;
        }
        setIsSubmitting(true);
        setError("");
        setSuccess("");
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const { payload, error: payloadError } = buildOrderSubmissionPayload(order, token);
        if (!payload) {
            setError(payloadError ?? "Unable to prepare your order. Please try again.");
            setIsSubmitting(false);
            return;
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${ORDER_SERVICE_BASE_URL}/api/orders`, payload, {
                headers: {
                    Authorization: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "",
                    "Content-Type": "application/json"
                }
            });
            // Clear cart from CartContext and localStorage
            clearCart();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            setSuccess("Order placed successfully with cash payment on delivery.");
            setTimeout(()=>{
                router.push("/customer/order-history");
            }, 2000);
        } catch (cashError) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isAxiosError(cashError)) {
                console.error("Failed to place cash order", {
                    status: cashError.response?.status,
                    data: cashError.response?.data,
                    message: cashError.message,
                    payload
                });
            } else {
                console.error("Failed to place cash order", cashError);
            }
            setError("Unable to place order. Please try again.");
        }
        setIsSubmitting(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cashSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "🧾"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Cash on Delivery"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentSubtitle,
                                children: "Confirm your order and pay when it arrives"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 542,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cashDescription,
                children: [
                    "A confirmation will be sent to your email. Please prepare exact change totaling",
                    " ",
                    formatCurrency(totalPrice),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 546,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cashActions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton,
                        onClick: onBack,
                        disabled: isSubmitting,
                        children: "Choose another method"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                        onClick: handleCashPayment,
                        disabled: isSubmitting,
                        children: isSubmitting ? "Placing order…" : "Confirm Cash Order"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 560,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                children: success
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 561,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 537,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// Stripe payment component (MUST be inside Elements provider)
const StripePaymentSection = ({ order, totalPrice, billingDetails, onBack })=>{
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStripe"])();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useElements"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartContext"]);
    const [clientSecret, setClientSecret] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardBrand, setCardBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPaymentDisabled, setPaymentDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasInitialised = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const amountInCents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Math.round(totalPrice * 100), [
        totalPrice
    ]);
    const paymentPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let resolvedCustomerId = "";
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (!resolvedCustomerId) {
            const baseCustomerId = typeof order?.customerId === "string" ? order.customerId.trim() : "";
            resolvedCustomerId = baseCustomerId;
        }
        if (!resolvedCustomerId) {
            resolvedCustomerId = billingDetails.fullName || "guest";
        }
        const payload = {
            orderId: order?.orderId || `ORDER-${Date.now()}`,
            userId: resolvedCustomerId,
            amount: amountInCents / 100,
            currency: "usd",
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            email: billingDetails.email,
            phone: billingDetails.phone ?? "+1234567890"
        };
        console.log("💳 Payment payload prepared:", {
            orderId: payload.orderId,
            orderHasOrderId: !!order?.orderId,
            orderObject: order
        });
        return payload;
    }, [
        amountInCents,
        billingDetails,
        order
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initialisePaymentIntent = async ()=>{
            if (!order || !order.items || order.items.length === 0) {
                return;
            }
            if (hasInitialised.current || clientSecret) {
                return;
            }
            hasInitialised.current = true;
            try {
                console.log("🚀 Calling payment API with payload:", paymentPayload);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${PAYMENT_SERVICE_BASE_URL}/api/payment/process`, paymentPayload);
                console.log("✅ Payment API response:", response.data);
                if (response.data?.paymentStatus === "Paid" || response.data?.disablePayment) {
                    setSuccess("This order has already been paid.");
                    setPaymentDisabled(true);
                    return;
                }
                if (response.data?.clientSecret) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    setError("Unable to initialise payment. Please try again later.");
                }
            } catch (intentError) {
                console.error("Failed to create payment intent", intentError);
                setError("Unable to initialise payment. Please try again later.");
            }
        };
        initialisePaymentIntent();
    }, [
        clientSecret,
        order,
        paymentPayload
    ]);
    const handleCardNumberChange = (event)=>{
        if (event.brand) {
            setCardBrand(event.brand);
        }
        setError(event.error?.message ?? "");
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError("");
        setSuccess("");
        if (!stripe || !elements || !clientSecret) {
            setError("Payment is not ready yet. Please wait a moment and try again.");
            return;
        }
        setIsSubmitting(true);
        try {
            const cardElement = elements.getElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardNumberElement"]);
            if (!cardElement) {
                setError("Unable to access card details. Please reload and try again.");
                setIsSubmitting(false);
                return;
            }
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: billingDetails.fullName,
                    email: billingDetails.email
                }
            });
            if (paymentMethodError) {
                setError(paymentMethodError.message ?? "Unable to process payment method.");
                setIsSubmitting(false);
                return;
            }
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod?.id
            });
            if (confirmError) {
                setError(confirmError.message ?? "Payment confirmation failed. Please try again.");
                setIsSubmitting(false);
                return;
            }
            if (paymentIntent?.status === "succeeded") {
                setSuccess("Payment successful! Your order has been placed.");
                setPaymentDisabled(true);
                // Order already created in CreateOrderFromCart, just clear cart
                clearCart();
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                setTimeout(()=>{
                    router.push("/customer/order-history");
                }, 2000);
            } else {
                setError("Payment did not complete. Please try again.");
            }
        } catch (submitError) {
            console.error("Unexpected checkout error", submitError);
            setError("An unexpected error occurred. Please try again.");
        }
        setIsSubmitting(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "💳"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 753,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Card Details"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 755,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentSubtitle,
                                children: "Secure payments powered by Stripe"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 756,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 752,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "card-number-element",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardLabel,
                                children: "Card number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardNumberElement"], {
                                        id: "card-number-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElement,
                                        options: {
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#1f2933",
                                                    "::placeholder": {
                                                        color: "#9aa5b1"
                                                    }
                                                },
                                                invalid: {
                                                    color: "#d64545"
                                                }
                                            },
                                            showIcon: true
                                        },
                                        onChange: handleCardNumberChange
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 766,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    cardBrand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardBrand,
                                        children: cardBrand
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 786,
                                        columnNumber: 27
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 765,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 761,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardDetailsGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "card-expiry-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardLabel,
                                        children: "Expiration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 792,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardExpiryElement"], {
                                            id: "card-expiry-element",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElement,
                                            options: {
                                                style: {
                                                    base: {
                                                        fontSize: "16px",
                                                        color: "#1f2933",
                                                        "::placeholder": {
                                                            color: "#9aa5b1"
                                                        }
                                                    },
                                                    invalid: {
                                                        color: "#d64545"
                                                    }
                                                }
                                            },
                                            onChange: (event)=>setError(event.error?.message ?? "")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                            lineNumber: 796,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 791,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "card-cvc-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardLabel,
                                        children: "CVC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 819,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardCvcElement"], {
                                            id: "card-cvc-element",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardElement,
                                            options: {
                                                style: {
                                                    base: {
                                                        fontSize: "16px",
                                                        color: "#1f2933",
                                                        "::placeholder": {
                                                            color: "#9aa5b1"
                                                        }
                                                    },
                                                    invalid: {
                                                        color: "#d64545"
                                                    }
                                                }
                                            },
                                            onChange: (event)=>setError(event.error?.message ?? "")
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                            lineNumber: 823,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 822,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 818,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 790,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                        disabled: isSubmitting || isPaymentDisabled || !stripe || !elements,
                        children: isSubmitting ? "Processing…" : `Pay ${formatCurrency(totalPrice)}`
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 846,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].secondaryButton,
                        onClick: onBack,
                        disabled: isSubmitting,
                        children: "Choose another method"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 854,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 858,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)),
                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                        children: success
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 859,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].supportBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Need help? Contact our support team at"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 863,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "mailto:support@fooddelivery.local",
                        children: "support@fooddelivery.local"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 864,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 862,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 751,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function CheckoutPage() {
    // Always wrap in Elements provider, but pass stripeEnabled flag
    // Elements provider can handle null stripe gracefully
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Elements"], {
        stripe: stripePromise,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutContent, {
            stripeEnabled: !!stripePromise
        }, void 0, false, {
            fileName: "[project]/src/app/pages/payment/Checkout.tsx",
            lineNumber: 875,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
        lineNumber: 874,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1115429e._.js.map