const jenisAtk = document.getElementById('jenis_atk');
const listAtk = document.getElementById('nama_atk');

jenisAtk.addEventListener('change', () => {
    const selectedJenis = jenisAtk.value;
    fetch('/atk-produk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `jenis=${selectedJenis}`,
    })
        .then((response) => response.json())
        .then((data) => {
            listAtk.innerHTML = ''
            listAtk.innerHTML = `<option value='' selected disabled hidden>Pilih Produk</option>`

            document.querySelector('#jumlah').value = 1
            document.getElementById('harga').textContent = 0
            if (Object.keys(data.produk).length == 0) {
                listAtk.style.display = 'none'
                document.querySelector('#nama_atk_lainnya').style.display = 'inline'
            } else {
                listAtk.style.display = 'inline'
                document.querySelector('#nama_atk_lainnya').style.display = 'none'
                document.querySelector('#nama_atk_lainnya').value = ''
                
                data.produk.forEach(produk => {
                    const option = document.createElement('option')
                    option.value = produk.nama_produk
                    option.textContent = produk.nama_produk
                    option.dataset.harga = produk.harga
                    listAtk.appendChild(option)
                });
            }
        })
        .catch((err) => {
            console.log(err)
        })
});

listAtk.addEventListener('change', () => {
    document.querySelector('#harga').textContent = Intl.NumberFormat().format(listAtk.options[listAtk.selectedIndex].dataset.harga)

})
