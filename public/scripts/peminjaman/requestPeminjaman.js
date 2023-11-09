document.querySelector('#form-request').addEventListener('submit', () => {
    event.preventDefault();
    
    req_by = document.querySelector('#req_by').value
    req_for = document.querySelector('#req_for').value
    no_pekerja = document.querySelector('#no_pekerja').value
    nama_req = document.querySelector('#nama_req').value
    fungsi = document.querySelector('#fungsi').value
    perusahaan = document.querySelector('#perusahaan').value
    no_kontak = document.querySelector('#no_kontak').value
    email = document.querySelector('#email').value
    desc_req = document.querySelector('#desc_req').value

    let cookies = decodeURIComponent(document.cookie.slice(9))
    cookies = JSON.parse(cookies)
    id_user_req = cookies._id

    jumlah_peserta = document.querySelector('#jumlah_peserta').value
    tgl_mulai = document.querySelector('#tgl_mulai').value
    tgl_selesai = document.querySelector('#tgl_selesai').value    
    jam_mulai = document.querySelector('#jam_mulai').value
    jam_selesai = document.querySelector('#jam_selesai').value
    nama_tempat = document.querySelector('#nama_tempat').value
    jenis_kegiatan = document.querySelector('#jenis_kegiatan').value
    desc_kegiatan = document.querySelector('#desc_kegiatan').value

    let workorder_id = "WO" + Math.floor(1000 + Math.random() * 9000).toString()
    let tgl_now = new Date()
    let activity = []
    
    activity.push({
        'nama': 'System',
        'tgl': `${tgl_now.toLocaleDateString()}`,
        'msg': `New ${workorder_id} Generated.`
    })

    fetch('/peminjaman-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ticket':{
                'jenis_ticket': 'Peminjaman Ruangan/Tempat',
                'req_by': req_by,
                'req_for': req_for,
                'no_pekerja': no_pekerja,
                'nama_req': nama_req,
                'fungsi': fungsi,
                'perusahaan': perusahaan,
                'no_kontak': no_kontak,
                'email': email,
                'status': 'Waiting Approval',
                'desc_req': desc_req,
                'id_user_req': id_user_req,
                'request_id': "REQ" + Math.floor(1000 + Math.random() * 9000).toString(),
                'workorder_id': workorder_id,
                'assignee': '',
                'priority': 'Not Set',
                'progress_sla': '',
                'activity': activity,
            },
            'peminjaman_ticket':{
                'jumlah_peserta': jumlah_peserta,
                'tgl_mulai': tgl_mulai,
                'tgl_selesai': tgl_selesai,
                'jam_mulai': jam_mulai,
                'jam_selesai': jam_selesai,
                'nama_tempat': nama_tempat,
                'jenis_kegiatan': jenis_kegiatan,
                'desc_kegiatan': desc_kegiatan,
                'sla': 2,
            }
            
        })
    })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => {
            console.log(err)
        })
})