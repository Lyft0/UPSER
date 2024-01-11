document.querySelector('.req-add-ang').addEventListener('click', () => {
    jumlah_tambah = "Rp. " + document.querySelector('#jumlah_tambah').value
    desc_tambah = document.querySelector('#desc_tambah').value
    tgl_now = new Date()
    nama = document.querySelector('#user-name').textContent
    id = document.querySelector('.info-prodi').dataset.prodi

    riwayat = {
        'nama': nama,
        'layanan': "Penyetoran",
        'tanggal': `${tgl_now.toLocaleDateString()}`,
        'deskripsi': desc_tambah,
        'total_biaya': jumlah_tambah, 
    }

    fetch('/add-budget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id_prodi': id, 
            'riwayat': riwayat,
        })
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => {
        console.log(err)
    })
})

document.querySelector('.req-dec-ang').addEventListener('click', () => {
    jumlah_kurang = "Rp. " + document.querySelector('#jumlah_kurang').value
    desc_kurang = document.querySelector('#desc_kurang').value
    tgl_now = new Date()
    nama = document.querySelector('#user-name').textContent
    id = document.querySelector('.info-prodi').dataset.prodi

    riwayat = {
        'nama': nama,
        'layanan': "Pengeluaran",
        'tanggal': `${tgl_now.toLocaleDateString()}`,
        'deskripsi': desc_kurang,
        'total_biaya': jumlah_kurang, 
    }

    fetch('/dec-budget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id_prodi': id, 
            'riwayat': riwayat,
        })
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => {
        console.log(err)
    })
})