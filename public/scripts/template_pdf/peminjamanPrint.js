const { jsPDF } = require("jspdf")
require('jspdf-autotable')

const peminjamanPrint = (ticket, ticket_detail) => {    
    var doc = new jsPDF()

    doc.setFont("helvetica", "bold");
    doc.text("PERMINTAAN LAYANAN OFFICE FACILITY SUPPORT -", 20, 20);
    doc.text(`${ticket.jenis_ticket.toUpperCase()}`, 20, 27);

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
    doc.text("Jumlah Peserta", 20, 96)
    doc.text(`: ${ticket_detail.jumlah_peserta}`, 80, 96)
    doc.text("Tanggal / Jam Mulai", 20, 102)
    doc.text(`: ${ticket_detail.tgl_mulai.toUTCString().slice(5, -13)} / ${ticket_detail.jam_mulai}`, 80, 102)
    doc.text("Tanggal / Jam Selesai", 20, 108)
    doc.text(`: ${ticket_detail.tgl_selesai.toUTCString().slice(5, -13)} / ${ticket_detail.selesai}`, 80, 108)
    doc.text("Nama Ruangan/Tempat", 20, 114)
    doc.text(`: ${ticket_detail.nama_tempat}`, 80, 114)
    doc.text("Jenis Kegiatan", 20, 120)
    doc.text(`: ${ticket_detail.jenis_kegiatan}`, 80, 120)
    doc.text("Deskripsi Kegiatan", 20, 126)
    doc.text(`: ${ticket_detail.desc_kegiatan}`, 80, 126)
    doc.text('Yang Meminta / Pengguna', 188, 245, null, null, 'right');
    doc.text('(                                         )', 190, 280, null, null, 'right');

    return doc
}
    
module.exports = {
    peminjamanPrint
}