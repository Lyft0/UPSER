let itemList = []

document.querySelector('#add-item').addEventListener('click', () => {
    const jumlah = document.querySelector('#jumlah').value + " " + document.querySelector('#satuan').value
    const deskripsi = document.querySelector('#desc_produk').value
    let jenis = document.querySelector('#jenis_produk').value
    let harga = "Rp." + document.querySelector('#harga-min').value + " - Rp." + document.querySelector('#harga-max').value

    console.log(harga)
    if(document.querySelector('#nama_produk_lainnya').value != ""){
        jenis = document.querySelector('#nama_produk_lainnya').value
    }
    if(jenis != ''){
        itemList.push({
            'jenis_produk':`${jenis}`,
            'jumlah':`${jumlah}`,
            'harga':`${harga}`,
            'deskripsi_produk':`${deskripsi}`,
        })
        console.log(itemList)
        
        var table = document.getElementById("item-list")
        var row = table.insertRow(-1)
        row.style.fontSize = "0.8em"
        var jenis_td = row.insertCell(0)
        var jumlah_td = row.insertCell(1)
        var harga_td = row.insertCell(2)
        var deskripsi_td = row.insertCell(3)
        var delete_td = row.insertCell(4)

        jenis_td.innerHTML = jenis
        jumlah_td.innerHTML = jumlah
        harga_td.innerHTML = harga
        harga_td.style.maxWidth = "120px"
        harga_td.style.wordWrap = "break-word"
        deskripsi_td.innerHTML = deskripsi
        deskripsi_td.style.maxWidth = "160px"
        deskripsi_td.style.wordWrap = "break-word"
        delete_td.innerHTML = `<button type="button" class="delete_td">Delete</button>`
    }

    document.getElementById('jenis_produk').selectedIndex = 0
    document.getElementById('jumlah').value = 1
    document.getElementById('harga-max').value = ""
    document.getElementById('desc_produk').value = ''
    document.querySelector('#nama_produk_lainnya').style.display = 'none'
    document.querySelector('#nama_produk_lainnya').value = ''
})

document.querySelector('#item').addEventListener("click", function(event) {
    if (event.target.classList.contains("delete_td")) {
        const index = event.target.parentNode.parentNode.rowIndex;
        document.querySelector('#item').deleteRow(index)
        remove = itemList.splice(index-1, 1)
    }
})

const listItem = document.getElementById('jenis_produk');
listItem.addEventListener(('change'), () => {
    if(listItem.value == "Lainnya"){
        document.querySelector('#nama_produk_lainnya').style.display = 'inline'
    }else{
        listItem.style.display = 'inline'
        document.querySelector('#nama_produk_lainnya').style.display = 'none'
        document.querySelector('#nama_produk_lainnya').value = ''
    }
})
