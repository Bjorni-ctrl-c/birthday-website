/* ====================================================
   BIRTHDAY WEBSITE — script.js
   Semua logic interaktif website
   ==================================================== */

/* ===== STATE GLOBAL ===== */
var timerPopup = null;         // Timer untuk menghapus popup
var canvasConfetti = null;     // Elemen canvas confetti
var ctxConfetti = null;        // Context 2D canvas
var partikelConfetti = [];     // Array partikel confetti
var animasiConfettiId = null;  // ID animasi confetti
var menuTerbuka = false;       // Status menu mobile

/* ====================================================
   INISIALISASI UTAMA
   ==================================================== */
function inisialisasiAplikasi() {
  // Jalankan loading screen lalu tampilkan welcome screen
  jalankanLoading();
}

/* ====================================================
   LOADING SCREEN
   ==================================================== */
function jalankanLoading() {
  var bar = document.getElementById('loadingBar');
  var persen = 0;
  var interval = setInterval(function () {
    persen += Math.random() * 12 + 4;
    if (persen >= 100) {
      persen = 100;
      clearInterval(interval);
      setTimeout(selesaiLoading, 400);
    }
    if (bar) bar.style.width = Math.min(persen, 100) + '%';
  }, 120);
}

function selesaiLoading() {
  var layarLoading = document.getElementById('loadingScreen');
  var layarWelcome = document.getElementById('welcomeScreen');

  if (!layarLoading || !layarWelcome) return;

  // Fade out loading screen
  layarLoading.classList.add('fade-out');
  setTimeout(function () {
    layarLoading.classList.add('hidden');
    // Tampilkan welcome screen
    layarWelcome.classList.remove('hidden');
    // Buat hati mengambang di background welcome
    buatHatiMengambang();
  }, 650);
}

/* ====================================================
   HATI MENGAMBANG (WELCOME SCREEN)
   ==================================================== */
function buatHatiMengambang() {
  var wadah = document.getElementById('floatingHeartsBg');
  if (!wadah) return;

  var emojiHati = ['💖', '💕', '🌸', '💗', '✨', '💝', '🌺', '💓'];

  for (var i = 0; i < 18; i++) {
    (function (indeks) {
      var elemen = document.createElement('span');
      elemen.classList.add('hati-mengambang');
      elemen.setAttribute('aria-hidden', 'true');
      elemen.textContent = emojiHati[indeks % emojiHati.length];

      var posisiKiri = Math.random() * 100;
      var durasi     = Math.random() * 8 + 8;
      var tundaan    = Math.random() * 10;
      var ukuran     = Math.random() * 0.8 + 0.8;

      elemen.style.left      = posisiKiri + '%';
      elemen.style.animationDuration = durasi + 's';
      elemen.style.animationDelay   = '-' + tundaan + 's';
      elemen.style.fontSize  = ukuran + 'rem';
      elemen.style.opacity   = (Math.random() * 0.4 + 0.3).toString();

      wadah.appendChild(elemen);
    })(i);
  }
}

/* ====================================================
   BUKA HADIAH (dari Welcome ke Konten Utama)
   ==================================================== */
