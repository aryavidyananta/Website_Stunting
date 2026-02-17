-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Jan 2025 pada 08.30
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `blog`
--

CREATE TABLE `blog` (
  `Id_Blog` int(100) NOT NULL,
  `Judul` varchar(100) NOT NULL,
  `Deskripsi` text NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `Gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `blog`
--

INSERT INTO `blog` (`Id_Blog`, `Judul`, `Deskripsi`, `tanggal`, `Gambar`) VALUES
(5, 'Stunting', '<p>Stunting adalah masalah global dan bukan saja masalah regional ataupun satu negara saja. Permasalahan baik penyebab maupun penanggulangannya sangatlah kompleks. Memerlukan pemetaan yang komprehensif mulai dari pra kehamilan sampai pada anak usia 5 tahun, inilah rentang usia yang paling rentan terserang kasus stunting.</p><p>Hasil Pantauan Status Gizi (PSG) tahun 2017 mencatat bahwa prevalensi Balita yang mengalami stunting sebesar 29,6% lebih tinggi dari tahun sebelumnya yang hanya 27,5%. Namun pada 2019, stunting ditargetkan turun menjadi 28%.</p><p>Stunting merupakan masalah kurang gizi kronis akibat asupan gizi yang kurang sehingga tinggi badan bayi di bawah standar menurut usianya/pendek. WHO menyatakan batas maksimal angka stunting bayi di suatu negara adalah 20%. Ini artinya stunting balita di Indonesia saat ini masih di atas batas toleransi yang ditetapkan oleh Badan Kesehatan Dunia tersebut.</p><p>Stunting tidak hanya berdampak pada perekonomian namun juga menentukan maju atau tidaknya suatu negara. Stunting tidak hanya membuat orang tidak bisa tumbuh tinggi dengan normal namun berpengaruh juga pada pertumbuhan otak. Ini artinya, ia akan berdampak pada kondisi kesehatan sehingga menyebabkan biaya hidup yang mahal. Angka pendapatan pekerja dewasa pun bisa tergerus hingga 20%. Selain itu, stunting juga berkontribusi pada melebarnya kesenjangan yang dapat mengurangi 10% dari total pendapatan seumur hidup seseorang dan menyebabkan kemiskinan antar-generasi.</p><p>Terjadinya stunting disebabkan berbagai macam faktor dan tidak hanya disebabkan oleh gizi buruk yang dialami oleh ibu hamil atau anak balita. Beberapa faktor yang paling berpengaruh terjadinya stunting di antaranya:</p><p>Pertama, praktik pengasuhan yang tidak baik terhadap balita dan anak. Hal ini biasanya disebabkan karena kurangnya pengetahuan tentang gizi pada pra kehamilan, masa kehamilan dan setelah melahirkan, dari para orang tua. Pentingnya ASI (Air Susu Ibu) adalah contoh sederhananya. Banyak kasus di mana balita yang tidak mendapatkan ASI secara memadai karena kurangnya pengetahuan tentang betapa pentingnya ASI bagi bayi.</p><p>Kedua, terbatasnya layanan kesehatan, termasuk layanan ante natal care (ANC), post natal dan pembelajaran dini yang berkualitas.</p><p>Ketiga, kurangnya akses kepada makanan bergizi. Di Indonesia banyak ditemui ibu hamil yang mengalami anemia (kekurangan hemoglobin darah), karena makanan bergizi yang tidak terjangkau. Kurangnya usaha untuk memenuhi gizi dengan memanfaatkan kondisi lingkungan juga termasuk di dalam faktor ini.</p><p>Keempat, kurangnya akses ke air bersih dan sanitasi. Hingga saat ini masih banyak daerah yang kesulitan mengakses air bersih untuk kebutuhan sehari-hari. Selain itu kita juga masih menemui perilaku masyarakat yang membuang kotoran di tempat terbuka. Ini juga mempengaruhi kualitas air bersih yang pada gilirannya berpengaruh terhadap kesehatan anak.</p><p>Beberapa intervensi dan penanganan termasuk pencegahan yang dapat dilakukan dan sudah dilakukan, diantaranya:</p><p>Pertama, intervensi stunting gizi spesifik. Program intervensi ini ditujukan kepada anak dalam 1.000 Hari Pertama Kehidupan (HPK) dan berkontribusi pada 30% penurunan stunting. Kerangka kegiatan intervensi gizi spesifik umumnya dilakukan pada sektor kesehatan, misalnya program memberikan makanan tambahan (PMT) pada ibu hamil. Tujuannya adalah untuk mengatasi kekurangan protein kronis, kekurangan zat besi dan asam folat, kekurangan iodium dan menanggulangi cacingan pada ibu hamil serta melindungi dari malaria.</p><p>Selain itu, intervensi juga dilakukan dengan sasaran ibu menyusui dan anak usia 0-6 bulan. Kegiatan ini dilakukan dengan mendorong inisiasi menyusui dini (IMD) terutama melalui pemberian ASI jolong (colostrum) serta mendorong pemberian ASI eksklusif. Ada juga intervensi gizi spesifik dengan sasaran ibu menyusui dan anak usia 7-23 bulan. Program ini meliputi penerusan pemberian ASI hingga anak/bayi berusia 23 bulan. Saat berusia di atas 6 bulan, bayi akan didampingi oleh pemberian MP-ASI. Selain itu, disediakan juga obat cacing, suplementasi zink, melakukan fortifikasi zat besi ke dalam makanan, memberikan perlindungan terhadap malaria, imunisasi lengkap, serta melakukan pencegahan dan pengobatan diare.</p><p>Kedua, intervensi stunting gizi sensitif. Kerangka ini idealnya dilakukan melalui berbagai kegiatan pembangunan di luar sektor kesehatan dan berkontribusi pada 70% penurunan stunting. Sasaran dari intervensi gizi sensitif adalah masyarakat secara umum.</p><p>Ketiga, menggalakkan lagi program KIE (komunikasi, informasi dan edukasi) dengan sosialisasi yang terus-menerus dengan sasaran dan tahapan yang jelas. Bagi para pasangan yang akan menikah, baru menikah dibuat model KIE yang pas dan tepat materinya. Begitupun bagi ibu yang sementara hamil dan baru melahirkan, dibuat materi dan topik serta pengelompokan KIE yang spesifik. Selanjutnya bagi para ibu-ibu yang memiliki Balita, dibuatkan juga hal yang sama. Pemaparan sosialisasi ini harus dipisahkan masing-masing kelompok tadi dan jangan digabungkan. Dengan demikian akan lebih fokus dan dapat terukur hasilnya.</p><p>Masih banyak hal lagi yang dapat kita lakukan, namun haruslah berfokus pada upaya promotif dan preventif serta perbaikan lingkungan dimana kita hidup dan bekerja kesehariannya, karena dampaknya akan jangka panjang. Kalau perlu dibuat Satgas Nasional khusus untuk penanganan stunting. Sehingga program akan lebih mudah dilaksanakan di lapangan tanpa prosedur yang rumit.</p><p>Demikianlah sedikit sekilas pandang tentang problema stunting yang jelas dan nyata tidak sesederhana kita memberikan susu sapi atau sejenisnya saja. Semoga memberikan makna. Hiduplah dan jayalah bangsaku Indonesia.</p>', '2025-01-08 13:22:14', 'img\\blog1.jpg'),
(12, 'Stunting - Gejala, Penyebab, dan Pengobatan', '<h2>Penyebab Stunting</h2>\r\n<p>Penyebab utama stunting adalah malnutrisi dalam jangka panjang (kronis). Beberapa kondisi yang bisa menyebabkan anak kekurangan nutrisi adalah:</p>\r\n<ul>\r\n  <li>Ibu mengalami malnutrisi atau terserang infeksi selama hamil</li>\r\n  <li>Anak tidak mendapatkan ASI eksklusif</li>\r\n  <li>Kualitas gizi MPASI yang kurang</li>\r\n  <li>Anak menderita penyakit yang menghalangi penyerapan nutrisi, seperti alergi susu sapi atau sindrom malabsorbsi</li>\r\n  <li>Anak menderita infeksi kronis, seperti tuberkulosis atau cacingan</li>\r\n  <li>Anak memiliki penyakit bawaan, seperti penyakit jantung bawaan atau thalasemia</li>\r\n</ul>\r\n\r\n<h2>Faktor Risiko Stunting</h2>\r\n<p>Ada faktor-faktor yang bisa meningkatkan risiko anak mengalami stunting, antara lain:</p>\r\n<ul>\r\n  <li>Terlahir prematur</li>\r\n  <li>Terlahir dengan berat badan rendah</li>\r\n  <li>Mengalami intrauterine growth restriction (IUGR)</li>\r\n  <li>Tidak mendapatkan vaksin yang lengkap</li>\r\n  <li>Hidup di tengah kemiskinan</li>\r\n  <li>Tinggal di lingkungan dengan sanitasi buruk dan tidak mendapatkan akses untuk air bersih</li>\r\n</ul>\r\n\r\n<h2>Gejala Stunting</h2>\r\n<p>Gejala atau ciri-ciri stunting umumnya bisa terlihat saat anak berusia 2 tahun. Namun, hal ini sering tidak disadari, atau malah disalahartikan sebagai perawakan pendek yang normal.</p>\r\n<p>Gejala dan tanda-tanda yang bisa menunjukkan anak mengalami stunting adalah:</p>\r\n<ul>\r\n  <li>Tinggi badan anak lebih pendek daripada tinggi badan anak seusianya</li>\r\n  <li>Berat badan tidak meningkat secara konsisten</li>\r\n  <li>Tahap perkembangan yang terlambat dibandingkan anak seusianya</li>\r\n  <li>Tidak aktif bermain</li>\r\n  <li>Sering lemas</li>\r\n  <li>Mudah terserang penyakit, terutama infeksi</li>\r\n</ul>\r\n\r\n<h2>Kapan Harus ke Dokter</h2>\r\n<p>Pastikan untuk rutin mengukur berat badan, tinggi badan, dan indeks massa tubuh anak ke posyandu atau fasilitas kesehatan terdekat. Jika hasil skrining menunjukkan pertumbuhan anak tertinggal dibandingkan anak seusianya, lakukan pemeriksaan lanjutan ke dokter.</p>\r\n<p>Segera periksakan anak ke dokter jika ia mengalami gejala penyakit yang dapat meningkatkan risiko terjadinya stunting, seperti:</p>\r\n<ul>\r\n  <li>Batuk lebih dari 2 minggu</li>\r\n  <li>Demam atau diare berulang</li>\r\n  <li>Sulit menyusu</li>\r\n  <li>Sesak napas</li>\r\n</ul>\r\n\r\n<h2>Diagnosis Stunting</h2>\r\n<p>Dokter akan mengawali diagnosis stunting dengan tanya jawab bersama orang tua. Pertanyaan yang diajukan meliputi:</p>\r\n<ul>\r\n  <li>Pemberian ASI dan asupan makan anak</li>\r\n  <li>Kondisi kehamilan dan persalinan</li>\r\n  <li>Lingkungan tempat tinggal</li>\r\n  <li>Vaksinasi yang pernah dilakukan</li>\r\n</ul>\r\n<p>Setelah itu, dokter akan melakukan pemeriksaan fisik lengkap untuk melihat tanda-tanda stunting pada anak. Dokter juga akan mengukur:</p>\r\n<ul>\r\n  <li>Panjang atau tinggi badan</li>\r\n  <li>Berat badan</li>\r\n  <li>Lingkar kepala</li>\r\n  <li>Lingkar lengan anak</li>\r\n</ul>\r\n<p>Anak dapat diduga mengalami stunting apabila perbandingan tinggi badan dengan umurnya berada di bawah garis merah (-2 SD) berdasarkan buku KIA (kesehatan ibu dan anak).</p>\r\n<p>Jika anak berisiko tinggi mengalami stunting, dokter juga akan melakukan beberapa tes penunjang untuk memastikan penyebabnya. Pemeriksaan tersebut antara lain:</p>\r\n<ul>\r\n  <li>Tes darah, untuk mendeteksi gangguan kesehatan, seperti tuberkulosis, infeksi kronis, atau anemia</li>\r\n  <li>Tes urine, untuk mendeteksi sel darah putih di dalam urine yang bisa menjadi tanda infeksi</li>\r\n  <li>Pemeriksaan feses, untuk memeriksa infeksi parasit atau intoleransi laktosa</li>\r\n  <li>Ekokardiografi atau USG jantung, untuk mendeteksi penyakit jantung bawaan</li>\r\n  <li>Foto Rontgen dada, untuk melihat kondisi jantung dan paru-paru</li>\r\n  <li>Tes Mantoux, untuk mendiagnosis penyakit TBC</li>\r\n</ul>\r\n\r\n<h2>Pengobatan Stunting</h2>\r\n<p>Pengobatan stunting adalah dengan mengatasi penyakit penyebabnya, memperbaiki asupan nutrisi, memberikan suplemen, serta menerapkan pola hidup bersih dan sehat. Berikut adalah tindakan yang dapat dilakukan oleh dokter:</p>\r\n<ul>\r\n  <li>Mengobati penyakit yang mendasarinya, misalnya memberikan obat-obatan antituberkulosis bila anak menderita TBC</li>\r\n  <li>Memberikan suplemen vitamin A, zinc, zat besi, kalsium, dan yodium</li>\r\n  <li>Memberikan penyuluhan kepada orang tua agar memenuhi kebutuhan nutrisi anak</li>\r\n</ul>\r\n<p>Keberhasilan pengobatan stunting pada anak juga sangat bergantung pada upaya orang tua dan keluarga. Upaya yang dapat dilakukan adalah:</p>\r\n<ul>\r\n  <li>Memberikan nutrisi yang tepat dan lengkap lewat MPASI atau makanan pokok, berupa makanan yang kaya protein hewani, lemak, dan kalori</li>\r\n  <li>Membawa anak untuk kontrol rutin ke dokter jika ia menderita penyakit kronis</li>\r\n  <li>Memeriksakan tinggi dan berat badan anak secara berkala</li>\r\n  <li>Memperbaiki sanitasi di rumah dan menerapkan perilaku hidup bersih dan sehat (PHBS) guna mencapai keluarga yang sehat</li>\r\n</ul>\r\n\r\n<h2>Komplikasi Stunting</h2>\r\n<p>Jika tidak ditangani dengan tepat, stunting bisa menimbulkan dampak jangka panjang pada kesehatan anak. Komplikasi yang dapat terjadi meliputi:</p>\r\n<ul>\r\n  <li>Gangguan perkembangan otak yang mengganggu proses belajar dan menurunkan prestasi anak ke depannya</li>\r\n  <li>Penyakit metabolik ketika dewasa, seperti obesitas dan diabetes</li>\r\n  <li>Sering sakit dan mudah terkena infeksi</li>\r\n</ul>\r\n\r\n<h2>Pencegahan Stunting</h2>\r\n<p>Pencegahan stunting adalah dengan menghindari faktor yang dapat meningkatkan risiko terjadinya kondisi ini. Upaya yang bisa dilakukan antara lain:</p>\r\n<ul>\r\n  <li>Memenuhi asupan gizi yang cukup sebelum merencanakan kehamilan dan selama kehamilan</li>\r\n  <li>Mencukupi asupan gizi, terutama selama 1000 hari pertama kehidupan, yaitu sejak pembuahan sel telur hingga anak berusia 2 tahun</li>\r\n  <li>Memberikan ASI eksklusif hingga bayi berusia 6 bulan</li>\r\n  <li>Membaca buku KIA agar mengetahui panduan menyiapkan asupan makanan yang tepat untuk anak</li>\r\n  <li>Melakukan pemeriksaan rutin ke posyandu untuk memantau tahapan tumbuh kembang anak</li>\r\n  <li>Memastikan anak mendapatkan imunisasi lengkap</li>\r\n</ul>\r\n', '2025-01-09 12:07:51', 'img\\blog2.jpg'),
(13, 'Mengenal Apa Itu Stunting', '<p class=\"ql-align-justify\">Sahabat sehat, definisi&nbsp;<em>stunting</em>&nbsp;sendiri mengalami perubahan. Menurut WHO (2015),&nbsp;<em>stunting&nbsp;</em>adalah gangguan pertumbuhan dan perkembangan anak akibat kekurangan gizi kronis dan infeksi berulang, yang ditandai dengan panjang atau tinggi badannya berada di bawah standar. Selanjutnya menurut WHO (2020)&nbsp;<em>stunting&nbsp;</em>adalah pendek atau sangat pendek berdasarkan panjang / tinggi badan menurut usia yang kurang dari -2 standar deviasi (SD) pada kurva pertumbuhan WHO yang terjadi dikarenakan kondisi irreversibel akibat asupan nutrisi yang tidak adekuat dan/atau infeksi berulang / kronis yang terjadi dalam 1000 HPK.</p><h2 class=\"ql-align-justify\"><strong>Apakah semua balita pendek itu pasti&nbsp;<em>stunting</em>?</strong></h2><p class=\"ql-align-justify\">Perlu diketahui bahwa tidak semua balita pendek itu&nbsp;<em>stunting</em>, sehingga perlu dibedakan oleh dokter anak, tetapi anak yang&nbsp;<em>stunting</em>&nbsp;pasti pendek.</p><h2 class=\"ql-align-justify\"><strong>Dampak masalah&nbsp;<em>stunting</em>&nbsp;di Indonesia :</strong></h2><h3><strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dampak kesehatan :</strong></h3><p>a.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gagal tumbuh (berat lahir rendah, kecil, pendek, kurus), hambatan perkembangan kognitif dan motoric.</p><p>b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gangguan metabolik pada saat dewasa → risiko penyakit tidak menular (diabetes, obesitas,&nbsp;<em>stroke</em>, penyakit jantung, dan lain sebagainya).</p><h3><strong>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dampak ekonomi :</strong></h3><p>Berpotensi menimbulkan kerugian setiap tahunnya : 2-3 % GDP.</p><h2 class=\"ql-align-justify\"><strong>Penyebab&nbsp;<em>Stunting</em></strong></h2><p class=\"ql-align-justify\">Ada beberapa faktor yang mendasari terjadinya stunting, antara lain yaitu :</p><h3><strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asupan kalori yang tidak adekuat.</strong></h3><p>a.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Faktor sosio-ekonomi (kemiskinan).</p><p>b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pendidikan dan pengetahuan yang rendah mengenai praktik pemberian makan untuk bayi dan batita (kecukupan ASI).</p><p>c.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peranan protein hewani dalam MPASI.</p><p>d.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Penelantaran</p><p>e.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pengaruh budaya</p><p>f.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ketersediaan bahan makanan setempat.</p><h3><strong>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kebutuhan yang meningkat.</strong></h3><p>a.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Penyakit jantung bawaan.</p><p>b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alergi susu sapi.</p><p>c.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bayi berat badan lahir sangat rendah.</p><p>d.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kelainan metabolisme bawaan.</p><p>e.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Infeksi kronik yang disebabkan kebersihan personal dan lingkungan yang buruk (diare kronis) dan penyakit-penyakit yang dapat dicegah oleh imunisasi (Tuberculosis / TBC, difteri, pertussis, dan campak).</p><h2><strong>Apakah&nbsp;<em>stunting</em>&nbsp;bisa dicegah?</strong></h2><p>Tentu&nbsp;<em>stunting</em>&nbsp;dapat dicegah. Berikut beberapa tips mencegah&nbsp;<em>stunting</em>&nbsp;:</p><h3><strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Saat Remaja Putri</strong></h3><p>Skrining anemia dan konsumsi tablet tambah darah.</p><h3><strong>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Saat Masa Kehamilan</strong></h3><p>Disarankan untuk rutin memeriksakan kondisi kehamilan ke dokter. Perlu juga memenuhi asupan nutrisi yang baik selama kehamilan. Dengan makanan sehat dan juga asupan mineral seperti zat besi, asam folat, dan yodium harus tercukupi.</p><h3><strong>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balita</strong></h3><p>a.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Terapkan Inisiasi Menyusui Dini (IMD).</p><p class=\"ql-align-justify\">Sesaat setelah bayi lahir, segera lakukan IMD agar berhasil menjalankan ASI Eksklusif. Setelah itu, lakukan pemeriksaan ke dokter atau ke Posyandu dan Puskesmas secara berkala untuk memantau pertumbuhan dan perkembangan anak.</p><p>b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Imunisasi</p><p class=\"ql-align-justify\">Perhatikan jadwal imunisasi rutin yang diterapkan oleh Pemerintah agar anak terlindungi dari berbagai macam penyakit.</p><p>c.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ASI Eksklusif</p><p class=\"ql-align-justify\">Berikan ASI eksklusif sampai anak berusia 6 (enam) bulan dan diteruskan dengan MPASI yang sehat dan bergizi.</p><p>d.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pemantauan tumbuh kembang à&nbsp;<em>weight faltering.</em></p><h3><strong>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gaya Hidup Bersih dan Sehat</strong></h3><p class=\"ql-align-justify\">Terapkan gaya hidup bersih dan sehat, seperti mencuci tangan sebelum makan, memastikan air yang diminum merupakan air bersih, buang air besar di jamban, sanitasi sehat, dan lain sebagainya.</p><h2><strong>Bagaimana alurnya jika menemukan kasus masalah gizi supaya dapat mencegah&nbsp;<em>stunting</em>?</strong></h2><p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Surveilans gizi dan penemuan dan penangan kasus (Posyandu à Puskesmas).</p><p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pelayanan sekunder atau tersier, memiliki Sp.A atau Sp.AK (gizi, tumbuh kembang). Memiliki sarana dan prasarana : klinik khusus tumbuh kembang.</p>', '2025-01-09 12:08:55', 'img\\blog3.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `medis`
--

CREATE TABLE `medis` (
  `Id_Medis` int(10) NOT NULL,
  `Nama` varchar(100) NOT NULL,
  `Kategori` enum('Dokter SpA','Bidan','','') NOT NULL,
  `Deskripsi` varchar(10000) NOT NULL,
  `Tlp` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `medis`
--

INSERT INTO `medis` (`Id_Medis`, `Nama`, `Kategori`, `Deskripsi`, `Tlp`, `Email`, `Gambar`) VALUES
(19, 'Gede Yudha', 'Bidan', 'Dokter', '6287852302751', 'yudha201777@gmail.com', 'img\\Dokter Mohex.png'),
(20, 'Dave', 'Dokter SpA', 'dokter Dave', '6282359177036', 'devandra@student.undiksha.ac.id', 'img\\Dokter Dave.png'),
(24, 'Lia', 'Bidan', 'Bidan Lia', '6281111111111', 'lia@gmail.com', 'img\\Bidan Lia.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `playlist`
--

CREATE TABLE `playlist` (
  `id_play` int(10) NOT NULL,
  `play_name` varchar(255) NOT NULL,
  `play_genre` enum('song','music','movie','education','health','others') NOT NULL,
  `play_url` varchar(255) NOT NULL,
  `play_description` text NOT NULL,
  `play_thumbnail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `playlist`
--

INSERT INTO `playlist` (`id_play`, `play_name`, `play_genre`, `play_url`, `play_description`, `play_thumbnail`) VALUES
(7, 'Cara Mencegah Stunting1', 'education', 'https://youtu.be/4hWnbHXVYko?si=_GlZW-M3ydqWl7ls', 'Belakangan ini kita denger pemerintah lagi gencar-gencarnya bikin program pencegahan stunting. Apa sih stunting itu sebenarnya? Seberapa bahaya stunting? Dan gimana cara mengatasinya?', 'https://img.youtube.com/vi/4hWnbHXVYko/maxresdefault.jpg'),
(8, 'Apa itu Stunting?', 'education', 'https://youtu.be/HwEka4xz_sc?si=lYsuApGg75VqWpyk', 'Apakah kalian familiar dengan kata “stunting?” \r\nKata ini beberapa kali muncul di media. Stunting artinya anak yang bertubuh pendek bukan? Bukannya memang normal jika ada anak yang tinggi dan pendek? Lalu mengapa hal ini sangat penting sampai sering muncul di media? Pertanyaan-pertanyaan ini akan segera kami jawab melalui video ini', 'https://img.youtube.com/vi/HwEka4xz_sc/maxresdefault.jpg'),
(9, 'CARA MENGATASI GAGAL TUMBUH PADA ANAK YANG BERUJUNG STUNTING', 'education', 'https://youtu.be/w8b6ipQvv9w?si=0hq8iRf9YNcpHJKZ', 'Stunting atau kurang gizi kronis disebabkan oleh kurangnya asupan gizi dalam waktu yang cukup lama, sehingga mengakibatkan gangguan pertumbuhan pada anak.\r\n\r\nTonton penjelasan lengkapnya dari dr. Kurniawan Satria Denta, M.Sc, Sp.A, Dokter Spesialis Pediatri (Anak) dari Mayapada Hospital Kuningan (MHKN)', 'https://img.youtube.com/vi/w8b6ipQvv9w/maxresdefault.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `Id_User` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `roles` enum('User','Admin','','') NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`Id_User`, `username`, `email`, `roles`, `password`) VALUES
(15, 'test', 'test@gmail.com', 'User', '$2b$12$BDRY31vdQKwAYdGEksQhQuY/947d/IqQzVKkdcE7Kw7Y9m5MpjGme'),
(16, 'AdminPOS', 'AdminPOS@gmail.com', 'Admin', '$2b$12$E1da56CBUUImGmwb0wu6GuXeOHpEelj3WRqhNU0QCiHySX4GoxThi'),
(17, 'Yudha', 'yudha@gmail.com', 'User', '$2b$12$f0gI3TFQzLPeYbfYuyJ.Ee5TQ20eybHVrNp.3oZKt4l2xbkVL/KHS'),
(18, 'Arya', 'Arya@gmail.com', 'User', '$2b$12$3yzRq23w95dUnUz3RSfl9uQbITfOEpBqfTvS/GZAaNxkFI.hA1kW6'),
(19, 'Gandi', 'Gandi@gmail.com', 'User', '$2b$12$jTUrFNTd.JQrrjjOgkSdC.jVKVZJhwHONtJTdu4GStCR1YnCvhHVe'),
(20, 'Devan', 'Devan@gmail.com', 'User', '$2b$12$L9Gu.E5iWC9joBj7xlRj5.Z9AHHVOJEDm9dunHZghlt3/k3vnXl96'),
(21, 'Web', 'web@gmail.com', 'User', '$2b$12$Epij76gN1B1BVBwhb6KqV.2dpJw.zuZvTdB9Ew.cg0vnSFSkDkjDe'),
(22, 'Stunting', 'Stunting@gmail.com', 'User', '$2b$12$qgwodbVr1v5OJTyOxVSQ6Or.rkivDV6XdUgZb45E.mTDohqesdZ3S');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`Id_Blog`);

--
-- Indeks untuk tabel `medis`
--
ALTER TABLE `medis`
  ADD PRIMARY KEY (`Id_Medis`);

--
-- Indeks untuk tabel `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id_play`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id_User`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `blog`
--
ALTER TABLE `blog`
  MODIFY `Id_Blog` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `medis`
--
ALTER TABLE `medis`
  MODIFY `Id_Medis` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id_play` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `Id_User` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
