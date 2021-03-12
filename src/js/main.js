//Realiza a requisição para API fornecida e grava os dados no localstorage
carregaDados = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://private-21e8de-rafaellucio.apiary-mock.com/users', true)
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4) { 
            if (xhr.status = 200 && !localStorage.getItem('usuarios')) localStorage.setItem('usuarios', xhr.responseText)
        } 
    } 
    xhr.send();
}

//Carreaga os dados na listagem
carregaLista = () => {
    let lista = JSON.parse(localStorage.getItem('usuarios'))
    lista.forEach((element) => {
        document.getElementById("lista").innerHTML += '<div class="column"><div class="card-list"><h3>'+
        element.name+'</h3><p>'+element.cpf+'</p><p>'+element.phone+'</p><p>'+element.email+'</p>'+
        '<button id="botao" type="button" class="buttonEdit" onclick="onEdit(\''+element.cpf+'\')">'+
        '<span id="textButton">Editar</span></button><button id="botao" type="button" class="buttonDelet" onclick="apagarUsuario(\''+
        element.cpf+'\')"><span id="textButton">Apagar</span></button></div></div>'
    });
    
}

//Redireciona para o form com os dados de um usuário para edição
onEdit = (chave) => {
    let usuario = procuraUsuario(chave)[1]
    const url = window.location.href.split("?")[0]
    window.location.href = url.replace("listagem.html", "index.html?chave=")+usuario.cpf
}

//Apaga os dados de um determinado usuário a partir de uma chave(CPF)
apagarUsuario = (chave) => {
    let lista = JSON.parse(localStorage.getItem('usuarios'))
    let retorno = procuraUsuario(chave)
    lista.splice(retorno[0], 1)
    localStorage.setItem('usuarios', JSON.stringify(lista))
    location.reload()
}

//Encontra um determinado usuário a partir de uma chave(CPF)
procuraUsuario = (chave) => {
    let lista = JSON.parse(localStorage.getItem('usuarios'))
    for(let i=0; i < lista.length; i++){
        if(lista[i].cpf == chave){
            return [i, lista[i]]
        }
    }
    return false
}

/*Realiza a submissão dos dados inseridos no formulário e salva no localstorage.
Se o usuário já existir na base de dados, i. e. o CPF já estiver cadastrado,
atualiza os dados. Se não, insere um novo usuário na lista*/
onSubmit = () => {

    if(
        document.querySelector('input[name=nome]') && 
        document.querySelector('input[name=email]') && 
        document.querySelector('input[name=cpf]') && 
        document.querySelector('input[name=telefone]')){

        let usuarioValido = true
        const nome = document.querySelector('input[name=nome]').value
        const email = document.querySelector('input[name=email]').value
        const cpf = document.querySelector('input[name=cpf]').value
        const telefone = document.querySelector('input[name=telefone]').value

        document.getElementById("botao").addEventListener("click", function(event){
            event.preventDefault()
        });
    
    
        if(validateNome(nome)){
            document.getElementById("mensagemNome").hidden = true
            document.getElementById("nome").className = "input"
        }else{
            usuarioValido = false
            document.getElementById("mensagemNome").hidden = false
            document.getElementById("nome").className = "input invalid"
        }


        if(validateEmail(email)){
            document.getElementById("mensagemEmail").hidden = true
            document.getElementById("email").className = "input"
        }else{
            usuarioValido = false
            document.getElementById("mensagemEmail").hidden = false
            document.getElementById("email").className = "input invalid"
        }

        if(validateCpf(cpf)){
            document.getElementById("mensagemCpf").hidden = true
            document.getElementById("cpf").className = "input"
        }else{
            usuarioValido = false
            document.getElementById("mensagemCpf").hidden = false
            document.getElementById("cpf").className = "input invalid"
        }

        if(validateTel(telefone)){
            document.getElementById("mensagemTelefone").hidden = true
            document.getElementById("telefone").className = "input"
        }else{
            usuarioValido = false
            document.getElementById("mensagemTelefone").hidden = false;
            document.getElementById("telefone").className = "input invalid"
        }

        if(usuarioValido){
            document.getElementById("textButton").hidden = true
            document.getElementById("loader").hidden = false
            const usuarios = JSON.parse(localStorage.getItem('usuarios'))

            let retorno = procuraUsuario(cpf)
            if(retorno){
                usuarios[retorno[0]] = {
                    "name": nome,
                    "cpf": cpf,
                    "phone": telefone,
                    "email": email
                }
            }else{
                usuarios.push({
                    "name": nome,
                    "cpf": cpf,
                    "phone": telefone,
                    "email": email
                })
            }
            
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            const url = window.location.href.split("?")[0]
            window.location.href = url.replace("index.html", "listagem.html")
        }
        return true

    }else{
        return false
    }

}

//Redireciona para o cadastro
redirectCadastro = () => {
    const url = window.location.href
    window.location.href = url.replace("listagem.html", "index.html")
}

//Verifica se um email é válido
validateEmail = (email) => {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

//Verifica se um cpf é válido
validateCpf = (cpf) => {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

//Verifica se um nome é válido
validateNome = (nome) => {
    if(nome.length < 3 || nome == '') return false
    return true
}

//Verifica se um telefone é válido
validateTel = (telefone) => {
    if(telefone.length < 10 || telefone == '') return false
    return true
}
//Carrega os dados no formulário para edição
carregaForm = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const cpf = urlParams.get('chave')
    if(cpf){
        let usuario = procuraUsuario(cpf)[1]
        document.querySelector('input[name=nome]').value = usuario.name
        document.querySelector('input[name=email]').value = usuario.email
        document.querySelector('input[name=cpf]').value = usuario.cpf
        document.querySelector('input[name=telefone]').value = usuario.phone
        document.getElementById("botao").disabled = false
        document.getElementById("textButton").innerHTML = 'Atualizar'
        //CONSOLE LOG
        console.log(usuario)
    }
    
}