

const scraperObject = {
    url: 'https://search.drivehub.co/?booking_begin=2022-01-16%2010%3A00&booking_end=2022-01-31%2010%3A00&dealers=&from=from_homepage&location_id=3&sort_by=price#openFilter',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url); 
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
           });
        await page.waitForSelector('.filter-category');
         
        let carsType = await page.$$eval('.category-item.d-inline-flex.flex-row.flex-wrap > .category-button', items => {
            items = items.map(item => {
                const car_type = { path: '', type: '', price: '' };
                car_type.path = item.querySelector('div img').src;
                car_type.type = item.querySelector('div p span').textContent;
                car_type.price = item.querySelector('div .text-center').textContent;
                return car_type;
            });
            return items;
        });
        
        console.log(carsType);
        //save to json file
        

        //save image file car example
    }
}

module.exports = scraperObject;