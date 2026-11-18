<p align="center">
  <img src="icons/icon128.png" alt="AntiSpy Blur" width="96">
</p>

<h1 align="center">AntiSpy Blur for WA Web</h1>

<p align="center">
  <a href="README.md">English</a> · <b>Bahasa Indonesia</b>
</p>

---

AntiSpy Blur menyensor nama dan pesan di WhatsApp Web dari orang yang mengintip layar Anda, dan membukanya lagi saat kursor diarahkan. Dibuat dengan dua tujuan: sensor yang terasa halus, dan beban CPU serta RAM yang nyaris nol.

Sensor dikerjakan sepenuhnya oleh satu stylesheet statis. JavaScript hanya mengganti beberapa atribut di `<html>` saat pengaturan berubah; tidak ada kode yang berjalan per pesan, per chat, atau saat scroll.

## Fitur

- **Privat sejak awal.** Stylesheet dimuat sebelum halaman tampil dan langsung menyensor semuanya, jadi tidak ada teks yang sempat terlihat saat halaman dibuka.
- **Hover untuk membuka.** Secara default, mengarahkan kursor ke percakapan membuka seluruh percakapan, dan di daftar chat hanya membuka baris yang ditunjuk. Kotak balasan tidak pernah disensor.
- **Empat cakupan.** Kedua panel, daftar chat saja, pesan saja, atau nama saja.
- **Menyensor ulang sendiri.** Setelah kursor diam beberapa detik, dan setiap kali Anda pindah ke jendela lain.
- **Panic lock.** Satu shortcut menyensor semuanya dan mengabaikan hover sampai ditekan lagi.
- **Mengikuti ukuran jendela.** Aturan menempel pada struktur WhatsApp (panel, baris), bukan posisi piksel.
- **Gagal dengan aman.** Kalau WhatsApp mengubah markup-nya, extension menyensor seluruh panel daripada membiarkannya terbuka.
- **Tanpa jaringan, tanpa pelacakan, tanpa library.** Izin yang diminta hanya `storage`.

## Cara memasang

1. Unduh atau clone repository ini.
2. Buka `edge://extensions` (atau `chrome://extensions`).
3. Nyalakan **Developer mode**.
4. Klik **Load unpacked** dan pilih folder repository.
5. Buka atau muat ulang `web.whatsapp.com`.

## Pengaturan

| Pengaturan | Pilihan | Default |
|---|---|---|
| What to blur | Both · Chat list · Messages · Names only | Both |
| Reveal chat list | Hover row · Hover panel · Hold Ctrl | Hover row |
| Reveal messages | Hover panel · Hover each · Hold Ctrl | Hover panel |
| Reveal delay | 0–500 ms | 120 ms |
| Blur strength | 3–20 px | 8 px |
| Sensor ulang saat kursor diam | Off · 5s · 10s · 30s | 10s |
| Sensor ulang saat pindah jendela | On · Off | On |
| Foto dan video tetap disensor sampai di-hover | On · Off | Off |

Mengetik tidak dihitung sebagai aktivitas, jadi pesan tersensor lagi saat Anda menulis balasan panjang. Gerakkan kursor untuk membukanya kembali.

## Shortcut

| Shortcut | Fungsi |
|---|---|
| `Alt+X` | Nyalakan atau matikan sensor |
| `Alt+Shift+X` | Panic lock |

Bisa diubah di `edge://extensions/shortcuts`.

## Kalau WhatsApp update

Semua selector ada di `blur.css`. Cakupan "Names only" bergantung pada beberapa nama class buatan WhatsApp dan paling mungkin perlu diperbarui.

Proyek ini tidak berafiliasi dengan WhatsApp atau Meta.

## Lisensi

[MIT](LICENSE) © 2026 yoelkh
