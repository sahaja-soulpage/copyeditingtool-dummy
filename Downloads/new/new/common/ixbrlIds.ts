const cheerio = require("cheerio");

export function containsId(htmlContent: any, targetId: any) {
  const $ = cheerio.load(htmlContent);
  const element = $(`[id*=${targetId}]`);
  return element.length > 0;
}

export function splitPages(htmlContent: any, targetId: any) {
  const $ = cheerio.load(htmlContent);
  let pages = 1;
  $(`[id*=${targetId}]`).each(() => (pages += 1));

  return pages;
}
