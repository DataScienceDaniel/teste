const parametros = new URLSearchParams(window.location.search);

document.getElementById('id').innerHTML = parametros.get('id');