document.querySelector('#btn-logout').addEventListener('click', () => {
    swal({
        title: "Log Out?",
        text: "Do you want to continue?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            fetch('/logout', {
                method: 'GET'
            })
            .then((response) => response.json())
                .then((data) => window.location.href = data.redirect)
                .catch((err) => {
                    console.log(err)
                })
        }
      })
})