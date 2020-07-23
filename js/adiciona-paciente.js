var adicionarPaciente = document.querySelector("#adicionar-paciente");
var form = document.querySelector("#form-add");
var campos = document.querySelectorAll(".campo");

adicionarPaciente.addEventListener("click", function (event) {
  event.preventDefault();

  var paciente = retornaDadosPaciente(form);

  if (camposPreenchidos(paciente)) {
    adicionaPaciente(paciente);
    form.reset();
  }
});

function adicionaPaciente(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

campos.forEach(function (campo) {
  campo.addEventListener("focusout", function () {
    var valor = campo.value;
    var seletor = "#erro-" + campo.id;
    if (valor == "") {
      invalidaCampo(campo, seletor, "Este campo deve ser preenchido");
    } else {
      if (campo.id == "peso") {
        if (!validaPeso(form.peso.value)) {
          invalidaCampo(form.peso, seletor, "Peso inválido!");
        } else {
          validaCampo(form.peso, seletor);
        }
      } else if (campo.id == "altura") {
        if (!validaAltura(form.altura.value)) {
          invalidaCampo(form.altura, seletor, "Altura inválida!");
        } else {
          validaCampo(form.altura, seletor);
        }
      } else {
        validaCampo(campo, seletor);
      }
    }
  });
});

function retornaDadosPaciente(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaIMC(form.peso.value, form.altura.value),
  };

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(dado, classe) {
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = dado;
  return td;
}

function camposPreenchidos(paciente) {
  return paciente.peso !== "" &&
    paciente.altura !== "" &&
    paciente.nome !== "" &&
    paciente.gordura !== ""
    ? true
    : false;
}

function invalidaCampo(campo, seletor, mensagem) {
  var campoMensagem = document.querySelector(seletor);
  campoMensagem.textContent = mensagem;
  campo.classList.add("campo-invalido");
}

function validaCampo(campo, seletor) {
  var campoMensagem = document.querySelector(seletor);
  campoMensagem.textContent = "";
  campo.classList.remove("campo-invalido");
}

function validaPeso(peso) {
  return peso > 0 && peso <= 595 ? true : false;
}

function validaAltura(altura) {
  return altura > 0 && altura < 3.0 ? true : false;
}
