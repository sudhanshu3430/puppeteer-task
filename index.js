const puppeteer = require('puppeteer');

(async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Replace with the URL of the Amazon product you want to scrape
    const url = 'https://www.amazon.in/Samsung-Galaxy-Pro-Bluetooth-Cancellation/dp/B0B8YMQRFV?pd_rd_w=JRim3&content-id=amzn1.sym.77466f17-e19f-4516-9f91-36fc47d6c25b&pf_rd_p=77466f17-e19f-4516-9f91-36fc47d6c25b&pf_rd_r=W93SJQGBDGYN2168P3MW&pd_rd_wg=V89Lc&pd_rd_r=400b275e-ffcc-4fef-b899-7784f50d8245&pd_rd_i=B0B8YMQRFV&ref_=pd_hp_d_btf_unk_B0B8YMQRFV&th=1'; // Example product URL
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract product title
        const productTitle = await page.$eval('#productTitle', el => el.innerText.trim());

        // Extract product price
        const productPrice = await page.$eval('.a-price .a-offscreen', el => el.innerText.trim());
        
        // Extract product description
        const productDesc = await page.$$eval('.a-list-item', items => {
            return items.map(item => item.innerText.trim()).filter(text => text); // Extract inner text and filter out empty entries
        });

        // Log the results
        console.log(`Title: ${productTitle}`);
        console.log(`Price: ${productPrice}`);
        console.log(`Description:`, productDesc);
        
    } catch (error) {
        console.error('Error occurred while scraping:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
