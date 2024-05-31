document.addEventListener("DOMContentLoaded", function () {
  // Abrir o modal ao clicar no botão "Finalizar a compra"
  document
    .querySelector(".cart--finalizar")
    .addEventListener("click", function () {
      document.getElementById("paymentModal").style.display = "block";
    });

  // Fechar o modal ao clicar no botão de fechar (x)
  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      document.getElementById("paymentModal").style.display = "none";
    });
  }

  // Fechar o modal ao clicar fora dele
  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("paymentModal")) {
      document.getElementById("paymentModal").style.display = "none";
    }
  });

  // Atualizar detalhes das parcelas com base no número selecionado
});
// Adiciona a classe 'selected' à imagem clicada e remove a classe 'selected' das outras imagens
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um evento de clique a todas as imagens com a classe "payment-option"
  const paymentOptions = document.querySelectorAll(".payment-option");
  paymentOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      // Remove a classe "selected" de todas as imagens
      paymentOptions.forEach(function (opt) {
        opt.classList.remove("selected");
      });

      // Adiciona a classe "selected" à imagem clicada
      option.classList.add("selected");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Função para exibir o formulário Pix e ocultar o formulário padrão de pagamento
  function exibirFormularioPix() {
    const pagamentoPadrao = document.getElementById("paymentDetails");
    const pixForm = document.getElementById("pixForm");

    if (pagamentoPadrao && pixForm) {
      pagamentoPadrao.style.display = "none";
      pixForm.style.display = "block";
    }
  }

  // Função para ocultar o formulário Pix e exibir o formulário padrão de pagamento
  function exibirFormularioPadrao() {
    const pagamentoPadrao = document.getElementById("paymentDetails");
    const pixForm = document.getElementById("pixForm");

    if (pagamentoPadrao && pixForm) {
      pagamentoPadrao.style.display = "block";
      pixForm.style.display = "none";
    }
  }

  // Adicionar evento de clique para a opção do Pix
  document
    .getElementById("paymentOptionPix")
    .addEventListener("click", function () {
      exibirFormularioPix();
    });

  // Adicionar evento de clique para outras opções de pagamento
  const outrasOpcoes = document.querySelectorAll(
    ".payment-option:not(#paymentOptionPix)"
  );
  outrasOpcoes.forEach(function (opcao) {
    opcao.addEventListener("click", function () {
      exibirFormularioPadrao();
    });
  });

  // Função para atualizar os detalhes do pagamento com os valores do Pix
  function atualizarDetalhesPix() {
    const totalDetails = document.getElementById("totalDetails");
    const pixDetails = document.getElementById("pixDetails");

    // Verificar se os elementos totalDetails e pixDetails estão disponíveis
    if (totalDetails && pixDetails) {
      console.log("Elementos totalDetails e pixDetails encontrados!");

      totalDetails.innerHTML = "<p>Total do Pix: R$ 100,00</p>";
      pixDetails.innerHTML = "<p>Chave PIX: sua-chave-pix@example.com</p>";
      console.log("Detalhes do Pix atualizados!");
    } else {
      console.log("Elementos totalDetails e pixDetails não encontrados!");
    }
  }
});
