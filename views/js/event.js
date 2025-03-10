import { GeneratePdf } from "./app.js"; // Import Parent Class 

class EventTicketPDF extends GeneratePdf {
    constructor(domRefId) {
        super(domRefId);
    }

    generatePDF(preview) {
        this.resetPdf(); 

        const event = document.getElementById("ticket-event")?.textContent || "N/A";
        const date = document.getElementById("ticket-date")?.textContent || "N/A";
        const name = document.getElementById("ticket-name")?.textContent || "N/A";
        const ticketNum = document.getElementById("ticket-number")?.textContent || "N/A";

        if (!event || !date || !name || !ticketNum) {
            alert("Missing ticket details.");
            return;
        }

        this.addHeader("Event Ticket", "#4c2B15");
        this.addText(`Event: ${event}`, "#000");
        this.addText(`Date: ${date}`, "#000");
        this.addText(`Attendee: ${name}`, "#000");
        this.addText(`Ticket Number: ${ticketNum}`, "#AC7035");
        this.addText("------------------------", "#4c2B15");
        this.addText("Thank you!", "#000");

        if (preview) {
            const pdfUrl = this.getPdfUrl();
            const iframe = document.getElementById("pdf-preview");
            iframe.style.display = "none";
            setTimeout(() => {
                iframe.src = pdfUrl;
                iframe.style.display = "block";
            }, 500);
        } else {
            this.downloadPdf();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-ticket");
    const previewBtn = document.getElementById("preview-pdf");
    const downloadBtn = document.getElementById("download-pdf");

    if (!generateBtn || !previewBtn || !downloadBtn) return;

    const ticketPDF = new EventTicketPDF("pdf-preview");

    generateBtn.addEventListener("click", () => {
        const eventSelect = document.getElementById("event-select");
        const name = document.getElementById("attendee-name").value.trim();
        const ticketDisplay = document.getElementById("ticket-display");

        if (!name || !eventSelect?.value) {
            alert("Enter your name & select an event.");
            return;
        }

        const [eventName, eventDate] = eventSelect.value.split(" - ");
        document.getElementById("ticket-event").textContent = eventName;
        document.getElementById("ticket-date").textContent = eventDate;
        document.getElementById("ticket-name").textContent = name;
        document.getElementById("ticket-number").textContent = Math.random().toString(36).substring(2, 9).toUpperCase();

        ticketDisplay.style.display = "block";
    });

    previewBtn.addEventListener("click", () => ticketPDF.generatePDF(true));
    downloadBtn.addEventListener("click", () => ticketPDF.generatePDF(false));
});
    
    