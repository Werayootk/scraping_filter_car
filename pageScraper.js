const fs = require("fs");
const path = require("path");
const client = require("https");

//save image file car example
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
}

const scraperObject = {
  url: "https://search.drivehub.co/?booking_begin=2022-01-16%2010%3A00&booking_end=2022-01-31%2010%3A00&dealers=&from=from_homepage&location_id=3&sort_by=price#openFilter",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForNavigation({
      waitUntil: "networkidle0",
    });
    await page.waitForSelector(".filter-category");

    const carsType = await page.$$eval(
      ".category-item.d-inline-flex.flex-row.flex-wrap > .category-button",
      (items) => {
        items = items.map((item) => {
          const car_type = { path: "", type: "", price: "" };
          car_type.path = item.querySelector("div img").src;
          car_type.type = item.querySelector("div p span").textContent;
            car_type.price = item.querySelector("div .text-center").textContent;
          return car_type;
        });
        return items;
      }
    );
      
                  const text = carsType[0].path;
                  const pattern = /car[_].*/gm;
                  const pathFileImg = text.match(pattern);
      console.log(pathFileImg);
      

    
    //save to json file
    fs.writeFile("cartype.json", JSON.stringify(carsType), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  },
};

module.exports = scraperObject;
