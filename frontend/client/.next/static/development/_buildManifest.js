self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/auth/:path*"
      },
      {
        "source": "/api/restaurant/:path*"
      },
      {
        "source": "/api/food-items/:path*"
      },
      {
        "source": "/api/orders/:path*"
      },
      {
        "source": "/api/payment/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()