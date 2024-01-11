let itemList = []
tableProduct = document.querySelector('#table-product')

const del_prod = (event) => {
    tableBody = tableProduct.querySelector('table > tbody')
    tdList = tableProduct.querySelectorAll('table > tbody > tr')
    index = event.currentTarget.dataset.pro
    for(let e of tdList){
        delE = e.querySelector('.del-prod').dataset.pro
        if(delE == index){
            delRow = e
            break;
        }
    }
    tableBody = tableBody.removeChild(delRow)
}

document.querySelector('#product-list').addEventListener('change', () => {
    const product_type = document.querySelector('#product-list').value

    tableProduct.style.display = 'inline'
    document.querySelector('#add-prod').style.display = 'inline'
    document.querySelector('#update-prod').style.display = 'inline'
    document.querySelector('#nodata').style.display = 'none'

    fetch(`/get-product/${product_type}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        tableHead = tableProduct.querySelector('table > thead > tr')
        tableBody = tableProduct.querySelector('table > tbody')
        tableHead.innerHTML = ''
        tableBody.innerHTML = ''

        switch(product_type){            
            case "atk":
            case "workfurn":
                prod = (product_type == "atk") ? data.atk : data.workfurn
                tableHead.innerHTML = '<th>Nama Produk</th><th>Jenis Produk</th><th>Harga</th><th>Opsi</th>'
                var i = 1
                prod.forEach(e => {
                    nama_produk = e.nama_produk
                    jenis_produk = e.jenis_produk
                    harga = e.harga
                    tr = document.createElement('tr')
                    tr.innerHTML = `<td><input type="text" id="nama_produk_${i}" value="${nama_produk}"></td><td><input type="text" id="jenis_produk_${i}" value="${jenis_produk}"></td><td><input type="number" id="harga_${i}" value=${harga} min="0"></td><td><button class="del-prod" data-pro=${i}>Delete</button></td>`
                    tableBody.appendChild(tr)
                    i += 1
                });
                break;
    
            case "rtk":
            case "consum":
                prod = (product_type == "rtk") ? data.rtk : data.consum
                tableHead.innerHTML = '<th>Nama Produk</th><th>Harga</th><th>Opsi</th>'
                var i = 1
                prod.forEach(e => {
                    nama_produk = e.nama_produk
                    harga = e.harga
                    tr = document.createElement('tr')
                    tr.innerHTML = `<td><input type="text" id="nama_produk_${i}" value="${nama_produk}"></td><td><input type="number" id="harga_${i}" value=${harga} min="0"></td><td><button class="del-prod" data-pro=${i}>Delete</button></td>`
                    tableBody.appendChild(tr)
                    i += 1
                });
                break;
    
            case "konsumsi":
                prod = data.konsumsi
                tableHead.innerHTML = '<th>Nama Paket Konsumsi</th><th>Jenis Konsumsi</th><th>Harga</th><th>Opsi</th>'
                var i = 1
                prod.forEach(e => {
                    nama_paket = e.nama_paket
                    jenis_konsumsi = e.jenis_konsumsi
                    harga = e.harga
                    tr = document.createElement('tr')
                    tr.innerHTML = `<td><input type="text" id="nama_paket_${i}" value="${nama_paket}"></td><td><input type="text" id="jenis_konsumsi_${i}" value="${jenis_konsumsi}"></td><td><input type="number" id="harga_${i}" value=${harga} min="0"></td><td><button class="del-prod" data-pro=${i}>Delete</button></td>`
                    tableBody.appendChild(tr)
                    i += 1
                });
                break;
        }

        document.querySelectorAll('.del-prod').forEach(element => {
            element.addEventListener('click', del_prod)
        });
    })    
})

document.querySelector('#add-prod').addEventListener('click', () => {
    const product_type = document.querySelector('#product-list').value
    tableBody = tableProduct.querySelector('table > tbody')
    count = document.querySelectorAll('table > tbody > tr').length+1
    tr = document.createElement('tr')
    
    document.querySelectorAll('.del-prod').forEach(element => {
        element.removeEventListener('click', del_prod)
    });

    switch(product_type){
        case "atk":
        case "workfurn":
            tr.innerHTML = `<td><input type="text" id="nama_produk_${count}"></td><td><input type="text" id="jenis_produk_${count}"></td><td><input type="number" id="harga_${count}" value=0 min="0"></td><td><button class="del-prod" data-pro=${count}>Delete</button></td>`
            break;
        case "rtk":
        case "consum":
            tr.innerHTML = `<td><input type="text" id="nama_produk_${count}"></td><td><input type="number" id="harga_${count}" value=0 min="0"></td><td><button class="del-prod" data-pro=${count}>Delete</button></td>`
            break;
        case "konsumsi":
            tr.innerHTML = `<td><input type="text" id="nama_paket_${count}"></td><td><input type="text" id="jenis_konsumsi_${count}"></td><td><input type="number" id="harga_${count}" value=0 min="0"></td><td><button class="del-prod" data-pro=${count}>Delete</button></td>`
            break;
    }

    tableBody.appendChild(tr)

    document.querySelectorAll('.del-prod').forEach(element => {
        element.addEventListener('click', del_prod)
    });
})


document.querySelector('#update-prod').addEventListener('click', () => {
    const product_type = document.querySelector('#product-list').value
    tableBody = tableProduct.querySelector('table > tbody')
    tdList = tableProduct.querySelectorAll('table > tbody > tr')

    switch(product_type){
        case "atk":
        case "workfurn":
            tdList.forEach(e => {
                nama_produk = e.childNodes[0].querySelector('input').value
                jenis_produk = e.childNodes[1].querySelector('input').value
                harga = e.childNodes[2].querySelector('input').value
                itemList.push({
                    'nama_produk': nama_produk,
                    'jenis_produk': jenis_produk,
                    'harga': harga
                })
            })
            break
        case "rtk":
        case "consum":
            tdList.forEach(e => {
                nama_produk = e.childNodes[0].querySelector('input').value
                harga = e.childNodes[1].querySelector('input').value
                itemList.push({
                    'nama_produk': nama_produk,
                    'harga': harga
                })
            })
            break
        case "konsumsi":
            tdList.forEach(e => {
                nama_paket = e.childNodes[0].querySelector('input').value
                jenis_konsumsi = e.childNodes[1].querySelector('input').value
                harga = e.childNodes[2].querySelector('input').value
                itemList.push({
                    'nama_paket': nama_paket,
                    'jenis_konsumsi': jenis_konsumsi,
                    'harga': harga
                })
            })
            break
    }

    fetch(`/update-product/${product_type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'product': itemList
        })
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => {
        console.log(err)
    })
})





