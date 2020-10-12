export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export const to12Hr = (hr24) => {
  if(!hr24) return hr24;
  const ts = hr24;
  const H = +ts.substr(0, 2);
  let h = (H % 12) || 12;
  h = (h < 10) ? (`0${h}`) : h;
  const ampm = H < 12 ? ' AM' : ' PM';
  return h + ts.substr(2, 3) + ampm;
};
