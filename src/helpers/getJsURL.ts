const getJsURL = (): string => {
  return process.env.NODE_ENV === "production"
    ? `/dist/main.js`
    : `http://localhost:${process.env.CLIENT_DEV_PORT}/main.js`;
};

export default getJsURL;
