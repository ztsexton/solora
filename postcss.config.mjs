// During tests we don't need PostCSS processing. Export an empty plugins list
// to avoid Vite trying to load PostCSS plugins (which can fail in the test env).
const config = {
  plugins: [],
};

export default config;
