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
"[project]/src/app/styles/customerOrders.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionsRow": "customerOrders-module__qrRL2a__actionsRow",
  "backButton": "customerOrders-module__qrRL2a__backButton",
  "cardBody": "customerOrders-module__qrRL2a__cardBody",
  "cardFooter": "customerOrders-module__qrRL2a__cardFooter",
  "cardHeader": "customerOrders-module__qrRL2a__cardHeader",
  "cardMeta": "customerOrders-module__qrRL2a__cardMeta",
  "cardTitle": "customerOrders-module__qrRL2a__cardTitle",
  "content": "customerOrders-module__qrRL2a__content",
  "detailHeader": "customerOrders-module__qrRL2a__detailHeader",
  "detailId": "customerOrders-module__qrRL2a__detailId",
  "detailTitleBlock": "customerOrders-module__qrRL2a__detailTitleBlock",
  "emptyState": "customerOrders-module__qrRL2a__emptyState",
  "emptyTitle": "customerOrders-module__qrRL2a__emptyTitle",
  "errorBanner": "customerOrders-module__qrRL2a__errorBanner",
  "infoCard": "customerOrders-module__qrRL2a__infoCard",
  "infoGrid": "customerOrders-module__qrRL2a__infoGrid",
  "infoLabel": "customerOrders-module__qrRL2a__infoLabel",
  "infoValue": "customerOrders-module__qrRL2a__infoValue",
  "itemsTable": "customerOrders-module__qrRL2a__itemsTable",
  "loading": "customerOrders-module__qrRL2a__loading",
  "metaBlock": "customerOrders-module__qrRL2a__metaBlock",
  "metaLabel": "customerOrders-module__qrRL2a__metaLabel",
  "muted": "customerOrders-module__qrRL2a__muted",
  "orderCard": "customerOrders-module__qrRL2a__orderCard",
  "ordersList": "customerOrders-module__qrRL2a__ordersList",
  "page": "customerOrders-module__qrRL2a__page",
  "pillGroup": "customerOrders-module__qrRL2a__pillGroup",
  "priceEmphasis": "customerOrders-module__qrRL2a__priceEmphasis",
  "primaryButton": "customerOrders-module__qrRL2a__primaryButton",
  "searchIcon": "customerOrders-module__qrRL2a__searchIcon",
  "searchInput": "customerOrders-module__qrRL2a__searchInput",
  "searchWrapper": "customerOrders-module__qrRL2a__searchWrapper",
  "section": "customerOrders-module__qrRL2a__section",
  "sectionFooter": "customerOrders-module__qrRL2a__sectionFooter",
  "sectionTitle": "customerOrders-module__qrRL2a__sectionTitle",
  "statusCanceled": "customerOrders-module__qrRL2a__statusCanceled",
  "statusChip": "customerOrders-module__qrRL2a__statusChip",
  "statusConfirmed": "customerOrders-module__qrRL2a__statusConfirmed",
  "statusDefault": "customerOrders-module__qrRL2a__statusDefault",
  "statusDelivered": "customerOrders-module__qrRL2a__statusDelivered",
  "statusOutForDelivery": "customerOrders-module__qrRL2a__statusOutForDelivery",
  "statusPending": "customerOrders-module__qrRL2a__statusPending",
  "statusPreparing": "customerOrders-module__qrRL2a__statusPreparing",
  "subtitle": "customerOrders-module__qrRL2a__subtitle",
  "summaryBadge": "customerOrders-module__qrRL2a__summaryBadge",
  "summaryRow": "customerOrders-module__qrRL2a__summaryRow",
  "title": "customerOrders-module__qrRL2a__title",
  "titleGroup": "customerOrders-module__qrRL2a__titleGroup",
  "total": "customerOrders-module__qrRL2a__total",
  "twoColumn": "customerOrders-module__qrRL2a__twoColumn",
});
}),
"[project]/src/app/pages/customer/CustomerOrderDetails.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/react-router-bridge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/styles/customerOrders.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
var _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL;
const ORDER_SERVICE_BASE_URL = (_process_env_NEXT_PUBLIC_ORDER_SERVICE_URL = ("TURBOPACK compile-time value", "http://localhost:5005")) !== null && _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL !== void 0 ? _process_env_NEXT_PUBLIC_ORDER_SERVICE_URL : "http://localhost:5005";
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
const formatCurrency = (value)=>{
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return currencyFormatter.format(0);
    }
    return currencyFormatter.format(Number(value));
};
const formatDate = (value)=>{
    if (!value) {
        return "Not available";
    }
    try {
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(value));
    } catch (error) {
        console.error("Failed to format date", error);
        return value;
    }
};
const statusClassMap = {
    pending: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPending,
    confirmed: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusConfirmed,
    preparing: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPreparing,
    "out for delivery": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusOutForDelivery,
    delivered: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDelivered,
    canceled: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusCanceled
};
const resolveStatusClass = (status)=>{
    if (!status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDefault;
    }
    const key = status.toLowerCase();
    var _statusClassMap_key;
    return (_statusClassMap_key = statusClassMap[key]) !== null && _statusClassMap_key !== void 0 ? _statusClassMap_key : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDefault;
};
const paymentStatusClassMap = {
    paid: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDelivered,
    pending: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusPending,
    failed: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusCanceled,
    refunded: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusConfirmed
};
const resolvePaymentClass = (status)=>{
    if (!status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDefault;
    }
    const key = status.toLowerCase();
    var _paymentStatusClassMap_key;
    return (_paymentStatusClassMap_key = paymentStatusClassMap[key]) !== null && _paymentStatusClassMap_key !== void 0 ? _paymentStatusClassMap_key : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusDefault;
};
const CustomerOrderDetails = ()=>{
    var _order_items, _order_items1;
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerOrderDetails.useEffect": ()=>{
            const fetchOrder = {
                "CustomerOrderDetails.useEffect.fetchOrder": async ()=>{
                    if (!id) {
                        setError("We could not find that order. Please try again.");
                        setLoading(false);
                        return;
                    }
                    try {
                        const token = localStorage.getItem("token");
                        if (!token) {
                            navigate("/auth/login");
                            return;
                        }
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(ORDER_SERVICE_BASE_URL, "/api/orders/").concat(id), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        });
                        setOrder(response.data);
                    } catch (fetchError) {
                        console.error("Failed to load order", fetchError);
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(fetchError)) {
                            var _fetchError_response_data, _fetchError_response;
                            var _fetchError_response_data_message;
                            setError((_fetchError_response_data_message = (_fetchError_response = fetchError.response) === null || _fetchError_response === void 0 ? void 0 : (_fetchError_response_data = _fetchError_response.data) === null || _fetchError_response_data === void 0 ? void 0 : _fetchError_response_data.message) !== null && _fetchError_response_data_message !== void 0 ? _fetchError_response_data_message : "We could not load this order. Please try again later.");
                        } else {
                            setError("Something went wrong while loading the order. Please try again.");
                        }
                    } finally{
                        setLoading(false);
                    }
                }
            }["CustomerOrderDetails.useEffect.fetchOrder"];
            fetchOrder();
        }
    }["CustomerOrderDetails.useEffect"], [
        id,
        navigate
    ]);
    const itemsTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomerOrderDetails.useMemo[itemsTotal]": ()=>{
            var _order_items;
            if (!(order === null || order === void 0 ? void 0 : (_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.length)) {
                return 0;
            }
            return order.items.reduce({
                "CustomerOrderDetails.useMemo[itemsTotal]": (sum, item)=>{
                    var _item_quantity;
                    return sum + (Number(item.price) || 0) * ((_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 0);
                }
            }["CustomerOrderDetails.useMemo[itemsTotal]"], 0);
        }
    }["CustomerOrderDetails.useMemo[itemsTotal]"], [
        order
    ]);
    const itemCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomerOrderDetails.useMemo[itemCount]": ()=>{
            var _order_items;
            var _order_items_reduce;
            return (_order_items_reduce = order === null || order === void 0 ? void 0 : (_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.reduce({
                "CustomerOrderDetails.useMemo[itemCount]": (count, item)=>{
                    var _item_quantity;
                    return count + ((_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 0);
                }
            }["CustomerOrderDetails.useMemo[itemCount]"], 0)) !== null && _order_items_reduce !== void 0 ? _order_items_reduce : 0;
        }
    }["CustomerOrderDetails.useMemo[itemCount]"], [
        order
    ]);
    const handleBack = ()=>{
        navigate(-1);
    };
    const handleGoHome = ()=>{
        navigate("/");
    };
    var _order__id, _ref;
    const displayId = (_ref = (_order__id = order === null || order === void 0 ? void 0 : order._id) !== null && _order__id !== void 0 ? _order__id : id) !== null && _ref !== void 0 ? _ref : "";
    var _order_status, _order_updatedAt, _order_paymentStatus, _order_paymentMethod, _order_paymentIntentId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailHeader,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleBack,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                            "aria-label": "Back to previous page",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowLeft"], {}, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailTitleBlock,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                    children: "Order Details"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailId,
                                    children: [
                                        "Order #",
                                        displayId.slice(-8).toUpperCase()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusChip, " ").concat(resolveStatusClass(order === null || order === void 0 ? void 0 : order.status)),
                                            children: (_order_status = order === null || order === void 0 ? void 0 : order.status) !== null && _order_status !== void 0 ? _order_status : "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        (order === null || order === void 0 ? void 0 : order.paymentStatus) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusChip, " ").concat(resolvePaymentClass(order.paymentStatus)),
                                            children: order.paymentStatus
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionsRow,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleGoHome,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaHome"], {}, void 0, false, {
                                        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Back to home"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
                    children: "Loading order details..."
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                    lineNumber: 224,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 228,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionsRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleBack,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                    children: "Try again"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleGoHome,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                                    children: "Back home"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                    lineNumber: 226,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : !order ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                            children: "Order not found"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "We could not find details for this order. It may have been removed or you might not have access to it."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleBack,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                            children: "View order history"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 253,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Order placed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 265,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: formatDate(order.createdAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Last updated"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: formatDate((_order_updatedAt = order.updatedAt) !== null && _order_updatedAt !== void 0 ? _order_updatedAt : order.createdAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Restaurant"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: order.restaurantId || "Not specified"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoLabel,
                                            children: "Delivery address"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoValue,
                                            children: order.deliveryAddress || "Not provided"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                            children: "Order items"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                            children: ((_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.length) ? "".concat(order.items.length, " unique item").concat(order.items.length > 1 ? "s" : "", " - ").concat(itemCount, " total") : "No items recorded for this order."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                ((_order_items1 = order.items) === null || _order_items1 === void 0 ? void 0 : _order_items1.length) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemsTable,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Item"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Quantity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                lineNumber: 305,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: order.items.map((item, index)=>{
                                                var _item_quantity;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: item.foodId || "Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: (_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: formatCurrency(item.price)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: formatCurrency(item.price * item.quantity)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, "".concat(order._id, "-item-").concat(index), true, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 312,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 303,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFooter,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                            children: "Item total"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 326,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceEmphasis,
                                            children: formatCurrency(itemsTotal)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                            children: "Delivery & payment"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                            children: "Keep an eye on this space for live delivery updates."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 336,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].twoColumn,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Delivery address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: order.deliveryAddress || "Not provided"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 342,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Payment status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (_order_paymentStatus = order.paymentStatus) !== null && _order_paymentStatus !== void 0 ? _order_paymentStatus : "Pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 346,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Payment method"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (_order_paymentMethod = order.paymentMethod) !== null && _order_paymentMethod !== void 0 ? _order_paymentMethod : "Not specified"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaBlock,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Payment reference"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (_order_paymentIntentId = order.paymentIntentId) !== null && _order_paymentIntentId !== void 0 ? _order_paymentIntentId : "Not provided"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                            children: "Total due"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                            children: "The amount charged includes all taxes and delivery fees (if applicable)."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 364,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 362,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFooter,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].muted,
                                            children: "Grand total"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 370,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].priceEmphasis,
                                            children: formatCurrency(order.totalPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                            lineNumber: 371,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/pages/customer/CustomerOrderDetails.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomerOrderDetails, "YETC3K2a1Z2LsNVxQmQC0SIVAK0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"]
    ];
});
_c = CustomerOrderDetails;
const __TURBOPACK__default__export__ = CustomerOrderDetails;
var _c;
__turbopack_context__.k.register(_c, "CustomerOrderDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6dd4849f._.js.map