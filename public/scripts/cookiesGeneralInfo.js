let cookies = decodeURIComponent(document.cookie.slice(9))
cookies = JSON.parse(cookies)

document.querySelector('#req_by').value = cookies.nama
document.querySelector('#no_pekerja').value = cookies.no_pekerja
document.querySelector('#nama_req').value = cookies.nama
document.querySelector('#fungsi').value = cookies.fungsi
document.querySelector('#departemen').value = cookies.departemen
document.querySelector('#pekerjaan').value = cookies.pekerjaan
document.querySelector('#no_kontak').value = cookies.no_kontak
document.querySelector('#email').value = cookies.email

let fungsi = cookies.fungsi

document.querySelector('#req_for').addEventListener('click', () => {
    fetch(`/get-requester/${fungsi}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#req_for').innerHTML = ''
            data.requester.forEach(user => {
                console.log(user.nama)
                const option = document.createElement('option')
                option.value = user.nama
                option.textContent = user.nama
                document.querySelector('#req_for').appendChild(option)
            });
        })
        .catch((err) => {
            console.log(err)
        })  
}, {once: true});

