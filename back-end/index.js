const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());
let browser;

// Middleware to initialize Puppeteer and store the browser instance
app.use(async (req, res, next) => {
  try {
    if (!browser) {
      console.log("Launching Puppeteer browser");
      browser = await puppeteer.launch();
    }
    req.browser = browser;
    next();
  } catch (error) {
    console.error("Error launching Puppeteer browser:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Middleware to handle PDF generation for all routes
app.use(async (req, res, next) => {
  try {
    console.log(`Request received for path: ${req.path}`);

    // Check if the requested path is /main
    if (req.path === "/main") {
      console.log("Middleware for /main triggered");
      const page = await req.browser.newPage();
      console.log("Navigating to page");
      await page.goto(`http://localhost:3000${req.path}`);
      console.log("Generating PDF");
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      console.log("PDF generated");
      res.contentType("application/pdf");
      res.send(pdfBuffer);
    } else {
      next();
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Serve other routes or static content here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
