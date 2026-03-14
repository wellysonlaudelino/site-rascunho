// ==============================
// CARRINHO — GEEKIN
// ==============================

// Carregar carrinho salvo
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ------------------------------
// SALVAR
// ------------------------------
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ------------------------------
// CONTADOR FLUTUANTE
// ------------------------------
function atualizarContador() {
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = carrinho.length;
  }
}



// ------------------------------
// TOAST
// ------------------------------
function mostrarToast(texto) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = texto;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ------------------------------
// ADICIONAR AO CARRINHO
// ------------------------------
function adicionarAoCarrinho(nome, preco, tamanhoId, corId, qtdId) {
  const tamanho = document.getElementById(tamanhoId).value;
  const cor = document.getElementById(corId).value;
  const quantidade = parseInt(document.getElementById(qtdId).value);

  if (!tamanho || !cor || quantidade < 1) {
    mostrarToast("Selecione tamanho, cor e quantidade ⚠️");
    return;
  }

  carrinho.push({
    nome,
    preco,
    tamanho,
    cor,
    quantidade
  });

  salvarCarrinho();
  renderizarCarrinho();
  atualizarContador();
  mostrarToast("Produto adicionado ao carrinho 🛒");
}

// ------------------------------
// REMOVER ITEM
// ------------------------------
function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderizarCarrinho();
  atualizarContador();
  mostrarToast("Item removido do carrinho ❌");
}

// ------------------------------
// RENDERIZAR CARRINHO
// ------------------------------
function renderizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");

  if (!lista || !totalSpan) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "15px";

    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Cor: ${item.cor} | Tamanho: ${item.tamanho}<br>
      Qtd: ${item.quantidade} — 
      R$ ${(item.preco * item.quantidade).toFixed(2)}<br>
      <button onclick="removerItem(${index})">Remover</button>
    `;

    lista.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalSpan.textContent = total.toFixed(2);
}

// ------------------------------
// SCROLL PARA CARRINHO
// ------------------------------
function irParaCarrinho() {
  const carrinhoSection = document.getElementById("carrinho");
  if (carrinhoSection) {
    carrinhoSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ------------------------------
// FINALIZAR NO WHATSAPP
// ------------------------------
function finalizarWhatsApp() {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio 😅");
    return;
  }

  let mensagem = "🛒 *Pedido Geekin*%0A%0A";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `👕 ${item.nome}%0A`;
    mensagem += `Cor: ${item.cor} | Tamanho: ${item.tamanho}%0A`;
    mensagem += `Qtd: ${item.quantidade} — R$ ${(item.preco * item.quantidade).toFixed(2)}%0A%0A`;
    total += item.preco * item.quantidade;
  });

  mensagem += `💰 *Total: R$ ${total.toFixed(2)}*`;

  const telefone = "5541995123977";
  const textoCodificado = encodeURIComponent(mensagem);

  window.open(
    `https://wa.me/${telefone}?text=${textoCodificado}`,
    "_blank"
  );
}

// ------------------------------
// CARREGAR AO ABRIR
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrinho();
  atualizarContador();
});
