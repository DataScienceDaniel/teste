function submitForm() {
    var senhaInput = document.getElementById('senha');
    var senha = senhaInput.value;
    var senhamd5 = "5029cc9dd0295ded2f500084635c18c1";
    var inputMD5 = hex_md5(senha)

    if (inputMD5 == senhamd5) {
        sessionStorage.setItem('log', 'logado');
        document.location = "/atletas.html";
    } else {
        alert("Senha incorreta");
    }
}