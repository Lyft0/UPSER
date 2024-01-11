let itemList = []

document.querySelector('#add-item').addEventListener('click', () => {
    const jenis = document.querySelector('#jenis_atk').value
    const jumlah = document.querySelector('#jumlah').value
    const deskripsi = document.querySelector('#desc_atk').value
    let nama = document.querySelector('#nama_atk').value
    temp_harga = document.querySelector('#harga').textContent.replace(/,/g, '')
    let harga = "Rp. " + Intl.NumberFormat().format(parseInt(temp_harga, 10)*jumlah)

    if(document.querySelector('#nama_atk_lainnya').value != ""){
        nama = document.querySelector('#nama_atk_lainnya').value
    }
    if(nama != ''){
        itemList.push({
            'nama_produk':`${nama}`,
            'jenis_produk':`${jenis}`,
            'jumlah':`${jumlah}`,
            'deskripsi_produk':`${deskripsi}`,
            'harga':`${harga}`
        })

        var table = document.getElementById("item-list")
        var row = table.insertRow(-1)
        row.style.fontSize = "0.8em"
        var nama_td = row.insertCell(0)
        var jenis_td = row.insertCell(1)
        var jumlah_td = row.insertCell(2)
        var deskripsi_td = row.insertCell(3)
        var harga_td = row.insertCell(4)
        var delete_td = row.insertCell(5)
    
        nama_td.innerHTML = nama
        jenis_td.innerHTML = jenis
        jumlah_td.innerHTML = jumlah
        deskripsi_td.innerHTML = deskripsi
        harga_td.innerHTML = harga
        delete_td.innerHTML = `<button type="button" class="delete_td">Delete</button>`
    }

    document.getElementById('jenis_atk').selectedIndex = 0
    listAtk.innerHTML = ''
    listAtk.innerHTML = `<option value='' selected disabled hidden>Pilih Produk</option>`
    document.getElementById('harga').textContent = 0
    document.getElementById('jumlah').value = 1
    document.getElementById('desc_atk').value = ''

    if(listAtk.value == "Lainnya"){
        document.querySelector('#nama_atk_lainnya').style.display = 'inline'
        document.getElementById('harga').textContent = 0
    }else{
        listAtk.style.display = 'inline'
        document.querySelector('#nama_atk_lainnya').style.display = 'none'
        document.querySelector('#nama_atk_lainnya').value = ''
    }
})

document.querySelector('#item').addEventListener("click", function(event) {
    if (event.target.classList.contains("delete_td")) {
        const index = event.target.parentNode.parentNode.rowIndex;
        document.querySelector('#item').deleteRow(index)
        remove = itemList.splice(index-1, 1)
    }
})

