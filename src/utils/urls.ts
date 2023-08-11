export const getPublicUrl = (path: string) => {
  if (path.startsWith("https")) {
    return path;
  }
  if (Array.from(path)[0] !== '/') {
    return process.env.PUBLIC_URL + '/' + path;
  }
  return process.env.PUBLIC_URL + path;
}
