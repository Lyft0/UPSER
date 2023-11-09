let itemList = []

const listItem = document.getElementById('nama_tempat');
listItem.addEventListener(('change'), () => {
    if(listItem.value == "Lainnya"){
        document.querySelector('#nama_item_lainnya').style.display = 'inline'
    }else{
        listItem.style.display = 'inline'
        document.querySelector('#nama_item_lainnya').style.display = 'none'
        document.querySelector('#nama_item_lainnya').value = ''
    }
})
