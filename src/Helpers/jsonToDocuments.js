const { Parser } = require("json2csv");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { createReadStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);
const pdfKitHtml = require('pdfkit-html');

//convert Json to csv
let jsonToCsv = async (data, fileName) => {
  let jsonData = JSON.parse(JSON.stringify(data));

  try {
    const parser = new Parser();
    const csvData = parser.parse(jsonData);
    fs.writeFile(
      `C:/Users/Santhosh.M/Desktop/MVC_Structure/server/files/${fileName}.csv`,
      csvData,
      (error, result) => {
        if (error) {
          console.log("Error in creating the file :" + error);
        } else {
          console.log("File Created at the designation");
        }
      }
    );
  } catch (e) {
    console.log("Error at creating csv file :" + e);
  }
};

//convert Json to pdf
let pdf = (data, fileName) => {
  try {
    let doc = new PDFDocument();
    doc.pipe(
      fs.createWriteStream(
        `C:/Users/Santhosh.M/Desktop/MVC_Structure/server/files/${fileName}.pdf`
      )
    );
    data.forEach((row) => {
      doc.text(JSON.stringify(row));
    });
    doc.end();
    console.log("Data created in Pdf");
  } catch (e) {
    console.log("Error occurs in Creating Pdf" + e);
  }
};

async function convertHtmlToPdf(fileName) {
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf</title>
      </head>
      <body>
        <h1>Hello Buddy</h1>
      </body>
      </html>
    `;
  const pdfDoc = new PDFDocument();

  // Create a write stream to save the PDF file
  const writeStream = fs.createWriteStream(`C:/Users/Santhosh.M/Desktop/MVC_Structure/server/files/${fileName}.pdf`);

  // Pipe the PDF document to the write stream
  pdfDoc.pipe(writeStream);
// Convert HTML to PDF using pdfkit-html
await pdfKitHtml(pdfDoc, htmlContent);

// Finalize the PDF document
pdfDoc.end();
console.log('PDF generated successfully!');
}
module.exports = {jsonToCsv , pdf , convertHtmlToPdf};
