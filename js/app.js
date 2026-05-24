let cart = [];
let viewedCategories = [];

const productGrid = document.getElementById("productGrid");
const recommendGrid = document.getElementById("recommendGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const chatFab = document.getElementById("chatFab");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function renderProductCard(product, container) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML =
    '<div class="product-emoji">' +
    product.emoji +
    '</div><div class="product-body">' +
    "<h3>" +
    product.name +
    "</h3>" +
    '<span class="product-category">' +
    getCategoryLabel(product.category) +
    "</span>" +
    "<p class=\"product-price\">" +
    formatRupiah(product.price) +
    "</p>" +
  '<button type="button" data-id="' +
    product.id +
    '">+ Tambah ke Keranjang</button>' +
    "</div>";

  card.querySelector("button").addEventListener("click", () => addToCart(product.id));
  container.appendChild(card);
}

function getFilteredProducts() {
  const q = searchInput.value.toLowerCase();
  const cat = categoryFilter.value;
  return PRODUCTS.filter((p) => {
    const matchCat = cat === "semua" || p.category === cat;
    const matchSearch =
      !q || p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function renderProducts() {
  const list = getFilteredProducts();
  productGrid.innerHTML = "";
  list.forEach((p) => {
    if (!viewedCategories.includes(p.category)) viewedCategories.push(p.category);
    renderProductCard(p, productGrid);
  });
  renderRecommendations();
  updateDashboard();
}

function renderRecommendations() {
  const rec = getRecommendations(PRODUCTS, cart, viewedCategories, 4);
  recommendGrid.innerHTML = "";
  if (rec.length === 0) {
    recommendGrid.innerHTML = "<p>Tambahkan produk ke keranjang untuk melihat rekomendasi AI.</p>";
    return;
  }
  rec.forEach((p) => renderProductCard(p, recommendGrid));
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  renderRecommendations();
  updateDashboard();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);
  cartCount.textContent = totalItems;
  cartTotal.textContent = formatRupiah(totalPrice);
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML =
      "<span>" +
      item.emoji +
      " " +
      item.name +
      " x" +
      item.qty +
      "</span><span>" +
      formatRupiah(item.price * item.qty) +
      "</span>";
    cartList.appendChild(li);
  });
}

function updateDashboard() {
  document.getElementById("statProducts").textContent = PRODUCTS.length;
  document.getElementById("statCart").textContent = cart.reduce((s, c) => s + c.qty, 0);
  const revenue = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById("statRevenue").textContent = formatRupiah(revenue);

  const catCount = {};
  cart.forEach((c) => {
    catCount[c.category] = (catCount[c.category] || 0) + c.qty;
  });
  const top = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("statTopCategory").textContent = top
    ? getCategoryLabel(top[0])
    : "—";
}

function addChatMessage(text, isUser) {
  const div = document.createElement("div");
  div.className = "msg " + (isUser ? "user" : "bot");
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

cartBtn.addEventListener("click", () => cartPanel.classList.remove("hidden"));
closeCart.addEventListener("click", () => cartPanel.classList.add("hidden"));
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }
  alert("Checkout simulasi berhasil! (Demo tugas kuliah — tidak ada pembayaran nyata)");
  cart = [];
  updateCartUI();
  renderRecommendations();
  updateDashboard();
});

chatFab.addEventListener("click", () => {
  chatPanel.classList.remove("hidden");
  if (chatMessages.childElementCount === 0) {
    addChatMessage(
      "Halo! Saya asisten AI. Tanya: rekomendasi, harga, cara belanja, atau produk makanan.",
      false
    );
  }
});
closeChat.addEventListener("click", () => chatPanel.classList.add("hidden"));

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addChatMessage(text, true);
  const reply = chatbotReply(text, PRODUCTS, cart);
  addChatMessage(reply, false);
  chatInput.value = "";
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

renderProducts();

// Tampilkan badge jika dibuka dari hosting (bukan file:// lokal)
if (location.protocol === "https:" || location.hostname.includes("netlify") || location.hostname.includes("github.io")) {
  const badge = document.getElementById("liveBadge");
  if (badge) badge.classList.remove("hidden");
}
