// Ajuda: manipulação DOM, eventos, validação e cálculo IMC
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano do footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu toggle mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  toggle && toggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? '' : 'block';
  });

  // IMC - lógica e exibição
  const imcForm = document.getElementById('imcForm');
  const imcResult = document.getElementById('imcResult');
  imcForm && imcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    if (!h || !w || h <= 0 || w <= 0) {
      imcResult.textContent = 'Informe altura e peso válidos.';
      return;
    }
    const imc = w / (h * h);
    let category = '';
    if (imc < 18.5) category = 'Abaixo do peso';
    else if (imc < 25) category = 'Peso normal';
    else if (imc < 30) category = 'Sobrepeso';
    else category = 'Obesidade';
    imcResult.innerHTML = `IMC: <strong>${imc.toFixed(1)}</strong> — ${category}`;
  });

  // Form inscrição - validação simples e feedback
  const enrollForm = document.getElementById('enrollForm');
  const enrollMessage = document.getElementById('enrollMessage');
  enrollForm && enrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const plan = document.getElementById('plan').value;
    const terms = document.getElementById('terms').checked;
    if (name.length < 3) {
      enrollMessage.textContent = 'Digite um nome válido.';
      enrollMessage.style.color = '#ffb3a7';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      enrollMessage.textContent = 'E-mail inválido.';
      enrollMessage.style.color = '#ffb3a7';
      return;
    }
    if (!plan) {
      enrollMessage.textContent = 'Escolha um plano.';
      enrollMessage.style.color = '#ffb3a7';
      return;
    }
    if (!terms) {
      enrollMessage.textContent = 'É necessário aceitar os termos.';
      enrollMessage.style.color = '#ffb3a7';
      return;
    }
    // Simula envio e mostra resumo
    enrollMessage.style.color = '#baf7d3';
    enrollMessage.innerHTML = `Obrigado, <strong>${name}</strong>! Inscrição recebida para o plano <strong>${plan}</strong>. Entraremos em contato pelo e-mail ${email}.`;
    enrollForm.reset();
  });

  // Galeria - clique para ampliar (simples)
  const gallery = document.getElementById('galleryGrid');
  if (gallery) {
    gallery.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const src = e.target.src;
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = 0;
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 9999;
        const img = document.createElement('img');
        img.src = src;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.borderRadius = '8px';
        overlay.appendChild(img);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
      }
    });
  }
});

// Funcionadade do carrinho
const cart = [];
function addToCart(planName, price) {
  cart.push({ name: planName, price });
  updateCart();
}
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} — R$ ${item.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: R$ ${total}`;
}
function clearCart() {
  cart.length = 0;
  updateCart();
}
