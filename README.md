# 🎂 Birthday Website — Pink Aesthetic Premium

Website ulang tahun interaktif yang dibuat dengan HTML5, CSS3, dan Vanilla JavaScript. Sepenuhnya statis.

---

## 📁 Struktur Folder

```
birthday-website/
├── index.html          ← File utama + konfigurasi KONFIG di bagian atas
├── style.css           ← Semua styling (Pink Aesthetic, glassmorphism)
├── script.js           ← Semua logika interaktif
├── assets/
│   ├── images/
│   │   ├── hero.jpg          ← Foto hero (background penuh)
│   │   ├── memory1.jpg       ← Foto galeri 1
│   │   ├── memory2.jpg       ← Foto galeri 2
│   │   ├── memory3.jpg       ← Foto galeri 3
│   │   ├── memory4.jpg       ← Foto galeri 4
│   │   ├── memory5.jpg       ← Foto galeri 5
│   │   ├── memory6.jpg       ← Foto galeri 6
│   │   ├── memory7.jpg       ← Foto galeri 7
│   │   ├── memory8.jpg       ← Foto galeri 8
│   │   ├── timeline1.jpg     ← Foto timeline 1
│   │   ├── timeline2.jpg     ← Foto timeline 2
│   │   ├── timeline3.jpg     ← Foto timeline 3
│   │   └── timeline4.jpg     ← Foto timeline 4
│   └── music/                ← (opsional) folder musik
└── README.md
```

---

## ⚙️ Cara Konfigurasi

Buka `index.html` dan edit bagian `const KONFIG = { ... }` di bagian `<script>` paling atas:

```js
const KONFIG = {
  // Nama penerima hadiah
  namaPenerima: "Bintang Kecilku",

  // Judul di hero section
  judulWebsite: "Selamat Ulang Tahun! 🎂",

  // Isi surat panjang (gunakan \n\n untuk paragraf baru)
  isiSurat: `Hai kamu...`,

  // Pesan di section penutup
  pesanPenutup: "Semoga harimu selalu indah. 🌸",

  // ID video YouTube (contoh: "dQw4w9WgXcQ" dari URL youtube.com/watch?v=dQw4w9WgXcQ)
  // Kosongkan ("") jika tidak ingin ada video
  idVideoYouTube: "dQw4w9WgXcQ",

  // Data timeline — array of objects
  timeline: [
    {
      tahun: "Awal Pertemuan",
      judul: "Saat Pertama Kita Bertemu",
      deskripsi: "Deskripsi momen ini...",
      gambar: "assets/images/timeline1.jpg"   // opsional, kosongkan jika tidak ada
    },
    // tambahkan lebih banyak item sesuai kebutuhan
  ]
};
```

---

## 🖼️ Cara Menambahkan Gambar

1. Letakkan semua gambar di folder `assets/images/`
2. Pastikan nama file sesuai:
   - `hero.jpg` — foto hero (disarankan landscape, min. 1200×800px)
   - `memory1.jpg` s/d `memory8.jpg` — foto galeri
   - `timeline1.jpg` s/d `timeline4.jpg` — foto timeline
3. Jika gambar tidak ada, website otomatis menggunakan **fallback gradient pink** — tidak akan error.

---

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misal: `birthday-website`)
2. Upload semua file ke repository
3. Buka **Settings → Pages**
4. Pilih **Branch: main**, folder: `/ (root)`
5. Klik **Save**
6. Website akan tersedia di: `https://username.github.io/birthday-website/`

---

## ✨ Fitur Lengkap

| Fitur | Keterangan |
|-------|-----------|
| 🌸 Loading Screen | Animasi loading dengan progress bar |
| 💝 Welcome Screen | Layar sambutan dengan hati mengambang |
| 🦸 Hero Section | Background full-screen, fallback gradient |
| 🎵 Musik Section | Embed YouTube, pesan jika kosong |
| 📸 Galeri Section | Polaroid grid, hover effect, lightbox |
| ⏰ Timeline Section | Vertical timeline kiri-kanan bergantian |
| 💌 Surat Section | Glassmorphism card, tipografi nyaman |
| 🎊 Popup Perayaan | Floating popup ringan, confetti canvas |
| 📱 Responsive | Mobile-first, 100% responsive |
| ♿ Aksesibilitas | ARIA labels, keyboard navigation |

---

## 🎨 Color Palette

| Warna | Hex |
|-------|-----|
| Pink Muda | `#F8C8DC` |
| Pink Terang | `#FFD9E8` |
| Pink Medium | `#F7B6C2` |
| Background | `#FFF8F5` |
| Pink Dalam | `#D98FA3` |
| Teks Gelap | `#4A3A3A` |

---

## 📝 Catatan Teknis

- **Tanpa framework** — murni HTML5, CSS3, Vanilla JS
- **Tanpa build tools** — langsung buka di browser
- **Tanpa backend** — 100% static
- **Tanpa library eksternal** — semua fitur native
- **Bebas error console** — semua function terdefinisi
- **Fallback aman** — gambar tidak ada = gradient pink

---

Dibuat dengan 💖 penuh cinta. Semoga hari ulang tahunnya selalu dikenang indah! 🌸