function bukaHadiah() {
  var layarWelcome = document.getElementById('welcomeScreen');
  var konten       = document.getElementById('kontenUtama');

  if (!layarWelcome || !konten) return;

  // Efek fade-out welcome screen
  layarWelcome.classList.add('fade-out');

  setTimeout(function () {
    layarWelcome.classList.add('hidden');
    konten.classList.remove('hidden');

    // Inisialisasi semua komponen
    inisialisasiHero();
    inisialisasiNavigasi();
    inisialisasiMusik();
    inisialisasiGaleri();
    inisialisasiTimeline();
    inisialisasiSurat();
    inisialisasiPenutup();
    inisialisasiPerayaan();
    inisialisasiScrollReveal();
    inisialisasiBackToTop();
    inisialisasiPartikelHero();

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 600);
}

/* ====================================================
   INISIALISASI HERO
   ==================================================== */
function inisialisasiHero() {
  // Set judul dan nama dari konfigurasi
  var elJudul = document.getElementById('heroJudul');
  var elNama  = document.getElementById('heroNama');

  if (elJudul) elJudul.textContent = KONFIG.judulWebsite || 'Happy Birthday!';
  if (elNama)  elNama.textContent  = KONFIG.namaPenerima || 'Alya';

  // Set background hero dari gambar
  var elBg = document.getElementById('heroBg');
  if (elBg) {
    elBg.style.backgroundImage = 'url(assets/images/hero.jpg)';
    elBg.style.backgroundSize = 'cover';
    elBg.style.backgroundPosition = KONFIG.posisiFotoHero || 'center center';
  }
}

/* ====================================================
   PARTIKEL MENGAMBANG DI HERO
   ==================================================== */
function inisialisasiPartikelHero() {
  var wadah = document.getElementById('heroParticles');
  if (!wadah) return;

  var emojiPartikel = ['🌸', '✨', '💖', '🌺', '💕', '🎀', '⭐'];

  for (var i = 0; i < 14; i++) {
    (function (indeks) {
      var elemen = document.createElement('span');
      elemen.classList.add('partikel');
      elemen.setAttribute('aria-hidden', 'true');
      elemen.textContent = emojiPartikel[indeks % emojiPartikel.length];

      var posisiKiri = Math.random() * 100;
      var durasi     = Math.random() * 10 + 10;
      var tundaan    = '-' + (Math.random() * 15) + 's';
      var ukuran     = Math.random() * 0.7 + 0.7;

      elemen.style.left              = posisiKiri + '%';
      elemen.style.animationDuration = durasi + 's';
      elemen.style.animationDelay    = tundaan;
      elemen.style.fontSize          = ukuran + 'rem';

      wadah.appendChild(elemen);
    })(i);
  }
}

/* ====================================================
   INISIALISASI NAVIGASI
   ==================================================== */
function inisialisasiNavigasi() {
  // Smooth scroll untuk semua link anchor
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 72; // tinggi navbar
        var posisi = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: posisi, behavior: 'smooth' });
      }
    });
  });
}

/* Buka/tutup menu hamburger mobile */
function toggleMenu() {
  var navLinks = document.getElementById('navLinks');
  if (!navLinks) return;
  menuTerbuka = !menuTerbuka;
  if (menuTerbuka) {
    navLinks.classList.add('buka');
  } else {
    navLinks.classList.remove('buka');
  }
}

function tutupMenu() {
  var navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('buka');
  menuTerbuka = false;
}

/* ====================================================
   INISIALISASI MUSIK
   ==================================================== */
function inisialisasiMusik() {
  var kartu = document.getElementById('musikCard');
  if (!kartu) return;

  var idVideo = KONFIG.idVideoYouTube ? KONFIG.idVideoYouTube.trim() : '';

  if (!idVideo) {
    // Tampilkan pesan jika video tidak tersedia
    kartu.innerHTML =
      '<div class="musik-kosong">' +
        '<div class="ikon-musik">🎵</div>' +
        '<p>Video musik tidak tersedia.<br/>Silakan tambahkan ID video YouTube di konfigurasi.</p>' +
      '</div>';
    return;
  }

  // Embed YouTube
  kartu.innerHTML =
    '<div style="text-align:center;padding:32px 24px;">' +
      '<div style="font-size:3.5rem;margin-bottom:16px;">🎵</div>' +
      '<p style="font-weight:600;color:var(--dark);margin-bottom:8px;">Lagu Spesial Untukmu</p>' +
      '<p style="font-size:.88rem;color:var(--dark-soft);margin-bottom:24px;">Klik untuk memutar musik istimewa ini 🎶</p>' +
      '<button onclick="bukaPopupVideo(\'' + idVideo + '\')" class="btn-utama">▶ Putar Musik</button>' +
    '</div>';
}

/* ====================================================
   INISIALISASI GALERI
   ==================================================== */
