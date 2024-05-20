import { GiphyFetch } from "@giphy/js-fetch-api";

const APIKEY = 'oIo1yLibaS9q8Ycqziox4xbzp6AclUaX';
export async function loadContent(type, search, limit) {
  const gf = new GiphyFetch(APIKEY);
  let data;

  if (search === '') {
    ({ data } = await gf.trending({ type, limit }));
  } else {
    ({ data } = await gf.search(search, { type, limit }));
  }

  return data;
}
