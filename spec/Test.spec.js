describe("carregaDados", function() {
    it("deve chamar a função", function() {
        const func = carregaDados()
        expect(func).not.toBeNull()
    });
});

describe("procuraUsuario", function() {
    it("deve chamar a função", function() {
        const chave = '04080757247'
        const objeto = [0, { name: 'My name 1', cpf: '04080757247', phone: '11987654321', email: 'myemail1@test.com.br' }]
        const func = procuraUsuario(chave)
        expect(procuraUsuario(chave)).toEqual(objeto)
    });
});

describe("onSubmit", function() {
    it("deve chamar a função", function() {
        const func = onSubmit()
        expect(onSubmit()).toEqual(false);
    });
});

describe("validateEmail", function() {
    it("deve validar o email", function() {
        expect(validateEmail('felipelc454@gmail.com')).toEqual(true);
        expect(validateEmail('felasd.asd')).toEqual(false);
    });
});

describe("validateCpf", function() {
    it("deve validar o cpf", function() {
        expect(validateCpf('04080757247')).toEqual(true);
        expect(validateCpf('54621321645')).toEqual(false);
    });
});

describe("validateNome", function() {
    it("deve validar o nome", function() {
        expect(validateNome('Felipe')).toEqual(true);
        expect(validateNome('Fe')).toEqual(false);
    });
});

describe("validateTel", function() {
    it("deve validar o telefone", function() {
        expect(validateTel('11987654321')).toEqual(true);
        expect(validateTel('123')).toEqual(false);
    });
});

describe("carregaForm", function() {
    it("deve validar o telefone", function() {
        expect(carregaForm()).not.toBeTruthy();
    });
});