/**
 * Modul AI sederhana untuk tugas Dasar-dasar AI
 * 1. Chatbot rule-based (pencocokan kata kunci)
 * 2. Rekomendasi produk berbasis skor
 */

function chatbotReply(userText, products, cart) {
  const t = userText.toLowerCase().trim();

  if (!t) {
    return "Silakan ketik pertanyaan Anda. Contoh: \"rekomendasi makanan\" atau \"cara belanja\".";
  }

  if (/(halo|hai|hello|hi)\b/.test(t)) {
    return "Halo! Saya asisten AI ManajemenMart. Saya bisa membantu tentang produk, harga, cara belanja, dan rekomendasi.";
  }

  if (/(cara belanja|bagaimana beli|how to buy)/.test(t)) {
    return "Cara belanja: (1) Pilih produk di katalog, (2) Klik Tambah ke Keranjang, (3) Buka ikon keranjang, (4) Checkout simulasi. Ini demo untuk tugas kuliah Anda.";
  }

  if (/(rekomendasi|sarankan|recommend)/.test(t)) {
    const rec = getRecommendations(products, cart, [], 3);
    if (rec.length === 0) return "Belum ada rekomendasi. Coba tambahkan produk ke keranjang dulu.";
    const names = rec.map((p) => p.name).join(", ");
    return "Rekomendasi AI untuk Anda: " + names + ". Lihat juga bagian \"Rekomendasi Untuk Anda\" di halaman.";
  }

  if (/(harga|berapa|murah|mahal)/.test(t)) {
    const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
    const expensive = [...products].sort((a, b) => b.price - a.price)[0];
    return (
      "Rentang harga di toko kami: termurah " +
      cheapest.name +
      " (" +
      formatRupiah(cheapest.price) +
      "), termahal " +
      expensive.name +
      " (" +
      formatRupiah(expensive.price) +
      ")."
    );
  }

  if (/(makanan|kopi|keripik)/.test(t)) {
    const list = products.filter((p) => p.category === "makanan").slice(0, 3);
    return "Produk makanan: " + list.map((p) => p.name + " " + formatRupiah(p.price)).join("; ") + ".";
  }

  if (/(manajemen|umkm|bisnis)/.test(t)) {
    return "ManajemenMart mengintegrasikan konsep manajemen (katalog, keranjang, dashboard omzet) dengan AI (chatbot & rekomendasi) untuk mendukung UMKM.";
  }

  if (/(terima kasih|makasih)/.test(t)) {
    return "Sama-sama! Semoga tugas Dasar-dasar AI Anda lancar.";
  }

  return (
    "Maaf, saya belum memahami pertanyaan itu. Coba tanya: \"rekomendasi\", \"harga\", \"cara belanja\", atau \"produk makanan\"."
  );
}

/**
 * Sistem rekomendasi sederhana:
 * - Skor +3 jika kategori sama dengan item di keranjang
 * - Skor +2 jika kategori pernah dilihat user
 * - Skor +1 jika produk belum ada di keranjang
 */
function getRecommendations(products, cart, viewedCategories, limit = 4) {
  const cartIds = new Set(cart.map((c) => c.id));
  const cartCategories = [...new Set(cart.map((c) => c.category))];

  const scored = products
    .filter((p) => !cartIds.has(p.id))
    .map((p) => {
      let score = 0;
      if (cartCategories.includes(p.category)) score += 3;
      if (viewedCategories.includes(p.category)) score += 2;
      score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
