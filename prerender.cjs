const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
const port = 3005;

const server = app.listen(port, async () => {
  console.log(`Prerender server running on port ${port}...`);
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Intercept network requests to prevent loading external resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (resourceType === 'image' || resourceType === 'font' || resourceType === 'media') {
        req.abort();
      } else {
        req.continue();
      }
    });

    const routes = [
      '/',
      '/products/dynamics-365',
      '/products/business-central',
      '/products/microsoft-365',
      '/products/power-platform',
      '/products/azure'
    ];

    for (const route of routes) {
      console.log(`Fetching page for ${route}...`);
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
      
      const html = await page.content();
      
      // Ensure directory exists
      const routeDir = route === '/' ? distDir : path.join(distDir, route);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      const filePath = path.join(routeDir, 'index.html');
      console.log(`Saving HTML to ${filePath}...`);
      fs.writeFileSync(filePath, html);
    }
    
    await browser.close();
    console.log('Prerendering complete!');
  } catch (error) {
    console.error('Error during prerendering:', error);
    process.exit(1);
  } finally {
    server.close();
  }
});
