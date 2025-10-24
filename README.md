# 🌐 Website Pelayanan Optimal Stunting

**Website Pusat Optimalisasi Stunting (POS)** adalah platform berbasis web yang dikembangkan untuk mendukung upaya pencegahan dan penanganan stunting di Indonesia. Website ini menyediakan pusat informasi, edukasi, serta sarana kolaborasi antara dokter spesialis anak dan bidan.

---

## Fitur Utama

- 🧮 Kalkulator Stunting
- 📰 Blog Edukasi
- 💊 Medis
- 🎥 Playlist Video Edukasi

---

## Cara Menjalankan Proyek
1. Clone repositori
   ```bash
   https://github.com/aryavidyananta/Website_Stunting.git
2. Masuk ke folder proyek:
   ```bash
   cd Website_Stunting
3. Install depedencies
   ```bash
   npm install
4. Run Webiste
   ```bash
   npm run dev
### Setup Backend (API)
5. Masuk ke folder backend api_stunting melalui terminal/cmd.
   ```bash
   cd api_stunting
6. Buat File .env di dalam Folder api_stunting, lalu isi file .env dengan code berikut:
   ```bash
   DB_HOST=localhost
   DB_NAME=pos
   DB_USER=root
   DB_PASSWORD=
   DB_POOLNAME=db_library_pool
   POOL_SIZE=10
   SECRET_KEY=supersecretkey
   JWT_SECRET_KEY=superjwtsecretkey
7. Setup Database
   - Aktifkan XAMPP/Laragon
   - Buat database baru dengan nama: pos
   - Import file db_pos.sql yang ada di folder: api-stunting/stuff/db_pos.sql ke db pos
9. Jalankan Backend (API) diterminal/cmd.
   ```bash
   flask run --debug --host=0.0.0.0
### Konfigurasi Koneksi Frontend ke Backend
9. Buka File .env.development di Folder Website_Stunting
10. Ubah isi VITE_REACT_APP_API_URL sesuai IP yang muncul saat menjalankan backend, misalnya:
    ```bash
    VITE_REACT_APP_API_URL= http://192.162.18.10:5000

Gunakan IP lokal dari hasil flask run, contoh:
http://127.0.0.1:5000 (untuk akses lokal)
http://192.168.xx.xx:5000 (untuk akses dari perangkat lain di jaringan yang sama)


<div align="center">

## Dikembangkan oleh Tim Blackhex

## Tim Pengembang
  I Putu Arya Vidyananta  
  Gede Yudha Ardyaputra  
  Kadek Gandi Taruna Wijaya  
  Putu Devandra Radiastu Putra  

Terima kasih telah menggunakan dan mendukung proyek ini.  
Semua hak cipta dan kontribusi dimiliki oleh **Tim Blackhex**.  

---

</div>
   
