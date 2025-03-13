module.exports = {
  pwa: {
    name: "Moodboard Builder",
    themeColor: "#F95D00",
    msTileColor: "#0b0a0a",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://images.unsplash.com/"),
          handler: "CacheFirst",
          options: {
            cacheName: "unsplash-images",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
        {
          urlPattern: new RegExp("^https://plus.unsplash.com/"),
          handler: "CacheFirst",
          options: {
            cacheName: "unsplash-plus-images",
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
        {
          urlPattern: new RegExp("^https://cdnjs.cloudflare.com/"),
          handler: "CacheFirst",
          options: {
            cacheName: "cdn-libraries",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
      ],
    },
  },
};
