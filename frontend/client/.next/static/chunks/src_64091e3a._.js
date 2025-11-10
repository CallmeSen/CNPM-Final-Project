(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/app/styles/checkout.module.css [app-client] (css module)", ((__turbopack_context__) => {

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
"[project]/src/app/pages/payment/Checkout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/styles/checkout.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
var _process_env_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const publishableKey = (_process_env_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = ("TURBOPACK compile-time value", "pk_test_51S6DRtPb5k3ojf4pY5t8beaMLClnsc0CwnowMxbCJW6henbjlN8uju2CVextQkMuncqKToNSZO18YdKXuOMTwQYl00Z6BWamZc")) !== null && _process_env_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY !== void 0 ? _process_env_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : "";
const stripePromise = publishableKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStripe"])(publishableKey) : null;
var _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL;
const ORDER_SERVICE_BASE_URL = (_process_env_NEXT_PUBLIC_ORDER_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5005")) !== null && _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL : "http://localhost:5005";
var _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL;
const PAYMENT_SERVICE_BASE_URL = (_process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5004")) !== null && _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_PAYMENT_SERVICE_URL : "http://localhost:5004";
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
        var _parts_;
        let base64 = (_parts_ = parts[1]) !== null && _parts_ !== void 0 ? _parts_ : "";
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
    var _payload_id, _ref, _ref1, _ref2, _ref3;
    const candidate = (_ref3 = (_ref2 = (_ref1 = (_ref = (_payload_id = payload.id) !== null && _payload_id !== void 0 ? _payload_id : payload._id) !== null && _ref !== void 0 ? _ref : payload.sub) !== null && _ref1 !== void 0 ? _ref1 : payload.userId) !== null && _ref2 !== void 0 ? _ref2 : payload.user_id) !== null && _ref3 !== void 0 ? _ref3 : payload.userID;
    if (!candidate) {
        return "";
    }
    return String(candidate).trim();
};
const buildOrderSubmissionPayload = (order, token)=>{
    var _order_items;
    if (!order) {
        return {
            error: "No order data available."
        };
    }
    const decodedIdFromToken = decodeCustomerIdFromToken(token);
    let resolvedCustomerId = decodedIdFromToken;
    if (!resolvedCustomerId) {
        resolvedCustomerId = typeof (order === null || order === void 0 ? void 0 : order.customerId) === "string" ? order.customerId.trim() : "";
    }
    if (!resolvedCustomerId) {
        return {
            error: "We could not validate your account for this order. Please sign in again and retry."
        };
    }
    var _order_restaurantId;
    const restaurantId = String((_order_restaurantId = order.restaurantId) !== null && _order_restaurantId !== void 0 ? _order_restaurantId : "").trim();
    if (!restaurantId) {
        return {
            error: "We could not determine the restaurant for this order. Please return to your cart and try again."
        };
    }
    var _order_deliveryAddress;
    const deliveryAddress = String((_order_deliveryAddress = order.deliveryAddress) !== null && _order_deliveryAddress !== void 0 ? _order_deliveryAddress : "").trim();
    if (!deliveryAddress) {
        return {
            error: "Your delivery address is missing. Please update it in your cart and try again."
        };
    }
    var _order_items_reduce;
    const sanitizedItems = (_order_items_reduce = (_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.reduce((acc, item)=>{
        var _item_foodId;
        const foodId = String((_item_foodId = item.foodId) !== null && _item_foodId !== void 0 ? _item_foodId : "").trim();
        if (!foodId) {
            return acc;
        }
        var _item_quantity;
        const rawQuantity = Number((_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 0);
        const quantity = Number.isFinite(rawQuantity) ? Math.max(1, Math.floor(rawQuantity)) : 0;
        var _item_price;
        const rawPrice = Number((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : 0);
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
    }, [])) !== null && _order_items_reduce !== void 0 ? _order_items_reduce : [];
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
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const saved = localStorage.getItem("pendingOrder");
    if (!saved) {
        return null;
    }
    try {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch (error) {
        console.error("Failed to parse pendingOrder from storage", error);
        return null;
    }
};
_s(usePendingOrder, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
// Main checkout content component
const CheckoutContent = (param)=>{
    let { stripeEnabled } = param;
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const order = usePendingOrder();
    const [selectedMethod, setSelectedMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customerProfile, setCustomerProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Check authentication and redirect to login if not authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutContent.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const token = localStorage.getItem("token");
            if (!token) {
                // Save current path to return after login
                router.push("/auth/login?redirect=/checkout");
            }
        }
    }["CheckoutContent.useEffect"], [
        router
    ]);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutContent.useMemo[totalPrice]": ()=>{
            var _order_totalPrice;
            const amount = (_order_totalPrice = order === null || order === void 0 ? void 0 : order.totalPrice) !== null && _order_totalPrice !== void 0 ? _order_totalPrice : 0;
            return Number.isFinite(amount) ? amount : 0;
        }
    }["CheckoutContent.useMemo[totalPrice]"], [
        order
    ]);
    const billingDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutContent.useMemo[billingDetails]": ()=>{
            var _customerProfile_firstName;
            const firstName = (_customerProfile_firstName = customerProfile === null || customerProfile === void 0 ? void 0 : customerProfile.firstName) !== null && _customerProfile_firstName !== void 0 ? _customerProfile_firstName : "Customer";
            var _customerProfile_lastName;
            const lastName = (_customerProfile_lastName = customerProfile === null || customerProfile === void 0 ? void 0 : customerProfile.lastName) !== null && _customerProfile_lastName !== void 0 ? _customerProfile_lastName : "";
            var _customerProfile_email;
            const email = (_customerProfile_email = customerProfile === null || customerProfile === void 0 ? void 0 : customerProfile.email) !== null && _customerProfile_email !== void 0 ? _customerProfile_email : "customer@example.com";
            var _customerProfile_phone;
            const phone = (_customerProfile_phone = customerProfile === null || customerProfile === void 0 ? void 0 : customerProfile.phone) !== null && _customerProfile_phone !== void 0 ? _customerProfile_phone : "";
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
        }
    }["CheckoutContent.useMemo[billingDetails]"], [
        customerProfile
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutContent.useEffect": ()=>{
            const fetchCustomerProfile = {
                "CheckoutContent.useEffect.fetchCustomerProfile": async ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const token = localStorage.getItem("token");
                    if (!token) {
                        return;
                    }
                    try {
                        var _response_data_data, _response_data, _response_data1, _response_data2;
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAuthServiceUrl"])("/api/auth/customer/profile"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        });
                        var _response_data_data_customer, _ref, _ref1;
                        const profile = (_ref1 = (_ref = (_response_data_data_customer = (_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_data = _response_data.data) === null || _response_data_data === void 0 ? void 0 : _response_data_data.customer) !== null && _response_data_data_customer !== void 0 ? _response_data_data_customer : (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.data) !== null && _ref !== void 0 ? _ref : (_response_data2 = response.data) === null || _response_data2 === void 0 ? void 0 : _response_data2.customer) !== null && _ref1 !== void 0 ? _ref1 : {};
                        setCustomerProfile(profile);
                    } catch (profileError) {
                        console.error("Failed to fetch customer profile", profileError);
                    }
                }
            }["CheckoutContent.useEffect.fetchCustomerProfile"];
            fetchCustomerProfile();
        }
    }["CheckoutContent.useEffect"], []);
    const handleMethodSelect = (method)=>{
        setSelectedMethod(method);
    };
    if (!order || !order.items || order.items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCheckoutWrapper,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCheckoutCard,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCartIcon,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "120",
                            height: "120",
                            viewBox: "0 0 120 120",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "60",
                                    fill: "#F0F4F8"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCartTitle,
                        children: "Your Cart is Empty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCartDescription,
                        children: "Looks like you haven't added any items to your cart yet. Browse our delicious menu and find something you love!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCartActions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonIcon,
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/customer/order-history",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbs,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbLink,
                        children: "Home"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/customer/cart",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbLink,
                        children: "Cart"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breadcrumbCurrent,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderSummary, {
                        order: order,
                        totalPrice: totalPrice,
                        billingDetails: billingDetails
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentMethodSelection, {
                        stripeEnabled: stripeEnabled,
                        onSelect: handleMethodSelect
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 335,
                        columnNumber: 37
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "cash" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CashPaymentSection, {
                        order: order,
                        totalPrice: totalPrice,
                        onBack: ()=>setSelectedMethod(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "stripe" && stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StripePaymentSection, {
                        order: order,
                        totalPrice: totalPrice,
                        billingDetails: billingDetails,
                        onBack: ()=>setSelectedMethod(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 340,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedMethod === "stripe" && !stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodNotice,
                                children: "Card payments are unavailable right now. Please select cash on delivery."
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutFooter,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Secure checkout with flexible payment options."
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Need to make changes? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s1(CheckoutContent, "tHS0r8GnG7h9mBPizqvLpU2uvZk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        usePendingOrder
    ];
});
_c = CheckoutContent;
// Order summary component
const OrderSummary = (param)=>{
    let { order, totalPrice, billingDetails } = param;
    var _order_items;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summarySection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryIcon,
                        children: "🧾"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 381,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryTitle,
                                children: "Order Summary"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 383,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            billingDetails.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summarySubtitle,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItems,
                children: order === null || order === void 0 ? void 0 : (_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.map((item, index)=>{
                    var _item_name, _item_quantity, _item_price, _item_foodId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItemBody,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItemName,
                                        children: (_item_name = item.name) !== null && _item_name !== void 0 ? _item_name : "Food Item"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItemQuantity,
                                        children: [
                                            "Qty: ",
                                            (_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 1
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryItemPrice,
                                children: formatCurrency((_item_price = item.price) !== null && _item_price !== void 0 ? _item_price : 0)
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, "".concat((_item_foodId = item.foodId) !== null && _item_foodId !== void 0 ? _item_foodId : "item-".concat(index)), true, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 387,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryFooter,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Total"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 399,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
            (order === null || order === void 0 ? void 0 : order.deliveryAddress) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryAddress,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryAddressLabel,
                        children: "Delivery Address"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
};
_c1 = OrderSummary;
// Payment method selection component
const PaymentMethodSelection = (param)=>{
    let { stripeEnabled, onSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "💰"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 421,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Choose Payment Method"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 423,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSubtitle,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodOptions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodOption,
                        onClick: ()=>onSelect("cash"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodEmoji,
                                children: "💵"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 430,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodTitle,
                                children: "Cash on Delivery"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 431,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodDescription,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodOption,
                        onClick: ()=>onSelect("stripe"),
                        disabled: !stripeEnabled,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodEmoji,
                                children: "💳"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 440,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodTitle,
                                children: "Pay with Card"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 441,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodDescription,
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
            !stripeEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodNotice,
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
};
_c2 = PaymentMethodSelection;
// Cash payment component (no Stripe hooks)
const CashPaymentSection = (param)=>{
    let { order, totalPrice, onBack } = param;
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartContext"]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleCashPayment = async ()=>{
        if (!order) {
            setError("No order data available.");
            return;
        }
        setIsSubmitting(true);
        setError("");
        setSuccess("");
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable";
        const { payload, error: payloadError } = buildOrderSubmissionPayload(order, token);
        if (!payload) {
            setError(payloadError !== null && payloadError !== void 0 ? payloadError : "Unable to prepare your order. Please try again.");
            setIsSubmitting(false);
            return;
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(ORDER_SERVICE_BASE_URL, "/api/orders"), payload, {
                headers: {
                    Authorization: token ? "Bearer ".concat(token) : "",
                    "Content-Type": "application/json"
                }
            });
            // Clear cart from CartContext and localStorage
            clearCart();
            if ("TURBOPACK compile-time truthy", 1) {
                [
                    "pendingOrder",
                    "cart",
                    "cart_guest"
                ].forEach((key)=>{
                    try {
                        localStorage.removeItem(key);
                    } catch (e) {
                        console.error("Failed to remove ".concat(key), e);
                    }
                });
            }
            setSuccess("Order placed successfully with cash payment on delivery.");
            setTimeout(()=>{
                router.push("/customer/order-history");
            }, 2000);
        } catch (cashError) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(cashError)) {
                var _cashError_response, _cashError_response1;
                console.error("Failed to place cash order", {
                    status: (_cashError_response = cashError.response) === null || _cashError_response === void 0 ? void 0 : _cashError_response.status,
                    data: (_cashError_response1 = cashError.response) === null || _cashError_response1 === void 0 ? void 0 : _cashError_response1.data,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cashSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "🧾"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Cash on Delivery"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSubtitle,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cashDescription,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cashActions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                        onClick: onBack,
                        disabled: isSubmitting,
                        children: "Choose another method"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton,
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
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                lineNumber: 560,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successMessage,
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
_s2(CashPaymentSection, "BGCSHuXxoGTAIVENlZWT9lGeaHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = CashPaymentSection;
// Stripe payment component (MUST be inside Elements provider)
const StripePaymentSection = (param)=>{
    let { order, totalPrice, billingDetails, onBack } = param;
    _s3();
    const stripe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"])();
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartContext"]);
    const [clientSecret, setClientSecret] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cardBrand, setCardBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPaymentDisabled, setPaymentDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasInitialised = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const amountInCents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StripePaymentSection.useMemo[amountInCents]": ()=>Math.round(totalPrice * 100)
    }["StripePaymentSection.useMemo[amountInCents]"], [
        totalPrice
    ]);
    const paymentPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StripePaymentSection.useMemo[paymentPayload]": ()=>{
            let resolvedCustomerId = "";
            if ("TURBOPACK compile-time truthy", 1) {
                const storedToken = localStorage.getItem("token");
                resolvedCustomerId = decodeCustomerIdFromToken(storedToken);
            }
            if (!resolvedCustomerId) {
                const baseCustomerId = typeof (order === null || order === void 0 ? void 0 : order.customerId) === "string" ? order.customerId.trim() : "";
                resolvedCustomerId = baseCustomerId;
            }
            if (!resolvedCustomerId) {
                resolvedCustomerId = billingDetails.fullName || "guest";
            }
            var _billingDetails_phone;
            const payload = {
                orderId: (order === null || order === void 0 ? void 0 : order.orderId) || "ORDER-".concat(Date.now()),
                userId: resolvedCustomerId,
                amount: amountInCents / 100,
                currency: "usd",
                firstName: billingDetails.firstName,
                lastName: billingDetails.lastName,
                email: billingDetails.email,
                phone: (_billingDetails_phone = billingDetails.phone) !== null && _billingDetails_phone !== void 0 ? _billingDetails_phone : "+1234567890"
            };
            console.log("💳 Payment payload prepared:", {
                orderId: payload.orderId,
                orderHasOrderId: !!(order === null || order === void 0 ? void 0 : order.orderId),
                orderObject: order
            });
            return payload;
        }
    }["StripePaymentSection.useMemo[paymentPayload]"], [
        amountInCents,
        billingDetails,
        order
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StripePaymentSection.useEffect": ()=>{
            const initialisePaymentIntent = {
                "StripePaymentSection.useEffect.initialisePaymentIntent": async ()=>{
                    if (!order || !order.items || order.items.length === 0) {
                        return;
                    }
                    if (hasInitialised.current || clientSecret) {
                        return;
                    }
                    hasInitialised.current = true;
                    try {
                        var _response_data, _response_data1, _response_data2;
                        console.log("🚀 Calling payment API with payload:", paymentPayload);
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(PAYMENT_SERVICE_BASE_URL, "/api/payment/process"), paymentPayload);
                        console.log("✅ Payment API response:", response.data);
                        if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.paymentStatus) === "Paid" || ((_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.disablePayment)) {
                            setSuccess("This order has already been paid.");
                            setPaymentDisabled(true);
                            return;
                        }
                        if ((_response_data2 = response.data) === null || _response_data2 === void 0 ? void 0 : _response_data2.clientSecret) {
                            setClientSecret(response.data.clientSecret);
                        } else {
                            setError("Unable to initialise payment. Please try again later.");
                        }
                    } catch (intentError) {
                        console.error("Failed to create payment intent", intentError);
                        setError("Unable to initialise payment. Please try again later.");
                    }
                }
            }["StripePaymentSection.useEffect.initialisePaymentIntent"];
            initialisePaymentIntent();
        }
    }["StripePaymentSection.useEffect"], [
        clientSecret,
        order,
        paymentPayload
    ]);
    const handleCardNumberChange = (event)=>{
        var _event_error;
        if (event.brand) {
            setCardBrand(event.brand);
        }
        var _event_error_message;
        setError((_event_error_message = (_event_error = event.error) === null || _event_error === void 0 ? void 0 : _event_error.message) !== null && _event_error_message !== void 0 ? _event_error_message : "");
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
            const cardElement = elements.getElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardNumberElement"]);
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
                var _paymentMethodError_message;
                setError((_paymentMethodError_message = paymentMethodError.message) !== null && _paymentMethodError_message !== void 0 ? _paymentMethodError_message : "Unable to process payment method.");
                setIsSubmitting(false);
                return;
            }
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.id
            });
            if (confirmError) {
                var _confirmError_message;
                setError((_confirmError_message = confirmError.message) !== null && _confirmError_message !== void 0 ? _confirmError_message : "Payment confirmation failed. Please try again.");
                setIsSubmitting(false);
                return;
            }
            if ((paymentIntent === null || paymentIntent === void 0 ? void 0 : paymentIntent.status) === "succeeded") {
                setSuccess("Payment successful! Your order has been placed.");
                setPaymentDisabled(true);
                // Order already created in CreateOrderFromCart, just clear cart
                clearCart();
                if ("TURBOPACK compile-time truthy", 1) {
                    [
                        "pendingOrder",
                        "cart",
                        "cart_guest"
                    ].forEach((key)=>{
                        try {
                            localStorage.removeItem(key);
                        } catch (e) {
                            console.error("Failed to remove ".concat(key), e);
                        }
                    });
                }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentIcon,
                        children: "💳"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 753,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentTitle,
                                children: "Card Details"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 755,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSubtitle,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "card-number-element",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardLabel,
                                children: "Card number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardNumberElement"], {
                                        id: "card-number-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElement,
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
                                    cardBrand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBrand,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDetailsGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "card-expiry-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardLabel,
                                        children: "Expiration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 792,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardExpiryElement"], {
                                            id: "card-expiry-element",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElement,
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
                                            onChange: (event)=>{
                                                var _event_error;
                                                var _event_error_message;
                                                return setError((_event_error_message = (_event_error = event.error) === null || _event_error === void 0 ? void 0 : _event_error.message) !== null && _event_error_message !== void 0 ? _event_error_message : "");
                                            }
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardFieldWrapper,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "card-cvc-element",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardLabel,
                                        children: "CVC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                                        lineNumber: 819,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElementContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardCvcElement"], {
                                            id: "card-cvc-element",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardElement,
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
                                            onChange: (event)=>{
                                                var _event_error;
                                                var _event_error_message;
                                                return setError((_event_error_message = (_event_error = event.error) === null || _event_error === void 0 ? void 0 : _event_error.message) !== null && _event_error_message !== void 0 ? _event_error_message : "");
                                            }
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton,
                        disabled: isSubmitting || isPaymentDisabled || !stripe || !elements,
                        children: isSubmitting ? "Processing…" : "Pay ".concat(formatCurrency(totalPrice))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 846,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                        onClick: onBack,
                        disabled: isSubmitting,
                        children: "Choose another method"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 854,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 858,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)),
                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successMessage,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].supportBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Need help? Contact our support team at"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/payment/Checkout.tsx",
                        lineNumber: 863,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
_s3(StripePaymentSection, "P2RY/K990322TfnywytHWa2tiQc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStripe"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElements"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c4 = StripePaymentSection;
function CheckoutPage() {
    // Always wrap in Elements provider, but pass stripeEnabled flag
    // Elements provider can handle null stripe gracefully
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stripe$2f$react$2d$stripe$2d$js$2f$dist$2f$react$2d$stripe$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Elements"], {
        stripe: stripePromise,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutContent, {
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
_c5 = CheckoutPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "CheckoutContent");
__turbopack_context__.k.register(_c1, "OrderSummary");
__turbopack_context__.k.register(_c2, "PaymentMethodSelection");
__turbopack_context__.k.register(_c3, "CashPaymentSection");
__turbopack_context__.k.register(_c4, "StripePaymentSection");
__turbopack_context__.k.register(_c5, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_64091e3a._.js.map