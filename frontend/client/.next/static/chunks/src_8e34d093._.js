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
"[project]/src/app/pages/customer/CustomerOrderHistory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        return "Date not available";
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
const CustomerOrderHistory = ()=>{
    _s();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomerOrderHistory.useEffect": ()=>{
            const fetchCustomerOrders = {
                "CustomerOrderHistory.useEffect.fetchCustomerOrders": async ()=>{
                    try {
                        const token = localStorage.getItem("token");
                        if (!token) {
                            navigate("/auth/login");
                            return;
                        }
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(ORDER_SERVICE_BASE_URL, "/api/orders"), {
                            headers: {
                                Authorization: "Bearer ".concat(token)
                            }
                        });
                        const sortedOrders = [
                            ...response.data
                        ].sort({
                            "CustomerOrderHistory.useEffect.fetchCustomerOrders.sortedOrders": (a, b)=>{
                                var _a_createdAt;
                                const dateA = new Date((_a_createdAt = a.createdAt) !== null && _a_createdAt !== void 0 ? _a_createdAt : 0).getTime();
                                var _b_createdAt;
                                const dateB = new Date((_b_createdAt = b.createdAt) !== null && _b_createdAt !== void 0 ? _b_createdAt : 0).getTime();
                                return dateB - dateA;
                            }
                        }["CustomerOrderHistory.useEffect.fetchCustomerOrders.sortedOrders"]);
                        setOrders(sortedOrders);
                    } catch (fetchError) {
                        console.error("Error fetching orders:", fetchError);
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(fetchError)) {
                            var _fetchError_response_data, _fetchError_response;
                            var _fetchError_response_data_message;
                            setError((_fetchError_response_data_message = (_fetchError_response = fetchError.response) === null || _fetchError_response === void 0 ? void 0 : (_fetchError_response_data = _fetchError_response.data) === null || _fetchError_response_data === void 0 ? void 0 : _fetchError_response_data.message) !== null && _fetchError_response_data_message !== void 0 ? _fetchError_response_data_message : "Failed to load orders. Please try again.");
                        } else {
                            setError("Failed to load orders. Please try again.");
                        }
                    } finally{
                        setLoading(false);
                    }
                }
            }["CustomerOrderHistory.useEffect.fetchCustomerOrders"];
            fetchCustomerOrders();
        }
    }["CustomerOrderHistory.useEffect"], [
        navigate
    ]);
    const filteredOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomerOrderHistory.useMemo[filteredOrders]": ()=>{
            const query = searchQuery.trim().toLowerCase();
            if (!query) {
                return orders;
            }
            return orders.filter({
                "CustomerOrderHistory.useMemo[filteredOrders]": (order)=>{
                    var _order_restaurantId, _order_deliveryAddress, _order__id;
                    const restaurantMatch = (_order_restaurantId = order.restaurantId) === null || _order_restaurantId === void 0 ? void 0 : _order_restaurantId.toLowerCase().includes(query);
                    const addressMatch = (_order_deliveryAddress = order.deliveryAddress) === null || _order_deliveryAddress === void 0 ? void 0 : _order_deliveryAddress.toLowerCase().includes(query);
                    const orderIdMatch = (_order__id = order._id) === null || _order__id === void 0 ? void 0 : _order__id.toLowerCase().includes(query);
                    return restaurantMatch || addressMatch || orderIdMatch;
                }
            }["CustomerOrderHistory.useMemo[filteredOrders]"]);
        }
    }["CustomerOrderHistory.useMemo[filteredOrders]"], [
        orders,
        searchQuery
    ]);
    const totalSpent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomerOrderHistory.useMemo[totalSpent]": ()=>filteredOrders.reduce({
                "CustomerOrderHistory.useMemo[totalSpent]": (sum, order)=>sum + (Number(order.totalPrice) || 0)
            }["CustomerOrderHistory.useMemo[totalSpent]"], 0)
    }["CustomerOrderHistory.useMemo[totalSpent]"], [
        filteredOrders
    ]);
    const completedOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CustomerOrderHistory.useMemo[completedOrders]": ()=>filteredOrders.filter({
                "CustomerOrderHistory.useMemo[completedOrders]": (order)=>{
                    var _order_status;
                    return ((_order_status = order.status) === null || _order_status === void 0 ? void 0 : _order_status.toLowerCase()) === "delivered";
                }
            }["CustomerOrderHistory.useMemo[completedOrders]"]).length
    }["CustomerOrderHistory.useMemo[completedOrders]"], [
        filteredOrders
    ]);
    const handleBack = ()=>{
        navigate(-1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleBack,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                    "aria-label": "Go back",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowLeft"], {}, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Back"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleGroup,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "My Orders"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Track every order and revisit your favourite meals whenever you want."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryRow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryBadge,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: filteredOrders.length
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " orders"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryBadge,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: completedOrders
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " delivered"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryBadge,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: formatCurrency(totalSpent)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                " spent"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWrapper,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaSearch"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "search",
                                    value: searchQuery,
                                    onChange: (event)=>setSearchQuery(event.target.value),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInput,
                                    placeholder: "Search by restaurant, address, or order ID",
                                    "aria-label": "Search orders"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorBanner,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 211,
                    columnNumber: 19
                }, ("TURBOPACK compile-time value", void 0)),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
                    children: "Loading your orders..."
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 214,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : filteredOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                            children: "No orders found"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: searchQuery ? "Try a different search term." : "You have not placed any orders yet. Explore restaurants to get started."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                            to: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                children: "Explore Restaurants"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 216,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ordersList,
                    children: filteredOrders.map((order)=>{
                        var _order__id, _order_items, _order_items1;
                        var _order_status;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardMeta,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: [
                                                        "Order #",
                                                        (_order__id = order._id) === null || _order__id === void 0 ? void 0 : _order__id.slice(-8).toUpperCase()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: formatDate(order.createdAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 234,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusChip, " ").concat(resolveStatusClass(order.status)),
                                            children: (_order_status = order.status) !== null && _order_status !== void 0 ? _order_status : "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 240,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 233,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBody,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaLabel,
                                                    children: "Restaurant"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: order.restaurantId || "Not specified"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaLabel,
                                                    children: "Delivery address"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: order.deliveryAddress || "Not provided"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaLabel,
                                                    children: "Items"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: ((_order_items = order.items) === null || _order_items === void 0 ? void 0 : _order_items.length) ? "".concat(order.items.length, " item").concat(order.items.length > 1 ? "s" : "") : "No items recorded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 254,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 245,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                !!((_order_items1 = order.items) === null || _order_items1 === void 0 ? void 0 : _order_items1.length) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemsTable,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Item"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Quantity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                lineNumber: 269,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 268,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: order.items.map((item, index)=>{
                                                var _item_quantity;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: item.foodId || "Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: (_item_quantity = item.quantity) !== null && _item_quantity !== void 0 ? _item_quantity : 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: formatCurrency(item.price)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: formatCurrency(item.price * item.quantity)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, "".concat(order._id, "-item-").concat(index), true, {
                                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 276,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 267,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardFooter,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].total,
                                            children: [
                                                "Total ",
                                                formatCurrency(order.totalPrice)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 290,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                            to: "/customer/order-details/".concat(order._id),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$styles$2f$customerOrders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "View details"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                                lineNumber: 294,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                            lineNumber: 293,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                                    lineNumber: 289,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, order._id, true, {
                            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                            lineNumber: 232,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/pages/customer/CustomerOrderHistory.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomerOrderHistory, "lOwMF2OJoILerWzr8luOqJlNAx4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$react$2d$router$2d$bridge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"]
    ];
});
_c = CustomerOrderHistory;
const __TURBOPACK__default__export__ = CustomerOrderHistory;
var _c;
__turbopack_context__.k.register(_c, "CustomerOrderHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_8e34d093._.js.map