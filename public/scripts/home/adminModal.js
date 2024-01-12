document.querySelector('#add-user').addEventListener('click', (event) => {
    const modal = document.querySelector(".modal-add-user")
    modal.style.display = "block";

    const span = document.querySelector(".close-add");
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

document.querySelector('#add-req-user').addEventListener('submit', (event) => {
    event.preventDefault()

    nama = document.querySelector('#nama').value
    no_pekerja = document.querySelector('#no_pekerja').value
    role = document.querySelector('#role').value
    pekerjaan = document.querySelector('#pekerjaan').value
    fungsi = document.querySelector('#fungsi').value
    departemen = document.querySelector('#departemen').value
    no_kontak = document.querySelector('#no_kontak').value
    email = document.querySelector('#new-email').value
    password = document.querySelector('#new-pass').value
    if (role == 'admin') {
        image = 'admin.png'
    } else {
        image = 'default.png'
    }

    fetch('/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                'nama': nama,
                'no_pekerja': no_pekerja,
                'role': role,
                'pekerjaan': pekerjaan,
                'fungsi': fungsi,
                'departemen': departemen,
                'no_kontak': no_kontak,
                'email': email,
                'password': password,
                'image': image
            }
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})

document.querySelectorAll('.edit-user').forEach(element => {
    element.addEventListener('click', () => {
        const modal = document.querySelector(".modal-edit-" + event.currentTarget.dataset.user)
        modal.style.display = "block";

        const span = document.querySelector(".close-edit-" + event.currentTarget.dataset.user);
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    })
})
document.querySelectorAll('.btn-update').forEach(element => {
    element.addEventListener('click', (event) => {
        const modal = event.currentTarget.parentElement.parentElement
        nama = modal.querySelector('.f3 > .nama').value
        no_pekerja = modal.querySelector('.f3 > .no_pekerja').value
        role = modal.querySelector('.f3 > .role').value
        pekerjaan = modal.querySelector('.f3 > .pekerjaan').value
        fungsi = modal.querySelector('.f3 > .fungsi').value
        departemen = modal.querySelector('.f3 > .departemen').value
        no_kontak = modal.querySelector('.f4 > .no_kontak').value
        email = modal.querySelector('.f4 > .new-email').value
        password = modal.querySelector('.f4 > .new-pass').value
        image = modal.querySelector('.f4 > .btn-update').dataset.image
        id = modal.dataset.user

        fetch('/update-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    'nama': nama,
                    'no_pekerja': no_pekerja,
                    'role': role,
                    'pekerjaan': pekerjaan,
                    'fungsi': fungsi,
                    'departemen': departemen,
                    'no_kontak': no_kontak,
                    'email': email,
                    'password': password,
                    'image': image            
                },
                id: id,                
            })
        })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })


    })
  })

document.querySelectorAll('.del-user').forEach(element => {
    element.addEventListener('click', (event) => {
        const id_user = event.currentTarget.dataset.user
        const endpoint = `/delete-user/${id_user}`

        swal({
            title: "Delete User?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              fetch(endpoint, {
                method: 'DELETE'
              })
              .then((response) => response.json())
              .then((data) => {
                swal("User has been deleted!", {
                  icon: "success",
                })
                .then(() => {
                  window.location.href = data.redirect
                })
              })
              .catch((err) => console.log(err))
            }
          });
    })
})