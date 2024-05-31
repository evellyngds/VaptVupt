let modalKey = 0;
let quantPizzas = 1;
let cart = [];

// Funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatoMonetario = (valor) => (valor ? valor.toFixed(2) : "");

const abrirModal = () => {
  seleciona(".pizzaWindowArea").style.opacity = 0;
  seleciona(".pizzaWindowArea").style.display = "flex";
  setTimeout(() => (seleciona(".pizzaWindowArea").style.opacity = 1), 150);
};

const fecharModal = () => {
  seleciona(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => (seleciona(".pizzaWindowArea").style.display = "none"), 500);
};

const botoesFechar = () => {
  selecionaTodos(
    ".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton"
  ).forEach((item) => item.addEventListener("click", fecharModal));
};

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = formatoReal(
    item.price[2]
  );
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
};

const preencheDadosModal = (item) => {
  seleciona(".pizzaBig img").src = item.img;
  seleciona(".pizzaInfo h1").innerHTML = item.name;
  seleciona(".pizzaInfo--desc").innerHTML = item.description;
  seleciona(".pizzaInfo--actualPrice").innerHTML = formatoReal(item.price[2]);
};

const pegarKey = (e) => {
  let key = e.target.closest(".pizza-item").getAttribute("data-key");
  quantPizzas = 1;
  modalKey = key;
  return key;
};

const preencherTamanhos = (key) => {
  seleciona(".pizzaInfo--size.selected").classList.remove("selected");
  selecionaTodos(".pizzaInfo--size").forEach((size, sizeIndex) => {
    sizeIndex == 2 ? size.classList.add("selected") : "";
    size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
  });
};

const escolherTamanhoPreco = (key) => {
  selecionaTodos(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
      seleciona(".pizzaInfo--size.selected").classList.remove("selected");
      size.classList.add("selected");
      seleciona(".pizzaInfo--actualPrice").innerHTML = formatoReal(
        pizzaJson[key].price[sizeIndex]
      );
    });
  });
};

const mudarQuantidade = () => {
  seleciona(".pizzaInfo--qtmais").addEventListener("click", () => {
    quantPizzas++;
    seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;
  });

  seleciona(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (quantPizzas > 1) {
      quantPizzas--;
      seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;
    }
  });
};

const adicionarNoCarrinho = () => {
  seleciona(".pizzaInfo--addButton").addEventListener("click", () => {
    let size = seleciona(".pizzaInfo--size.selected").getAttribute("data-key");
    let price = seleciona(".pizzaInfo--actualPrice").innerHTML.replace(
      "R$&nbsp;",
      ""
    );
    let identificador = pizzaJson[modalKey].id + "t" + size;
    let key = cart.findIndex((item) => item.identificador == identificador);

    if (key > -1) {
      cart[key].qt += quantPizzas;
    } else {
      let pizza = {
        identificador,
        id: pizzaJson[modalKey].id,
        size,
        qt: quantPizzas,
        price: parseFloat(price),
      };
      cart.push(pizza);
    }

    fecharModal();
    abrirCarrinho();
    atualizarCarrinho();
  });
};

const abrirCarrinho = () => {
  if (cart.length > 0) {
    seleciona("aside").classList.add("show");
    seleciona("header").style.display = "flex";
  }

  seleciona(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
      seleciona("aside").classList.add("show");
      seleciona("aside").style.left = "0";
    }
  });
};

const fecharCarrinho = () => {
  seleciona(".menu-closer").addEventListener("click", () => {
    seleciona("aside").style.left = "100vw";
    seleciona("header").style.display = "flex";
  });
};
const totalPurchaseElement = seleciona(".total-purchase span:last-child");

const atualizarTotalDaCompra = (total) => {
  totalPurchaseElement.textContent = formatoReal(total);
};

const calcularTotalDaCompra = () => {
  // Lógica para calcular o total da compra
  let total = 0;
  for (let i in cart) {
    total += cart[i].price * cart[i].qt;
  }
  return total;
};
const atualizarCarrinho = () => {
  seleciona(".menu-openner span").innerHTML = cart.length;

  if (cart.length > 0) {
    seleciona("aside").classList.add("show");
    seleciona(".cart").innerHTML = "";

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += cart[i].price * cart[i].qt;

      let cartItem = seleciona(".models .cart--item").cloneNode(true);
      seleciona(".cart").append(cartItem);

      let pizzaSizeName = cart[i].size;
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;

      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          cart[i].qt++;
          atualizarCarrinho();
        });

      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.splice(i, 1);
          }

          cart.length < 1 ? (seleciona("header").style.display = "flex") : "";
          atualizarCarrinho();
        });

      seleciona(".cart").append(cartItem);
    }

    desconto = subtotal * 0; // Alterar aqui se necessário
    total = subtotal - desconto;

    seleciona(".subtotal span:last-child").innerHTML = formatoReal(subtotal);
    seleciona(".desconto span:last-child").innerHTML = formatoReal(desconto);
    seleciona(".total span:last-child").innerHTML = formatoReal(total);

    const totalElement = seleciona(
      ".cart--totalitem.total.big span:last-child",
      ".total-purchase span:last-child"
    );
    if ((totalElement, totalPurchaseElement)) {
      totalElement.innerHTML = formatoReal(total);
      totalPurchaseElement.innerHTML = formatoReal(total);
    }
  } else {
    seleciona("aside").classList.remove("show");
    seleciona("aside").style.left = "100vw";
  }
};

const finalizarCompra = () => {
  seleciona(".cart--finalizar").addEventListener("click", () => {
    seleciona("aside").classList.remove("show");
    seleciona("aside").style.left = "100vw";
    seleciona("header").style.display = "flex";
  });
};

// MAPEAR pizzaJson para gerar lista de pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
  seleciona(".pizza-area").append(pizzaItem);

  preencheDadosDasPizzas(pizzaItem, item, index);

  pizzaItem.querySelector(".pizza-item a").addEventListener("click", (e) => {
    e.preventDefault();

    let chave = pegarKey(e);

    abrirModal();
    preencheDadosModal(item);
    preencherTamanhos(chave);
    seleciona(".pizzaInfo--qt").innerHTML = quantPizzas;
    escolherTamanhoPreco(chave);
  });

  botoesFechar();
});

mudarQuantidade();
adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho();
finalizarCompra();
