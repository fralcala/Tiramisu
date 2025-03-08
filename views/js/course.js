import GeneratePdf from "./app.js";

class Certificate extends GeneratePdf {}

const myPdf = new GeneratePdf("pdf-preview");

myPdf.showPdf();
