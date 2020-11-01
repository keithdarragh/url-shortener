const isValidUrl = (url: string): boolean => {
  const r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

  return r.test(url);
};

export {
  isValidUrl,
};
