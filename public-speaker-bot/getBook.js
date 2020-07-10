const axios = require("axios");
const cheerio = require("cheerio");

async function getBestSellerHTML() {
  try {
    return await axios.get("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%85%80%EB%9F%AC");
  } catch (error) {
    console.error(error);
  }
}

async function getNewBooksHTML() {
  try {
    return await axios.get("http://www.kyobobook.co.kr/newproduct/newProductList.laf?mallGb=KOR");
  } catch (error) {
    console.error(error);
  }
}

getBestSellerHTML().then(html => {
  let liList = [];
  const $ = cheerio.load(html.data);
  const bodyList = $("div.cs_bestseller").children("ol.thumb_list").children("li");

  bodyList.each(function (i, elem) {
    liList[i] = {
      title: $(this).find('dt').text()
    };
  });
  return liList;
}).then(res => module.exports.bestSeller = res)

getNewBooksHTML().then(html => {
  let liList = [];
  const $ = cheerio.load(html.data);
  const bodyList = $("div.detail").children('div.title');

  bodyList.each(function (i, elem) {
    liList[i] = {
      title: $(this).find('a').text()
    };
  });
  return liList;
}).then(res => module.exports.newBooks = res)