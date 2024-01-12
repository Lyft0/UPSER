const { jsPDF } = require("jspdf")
require('jspdf-autotable')

const rtkPrint = (ticket, ticket_detail) => {    
    var doc = new jsPDF()

    doc.setFont("helvetica", "bold");
    doc.text("PERMINTAAN LAYANAN", 20, 20);
    doc.text(`OFFICE FACILITY SUPPORT - ${ticket.jenis_ticket}`, 20, 27);

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal");
    doc.text(`Request ID: ${ticket.request_id}`, 20, 40);
    doc.text(`${Date(Date.now).slice(4, -34)}`, 190, 45, null, null, "right");
    doc.text("Requester:", 20, 53)
    doc.text(`${ticket.nama_req} / ${ticket.no_pekerja}`, 22, 59)
    doc.text(`${ticket.fungsi}`, 22, 65)
    doc.text(`${ticket.no_kontak} / ${ticket.email}`, 22, 71)
    doc.text(`${ticket.pekerjaan} / ${ticket.departemen}`, 22, 77)
    doc.text("Deskripsi Singkat", 20, 90)
    doc.text(`: ${ticket.desc_req}`, 80, 90)
    doc.text("Tanggal Penerimaan", 20, 96)
    doc.text(`: ${ticket_detail.tgl_terima.toUTCString().slice(5, -13)}`, 80, 96)
    doc.text("Lokasi Penerimaan", 20, 102)
    doc.text(`: ${ticket_detail.lokasi_terima}`, 80, 102)
    doc.text("Tanggal & Jam Pick-up Ticket", 20, 108)
    doc.text(`: ${ticket.createdAt.toUTCString().slice(5, -4)}`, 80, 108)
    doc.text("DAFTAR PERMINTAAN", 20, 125)
    doc.text('Yang Meminta / Pengguna', 188, 245, null, null, 'right');
    doc.text('(                                         )', 190, 280, null, null, 'right');

    // Define the table data (including the header)
    var tableData = [
        ['No', 'Nama Produk', 'Jumlah', 'Deskripsi', 'Harga'],
    ];
    
    let i = 1
    ticket_detail.item_rtk.forEach(item => {
        let row = [i, item.nama_produk, item.jumlah, item.deskripsi_produk, item.harga]
        tableData.push(row)
        i += 1
    });

    let totalBiaya = Intl.NumberFormat().format(ticket_detail.total_biaya)
    let total = [{
        content: 'Total Biaya : ',
        colSpan: 4,
        styles: {
            halign: 'right'
        }
    },
    {
        content: `Rp. ${totalBiaya}`,
        styles: {
            halign: 'left'
        }
    }]
    tableData.push(total)

    // Define table column widths (optional)
    var columnWidths = [10, 50, 20, 50, 30]; // Adjust as needed

    // Add a table with a header to the PDF using autoTable
    doc.autoTable({
        head: [tableData[0]], // Use the first row as the header
        body: tableData.slice(1), // Exclude the header from the body
        startY: 135, // Y-coordinate where the table should start
        columnStyles: {
            0: { cellWidth: columnWidths[0] },
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] },
            3: { cellWidth: columnWidths[3] },
            4: { cellWidth: columnWidths[4] },
        },
        margin: {left: 20, right: 50}
    })
    return doc
}
    
module.exports = {
    rtkPrint
}