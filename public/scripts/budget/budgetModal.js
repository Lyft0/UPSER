document.querySelector('#add-anggaran').addEventListener('click', (event) => {
    const modal = document.querySelector(".modal-tambah")
    modal.style.display = "block";

    const span = document.querySelector(".close-tambah");
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

document.querySelector('#dec-anggaran').addEventListener('click', (event) => {
    const modal = document.querySelector(".modal-kurang")
    modal.style.display = "block";

    const span = document.querySelector(".close-kurang");
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

