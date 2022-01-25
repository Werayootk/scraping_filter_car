const fs = require("fs");
const path = require("path");
const client = require("https");
const axios = require('axios');

//save image file car example
const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );

const scraperObject = {
  url: "https://search.drivehub.co/?booking_begin=2022-01-28%2010%3A00&booking_end=2022-01-31%2010%3A00&from=from_homepage&location_id=3&sort_by=price",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForNavigation({
      waitUntil: "networkidle0",
    });
    await page.waitForSelector(".filter-category");

    // const carsType = await page.$$eval(
    //   ".category-item.d-inline-flex.flex-row.flex-wrap > .category-button",
    //   (items) => {
    //     items = items.map((item) => {
    //       const car_type = { path: "", type: "", price: "" };
    //       car_type.path = item.querySelector("div img").src;
    //       car_type.type = item.querySelector("div p span").textContent;
    //         car_type.price = item.querySelector("div .text-center").textContent;
    //       return car_type;
    //     });
    //     return items;
    //   }
    // );

    const datafromcar = [
      {
        "path": "https://search.drivehub.co/static/media/car_filter_2.fe8434c6.png",
        "type": "อีโคคาร์",
        "price": "อีโคคาร์เริ่มต้น ฿820"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_1.0757bb8b.png",
        "type": "รถขนาดเล็ก",
        "price": "รถขนาดเล็กเริ่มต้น ฿1,050"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_6.4493fcb3.png",
        "type": "รถขนาดกลาง",
        "price": "รถขนาดกลางเริ่มต้น ฿1,200"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_3.1de3f0c3.png",
        "type": "รถขนาดใหญ่",
        "price": "รถขนาดใหญ่เริ่มต้น ฿2,460"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_5.75ff35d3.png",
        "type": "เอสยูวี",
        "price": "เอสยูวีเริ่มต้น ฿1,500"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_8.813f1404.png",
        "type": "ไฮบริด",
        "price": "ไฮบริดเริ่มต้น ฿2,050"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_7.9aa5a821.png",
        "type": "รถตู้",
        "price": "รถตู้เริ่มต้น ฿2,900"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_4.e0b8fd27.png",
        "type": "รถกระบะ",
        "price": "รถกระบะเริ่มต้น ฿1,690"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_10.e84e2343.png",
        "type": "รถพร้อมคนขับ",
        "price": "รถพร้อมคนขับเริ่มต้น ฿1,800"
      },
      {
        "path": "https://search.drivehub.co/static/media/car_filter_9.e6c59064.png",
        "type": "Luxury",
        "price": "Luxuryเริ่มต้น ฿3,490"
      }
    ]
    
    //save img
    for (let i = 0; i < datafromcar.length; i++) {      
      const text = datafromcar[i].path;
      console.log(text);
      const pattern = /car[_].*/gm;
      const nameFileImg = text.match(pattern)[0];
      console.log(nameFileImg);
      await download_image(text, nameFileImg);
    }
    
    //save to json file
    // fs.writeFile("cartype.json", JSON.stringify(carsType), (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log("Successfully written data to file");
    // });
  },
};

module.exports = scraperObject;
