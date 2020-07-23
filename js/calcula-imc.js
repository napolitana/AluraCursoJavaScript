var pacientes = document.querySelectorAll(".paciente");

pacientes.forEach((paciente) => {
  var altura = paciente.querySelector(".info-altura").textContent;
  var peso = paciente.querySelector(".info-peso").textContent;
  var imc = paciente.querySelector(".info-imc");

  imc.textContent = calculaIMC(peso, altura);
});

function calculaIMC(peso, altura) {
  var imc = (peso / (altura * altura)).toFixed(2);
  return imc;
}