function inisialisasiGaleri() {
  var wadah = document.getElementById('galeriGrid');
  if (!wadah) return;

  // Daftar keterangan dan nama file gambar galeri
  var dataGaleri = [
    { src: 'assets/images/memory1.jpg', ket: 'PRETTY 💕' },
    { src: 'assets/images/memory2.jpg', ket: 'ELEGANT ✨'    },
    { src: 'assets/images/memory3.jpg', ket: 'CUTE 😊'     },
    { src: 'assets/images/memory4.jpg', ket: 'SWEET 🌸' },
    { src: 'assets/images/memory5.jpg', ket: 'LOVELY 💖'   },
    { src: 'assets/images/memory6.jpg', ket: 'GORGEOUS🌺'    },
    { src: 'assets/images/memory7.jpg', ket: 'CHARMING 🎀'     },
    { src: 'assets/images/memory8.jpg', ket: 'ADORABLE 💝'      }
  ];

  var html = '';
  for (var i = 0; i < dataGaleri.length; i++) {
    var item = dataGaleri[i];
    var indeks = i;
    // Buat polaroid card
    html +=
      '<div class="polaroid reveal-up" ' +
           'onclick="bukaLightbox(\'' + item.src + '\', \'' + item.ket.replace(/'/g, "\\'") + '\')" ' +
           'role="button" tabindex="0" ' +
           'aria-label="Buka foto: ' + item.ket.replace(/"/g, '&quot;') + '" ' +
           'onkeydown="if(event.key===\'Enter\'||event.key===\' \')bukaLightbox(\'' + item.src + '\',\'' + item.ket.replace(/'/g, "\\'") + '\')">' +
        '<img class="polaroid-gambar" ' +
             'src="' + item.src + '" ' +
             'alt="' + item.ket.replace(/"/g, '&quot;') + '" ' +
             'onerror="this.style.background=\'linear-gradient(135deg, #F8C8DC, #FFD9E8)\'; this.src=\'\';" ' +
             'loading="lazy" />' +
        '<p class="polaroid-label">' + item.ket + '</p>' +
      '</div>';
  }

  wadah.innerHTML = html;
}

/* ====================================================
   LIGHTBOX
   ==================================================== */
function bukaLightbox(src, keterangan) {
  var lightbox = document.getElementById('lightbox');
  var gambar   = document.getElementById('lightboxGambar');
  var ket      = document.getElementById('lightboxKeterangan');

  if (!lightbox || !gambar) return;

  gambar.src = src;
  gambar.alt = keterangan || 'Foto kenangan';
  if (ket) ket.textContent = keterangan || '';

  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Fokus ke lightbox untuk aksesibilitas
  lightbox.focus();
}

function tutupLightbox(event) {
  // Tutup saat klik latar atau tombol tutup (bukan gambar)
  if (event && event.target === document.getElementById('lightboxGambar')) return;

  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ====================================================
   INISIALISASI TIMELINE
   ==================================================== */
function inisialisasiTimeline() {
  var wadah = document.getElementById('timelineWrap');
  if (!wadah) return;

  var data = KONFIG.timeline;
  if (!data || !data.length) {
    wadah.innerHTML = '<p style="text-align:center;color:var(--dark-soft);font-style:italic;">Belum ada data timeline.</p>';
    return;
  }

  var html = '';
  var emojiTitik = ['💖', '🌸', '✨', '🎀', '💕', '🌺'];

  for (var i = 0; i < data.length; i++) {
    var item  = data[i];
    var emoji = emojiTitik[i % emojiTitik.length];

    // Konten kartu timeline
    var isiKartu =
      '<div class="timeline-card">' +
        '<div class="timeline-tahun">' + (item.tahun || '') + '</div>' +
        '<div class="timeline-judul">' + (item.judul || '') + '</div>' +
        '<p class="timeline-deskripsi">' + (item.deskripsi || '') + '</p>' +
        (item.gambar
          ? '<img class="timeline-img" src="' + item.gambar + '" ' +
              'alt="' + (item.judul || 'Foto timeline').replace(/"/g, '&quot;') + '" ' +
              'loading="lazy" ' +
              'onerror="this.style.background=\'linear-gradient(135deg,#F8C8DC,#FFD9E8)\'; this.src=\'\'; this.alt=\'Foto belum tersedia\';" />'
          : '<div class="timeline-img" style="background:linear-gradient(135deg,#F8C8DC,#FFD9E8);display:flex;align-items:center;justify-content:center;font-size:2rem;">📸</div>') +
      '</div>';

    // Kiri-kanan bergantian
    html +=
      '<div class="timeline-item">' +
        '<div class="timeline-titik" aria-hidden="true">' + emoji + '</div>' +
        '<div class="timeline-konten tl-kanan">' + isiKartu + '</div>' +
      '</div>';
  }

  wadah.innerHTML = html;
}

/* ====================================================
   INISIALISASI SURAT
   ==================================================== */
function inisialisasiSurat() {
  var elSurat = document.getElementById('suratIsi');
  if (!elSurat) return;

  var isi = KONFIG.isiSurat || 'Belum ada isi surat.';

  // Pecah berdasarkan baris baru, bungkus tiap paragraf
  var paragraf = isi.split('\n\n');
  var html = '';
  for (var i = 0; i < paragraf.length; i++) {
    var baris = paragraf[i].trim();
    if (baris) {
      html += '<p>' + baris.replace(/\n/g, '<br/>') + '</p>';
    }
  }
  elSurat.innerHTML = html || '<p>' + isi + '</p>';
}

/* ====================================================
   INISIALISASI PENUTUP
   ==================================================== */
function inisialisasiPenutup() {
  var elPenutup = document.getElementById('penutupPesan');
  if (!elPenutup) return;
  elPenutup.textContent = KONFIG.pesanPenutup || 'Terima kasih sudah hadir di hidupku. 💖';
}

/* ====================================================
   INISIALISASI SCROLL REVEAL
   ==================================================== */
function inisialisasiScrollReveal() {
  // Gunakan IntersectionObserver jika tersedia
  if (!('IntersectionObserver' in window)) {
    // Fallback: tampilkan semua langsung
    var semua = document.querySelectorAll('.reveal-up, .timeline-item');
    for (var i = 0; i < semua.length; i++) {
      semua[i].classList.add('terlihat');
    }
    return;
  }

  var opsi = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('terlihat');
        observer.unobserve(entry.target);
      }
    });
  }, opsi);

  // Observe semua elemen yang perlu reveal
  var elemen = document.querySelectorAll('.reveal-up, .timeline-item');
  elemen.forEach(function (el) {
    observer.observe(el);
  });
}

/* ====================================================
   INISIALISASI BACK TO TOP
   ==================================================== */
function inisialisasiBackToTop() {
  window.addEventListener('scroll', function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    if (window.pageYOffset > 400) {
      btn.classList.remove('hidden');
      btn.classList.add('terlihat');
    } else {
      btn.classList.add('hidden');
      btn.classList.remove('terlihat');
    }
  });
}

