/** Data produk UMKM — contoh untuk marketplace manajemen */
const PRODUCTS = [
  { id: 1, name: "Keripik Tempe Organik", category: "makanan", price: 25000, emoji: "🥔", seller: "UMKM Sleman" },
  { id: 2, name: "Kopi Robusta Gayo", category: "makanan", price: 45000, emoji: "☕", seller: "Koperasi Mahasiswa" },
  { id: 3, name: "Tas Ecoprint Batik", category: "fashion", price: 120000, emoji: "👜", seller: "Craft UMY" },
  { id: 4, name: "Kaos Kampus Manajemen", category: "fashion", price: 85000, emoji: "👕", seller: "HIMA Manajemen" },
  { id: 5, name: "Konsultasi Bisnis UMKM (1 jam)", category: "jasa", price: 150000, emoji: "💼", seller: "Dosen & Praktisi" },
  { id: 6, name: "Jasa Desain Logo", category: "jasa", price: 200000, emoji: "🎨", seller: "Mahasiswa Desain" },
  { id: 7, name: "Template Laporan Keuangan Excel", category: "digital", price: 35000, emoji: "📊", seller: "Lab Manajemen" },
  { id: 8, name: "E-Book Manajemen Operasional", category: "digital", price: 50000, emoji: "📘", seller: "Perpustakaan Digital" },
  { id: 9, name: "Brownies Cokelat Premium", category: "makanan", price: 35000, emoji: "🍫", seller: "UMKM Kotagede" },
  { id: 10, name: "Dompet Kulit Lokal", category: "fashion", price: 95000, emoji: "👛", seller: "Pengrajin Bantul" },
  { id: 11, name: "Pelatihan Digital Marketing", category: "jasa", price: 175000, emoji: "📱", seller: "Career Center UMY" },
  { id: 12, name: "Checklist Manajemen Inventori", category: "digital", price: 25000, emoji: "✅", seller: "Prodi Manajemen" },
];

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function getCategoryLabel(cat) {
  const labels = {
    makanan: "Makanan & Minuman",
    fashion: "Fashion & Kerajinan",
    jasa: "Jasa & Konsultasi",
    digital: "Produk Digital",
  };
  return labels[cat] || cat;
}