function scrollKeAtas() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====================================================
   INISIALISASI PERAYAAN
   ==================================================== */
function inisialisasiPerayaan() {
  // Buat canvas confetti
  if (!document.getElementById('confettiCanvas')) {
    canvasConfetti = document.createElement('canvas');
    canvasConfetti.id = 'confettiCanvas';
    canvasConfetti.setAttribute('aria-hidden', 'true');
    canvasConfetti.style.position = 'fixed';
    canvasConfetti.style.inset    = '0';
    canvasConfetti.style.width    = '100%';
    canvasConfetti.style.height   = '100%';
    canvasConfetti.style.pointerEvents = 'none';
    canvasConfetti.style.zIndex   = '9400';
    canvasConfetti.style.display  = 'none';
    document.body.appendChild(canvasConfetti);
    ctxConfetti = canvasConfetti.getContext('2d');
  }
}

/* ====================================================
   POPUP ULANG TAHUN — FUNGSI UTAMA
   ==================================================== */
function tampilkanPopupUlangTahun() {
  // Hentikan timer sebelumnya jika ada
  if (timerPopup) {
    clearTimeout(timerPopup);
    timerPopup = null;
  }

  // Reset popup jika sedang dalam keadaan hilang
  var popup = document.getElementById('popupPerayaan');
  if (!popup) return;
  popup.classList.remove('hilang');
  popup.classList.remove('hidden');
  popup.classList.add('tampil');

  // Isi emoji di popup
  jalankanEmosiEmoji();

  // Mulai confetti dan efek perayaan
  mulaiConfetti();

  // Otomatis hilangkan setelah 2.8 detik
  timerPopup = setTimeout(function () {
    sembunyikanPopup();
  }, 2800);
}

/* ====================================================
   SEMBUNYIKAN POPUP (FADE OUT)
   ==================================================== */
function sembunyikanPopup() {
  var popup = document.getElementById('popupPerayaan');
  if (!popup) return;

  popup.classList.add('hilang');
  setTimeout(function () {
    popup.classList.add('hidden');
    popup.classList.remove('tampil');
    popup.classList.remove('hilang');
  }, 380);

  // Hentikan confetti
  setTimeout(function () {
    hentikanConfetti();
  }, 1200);
}

/* ====================================================
   JALANKAN ANIMASI EMOJI DI POPUP
   ==================================================== */
function jalankanEmosiEmoji() {
  var wadah = document.getElementById('popupEmoji');
  if (!wadah) return;

  var daftarEmoji = ['🎉', '🎊', '❤️', '💖', '✨', '🎂', '🎁', '🌸'];
  wadah.textContent = daftarEmoji.join(' ');
}

/* ====================================================
   MULAI CONFETTI
   ==================================================== */
function mulaiConfetti() {
  if (!canvasConfetti || !ctxConfetti) return;

  // Set ukuran canvas
  canvasConfetti.width  = window.innerWidth;
  canvasConfetti.height = window.innerHeight;
  canvasConfetti.style.display = 'block';

  // Buat partikel confetti baru
  partikelConfetti = [];
  var warnaConfetti = ['#F8C8DC', '#FFD9E8', '#F7B6C2', '#D98FA3', '#FFB7C5', '#FF8FAB', '#FFDDE8'];

  for (var i = 0; i < 80; i++) {
    partikelConfetti.push({
      x:       Math.random() * canvasConfetti.width,
      y:       Math.random() * canvasConfetti.height - canvasConfetti.height,
      lebar:   Math.random() * 10 + 5,
      tinggi:  Math.random() * 6 + 3,
      warna:   warnaConfetti[Math.floor(Math.random() * warnaConfetti.length)],
      sudut:   Math.random() * 360,
      kecepatan: Math.random() * 3 + 2,
      oscillasi: Math.random() * 3 - 1.5,
      faseOsc: Math.random() * Math.PI * 2,
      putaran:  Math.random() * 6 - 3
    });
  }

  // Mulai animasi
  if (animasiConfettiId) {
    cancelAnimationFrame(animasiConfettiId);
  }
  animasiFrame();
}

/* ===== LOOP ANIMASI CONFETTI ===== */
function animasiFrame() {
  if (!canvasConfetti || !ctxConfetti) return;
  ctxConfetti.clearRect(0, 0, canvasConfetti.width, canvasConfetti.height);

  var masihAda = false;

  for (var i = 0; i < partikelConfetti.length; i++) {
    var p = partikelConfetti[i];

    p.y       += p.kecepatan;
    p.x       += p.oscillasi;
    p.sudut   += p.putaran;
    p.faseOsc += 0.05;

    if (p.y < canvasConfetti.height + 20) {
      masihAda = true;
    }

    ctxConfetti.save();
    ctxConfetti.translate(p.x, p.y);
    ctxConfetti.rotate((p.sudut * Math.PI) / 180);
    ctxConfetti.fillStyle = p.warna;
    ctxConfetti.globalAlpha = Math.max(0, 1 - p.y / canvasConfetti.height);
    ctxConfetti.fillRect(-p.lebar / 2, -p.tinggi / 2, p.lebar, p.tinggi);
    ctxConfetti.restore();
  }

  if (masihAda) {
    animasiConfettiId = requestAnimationFrame(animasiFrame);
  } else {
    hentikanConfetti();
  }
}

/* ====================================================
   HENTIKAN CONFETTI
   ==================================================== */
function hentikanConfetti() {
  if (animasiConfettiId) {
    cancelAnimationFrame(animasiConfettiId);
    animasiConfettiId = null;
  }
  if (ctxConfetti && canvasConfetti) {
    ctxConfetti.clearRect(0, 0, canvasConfetti.width, canvasConfetti.height);
  }
  if (canvasConfetti) {
    canvasConfetti.style.display = 'none';
  }
  partikelConfetti = [];
}

function bukaPopupVideo(idVideo) {
  var existing = document.getElementById('popupVideo');
  if (existing) existing.remove();

  var modal = document.createElement('div');
  modal.id = 'popupVideo';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(74,58,58,.85);backdrop-filter:blur(8px);z-index:9100;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .25s ease;';
  modal.innerHTML =
    '<div style="position:relative;width:100%;max-width:780px;">' +
      '<button onclick="tutupPopupVideo()" style="position:absolute;top:-44px;right:0;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:1.8rem;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>' +
      '<div style="position:relative;padding-bottom:56.25%;height:0;border-radius:16px;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.4);">' +
        '<iframe src="https://www.youtube.com/embed/' + idVideo + '?autoplay=1&rel=0" style="position:absolute;inset:0;width:100%;height:100%;border:none;" allow="autoplay;encrypted-media" allowfullscreen></iframe>' +
      '</div>' +
    '</div>';
  modal.addEventListener('click', function(e){ if(e.target===modal) tutupPopupVideo(); });
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function tutupPopupVideo() {
  var modal = document.getElementById('popupVideo');
  if (modal) modal.remove();
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (document.getElementById('popupVideo')) { tutupPopupVideo(); return; }
    var lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
      tutupLightbox();
    }
    // Tutup menu mobile
    tutupMenu();
  }
});

/* ====================================================
   RESIZE CANVAS CONFETTI SAAT WINDOW RESIZE
   ==================================================== */
window.addEventListener('resize', function () {
  if (canvasConfetti && canvasConfetti.style.display !== 'none') {
    canvasConfetti.width  = window.innerWidth;
    canvasConfetti.height = window.innerHeight;
  }
});

/* ====================================================
   MULAI APLIKASI SAAT DOM SIAP
   ==================================================== */
document.addEventListener('DOMContentLoaded', function () {
  inisialisasiAplikasi();
});
