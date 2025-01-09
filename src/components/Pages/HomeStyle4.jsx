
import HeroStyle2 from '../Hero/HeroStyle2';
import Section from '../Section';
import DepartmentSectionStyle6 from '../Section/DepartmentSection/DepartmentSectionStyle6';
import AboutSectionStyle5 from '../Section/AboutSection/AboutSectionStyle5';
import FeaturesSectionStyle5 from '../Section/FeaturesSection/FeaturesSectionStyle5';
import Cta from '../Cta';
import TestimonialSectionStyle4 from '../Section/TestimonialSection/TestimonialSectionStyle4';
import BrandsSectionStyle3 from '../Section/BrandsSection/BrandsSectionStyle3';
import FaqSectionStyle4 from '../Section/FaqSection/FaqSectionStyle4';
import TeamSectionStyle4 from '../Section/TeamSection/TeamSectionStyle4';
import BlogSectionStyle5 from '../Section/BlogSection/BlogSectionStyle5';
import { pageTitle } from '../../helpers/PageTitle';
const departmentData = [
  {
    title: 'Medis',
    subTitle:
      'Konsultasi langsung dengan tenaga kesehatan terpercaya untuk solusi stunting anak.',
    iconUrl: '/images/home_2/department_icon_1.svg',
    href: '/doctors',
  },
  {
    title: 'Blog Stunting',
    subTitle:
      'Artikel informatif seputar stunting dari para ahli.',
    iconUrl: '/images/home_2/department_icon_2.svg',
    href: '/blog',
  },
  {
    title: 'Playlist Stunting',
    subTitle:
      'Video edukasi praktis tentang pencegahan dan penanganan stunting.',
    iconUrl: '/images/home_2/department_icon_3.svg',
    href: '/PlaylistPage',
  },
  {
    title: 'Kalkulator Stunting',
    subTitle:
      'Cek risiko stunting anak dengan kalkulator interaktif.',
    iconUrl: '/images/home_2/department_icon_4.svg',
    href: '/Kalkulator',
  },
];
const featureListData = [
  {
    iconUrl: '/images/home_4/compassion.svg',
    title: 'Kepedulian',
    subTitle:
      'Kami memiliki komitmen yang mendalam untuk memahami tantangan yang dihadapi oleh keluarga yang terdampak stunting. Pendekatan kami berakar pada empati, dan kami berupaya menyediakan lingkungan yang mendukung kebutuhan fisik maupun emosional anak dan keluarganya.',
  },
  {
    iconUrl: '/images/home_4/excellence.svg',
    title: 'Pendidikan',
    subTitle:
      'Kami percaya bahwa pengetahuan adalah alat yang kuat dalam mengatasi stunting. Dengan menyediakan informasi yang jelas dan mudah diakses tentang nutrisi, kesehatan, dan pertumbuhan, kami memberdayakan keluarga dan komunitas untuk membuat keputusan yang mendukung perkembangan anak-anak mereka.',
  },
  {
    iconUrl: '/images/home_4/integrity.svg',
    title: 'Integritas',
    subTitle: `Transparansi dan kepercayaan adalah hal yang penting bagi misi kami. Kami berdedikasi untuk komunikasi yang jujur, penggunaan sumber daya yang bertanggung jawab, dan pengambilan keputusan yang memprioritaskan kesejahteraan anak-anak dan keluarga yang kami layani.`,
  },
  {
    iconUrl: '/images/home_4/respect.svg',
    title: 'Rasa Hormat',
    subTitle:
      'Setiap anak dan keluarga berhak mendapatkan rasa hormat, tanpa memandang latar belakang atau keadaan mereka. Kami menghargai martabat setiap individu dan berupaya menciptakan lingkungan yang ramah dan inklusif yang menghormati nilai dan praktik budaya.',
  },
  {
    iconUrl: '/images/home_4/teamwork.svg',
    title: 'Dukungan Komunitas',
    subTitle:
      'Mengatasi stunting memerlukan usaha bersama. Kami bekerja sama dengan pemimpin komunitas, tenaga kesehatan, dan keluarga untuk membangun sistem dukungan yang kuat, memastikan setiap anak mendapatkan akses ke sumber daya yang dibutuhkan untuk tumbuh sehat.',
  },
];
const testimonialData = [
  {
    text: '"Saya sangat berterima kasih atas informasi yang diberikan oleh website ini. Anak saya yang berusia 2 tahun didiagnosis mengalami stunting, dan sekarang kami mendapatkan panduan gizi yang sangat membantu perkembangan anak kami."',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_4/avatar_1.png',
    avatarName: 'Clara Jasmine',
    avatarDesignation: 'Jakarta, Indonesia',
  },
  {
    text: '"Konsultasi online yang disediakan sangat membantu kami dalam memahami kondisi anak kami. Para dokter sangat ramah dan profesional. Terima kasih telah memberikan edukasi tentang pentingnya 1000 hari pertama kehidupan."',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_4/avatar_2.png',
    avatarName: 'Luna Amelia',
    avatarDesignation: 'Surabaya, Indonesia',
  },
  {
    text: '"Website ini menyediakan informasi yang sangat bermanfaat tentang stunting. Saya belajar cara memberikan pola makan sehat untuk anak dan menghindari risiko stunting."',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_4/avatar_3.png',
    avatarName: 'Isabella Sophia',
    avatarDesignation: 'Bandung, Indonesia',
  },
  {
    text: '"Saya sangat merekomendasikan website ini untuk orang tua yang membutuhkan edukasi tentang stunting. Artikel-artikel yang tersedia sangat informatif dan mudah dipahami."',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_4/avatar_4.png',
    avatarName: 'Aurelia Grace',
    avatarDesignation: 'Yogyakarta, Indonesia',
  },
  {
    text: '"Program intervensi gizi yang kami ikuti melalui website ini membantu anak kami tumbuh lebih optimal. Terima kasih telah mendukung keluarga kami dalam melawan stunting."',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_4/avatar_5.png',
    avatarName: 'Elena Rose',
    avatarDesignation: 'Medan, Indonesia',
  },
];
const brandData = [
  { imgUrl: '/images/home_4/brand_logo_1.svg', imgAlt: 'Brand' },
  { imgUrl: '/images/home_4/brand_logo_2.svg', imgAlt: 'Brand' },
  { imgUrl: '/images/home_4/brand_logo_3.svg', imgAlt: 'Brand' },
  { imgUrl: '/images/home_4/brand_logo_4.svg', imgAlt: 'Brand' },
  { imgUrl: '/images/home_4/brand_logo_5.svg', imgAlt: 'Brand' },
];
const faqData = [
  {
    title: 'Apa itu stunting?',
    content:
      'Stunting adalah kondisi di mana pertumbuhan anak terganggu, membuat anak lebih pendek dari rata-rata anak seusianya. Stunting disebabkan oleh kekurangan gizi kronis, terutama pada 1.000 hari pertama kehidupan, yaitu sejak masa kehamilan hingga anak berusia dua tahun. Kondisi ini juga mempengaruhi perkembangan otak dan tubuh anak secara keseluruhan, yang dapat berdampak jangka panjang.',
  },
  {
    title: 'Apa penyebab utama stunting?',
    content:
      'Stunting disebabkan oleh kombinasi faktor, seperti kurangnya asupan gizi yang cukup selama masa kehamilan dan balita, pola makan yang tidak seimbang, infeksi berulang, sanitasi yang buruk, serta rendahnya kesadaran akan pentingnya kesehatan dan gizi.',
  },
  {
    title: 'Apa dampak stunting pada anak?',
    content:
      'Anak yang mengalami stunting berisiko memiliki kemampuan kognitif yang lebih rendah, daya tahan tubuh yang lemah, dan peluang lebih besar terkena penyakit kronis seperti diabetes atau hipertensi di masa dewasa. Stunting juga dapat menurunkan produktivitas anak ketika dewasa.',
  },
  {
    title: 'Bagaimana cara mencegah stunting?',
    content:
      'Pencegahan stunting dilakukan dengan memberi ASI eksklusif selama 6 bulan pertama, memberikan makanan pendamping ASI yang bergizi, serta memastikan ibu hamil mendapat nutrisi yang cukup dan pemeriksaan kesehatan rutin. Selain itu, menjaga kebersihan lingkungan dan edukasi mengenai gizi juga sangat penting.',
  },
  {
    title: 'Apakah stunting bisa diatasi?',
    content:
      'Stunting sulit diatasi setelah anak berusia lebih dari 2 tahun karena dampaknya biasanya bersifat permanen. Namun, pemberian gizi yang cukup dan stimulasi fisik maupun mental tetap bisa membantu meningkatkan kualitas hidup anak.',
  },
];
const blogData = [
  {
    title: 'The Benefits of Mindfulness Meditation for Stress and Anxiety',
    thumbUrl: '/images/home_4/post_1.jpeg',
    category: 'Mental Health',
    date: 'September 12, 2023',
    href: '/blog/blog-details',
  },
  {
    title: 'The Importance of Regular Cancer Screenings and Early Detection',
    thumbUrl: '/images/home_4/post_2.jpeg',
    category: 'Education',
    date: 'September 07, 2023',
    href: '/blog/blog-details',
  },
  {
    title:
      'Managing Chronic Pain: Tips and Strategies for a Better Quality of Life',
    thumbUrl: '/images/home_4/post_3.jpeg',
    category: 'Healthy Life',
    date: 'September 01, 2023',
    href: '/blog/blog-details',
  },
];
const teamData = [
  {
    imgUrl: '/images/home_3/doctor_1.png',
    name: 'Bidan Novelita Damanik',
    designation: '',
    description:
      'Bidan Novel, inovator metode persalinan tiup-tiup, beliau aktif mengedukasi pentingnya nutrisi ibu hamil untuk mendukung tumbuh kembang optimal bayi.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/home-v3' },
      { icon: 'fa6-brands:linkedin-in', href: '/home-v3' },
      { icon: 'fa6-brands:twitter', href: '/home-v3' },
    ],
  },
  {
    imgUrl: '/images/home_3/doctor_2.png',
    name: 'Bidan Yesie Aprillia',
    designation: '',
    description:
      'Ahli di bidang gentle birth dengan layanan seperti prenatal gentle yoga, hypnotherapy, dan hypnobirthing untuk mendukung persalinan yang nyaman dan alami.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/home-v3' },
      { icon: 'fa6-brands:linkedin-in', href: '/home-v3' },
      { icon: 'fa6-brands:twitter', href: '/home-v3' },
    ],
  },
  {
    imgUrl: '/images/home_3/doctor_3.png',
    name: 'Bidan Ony',
    designation: '',
    description:
      'menyampaikan edukasi kesehatan ibu dan anak dengan gaya santai dan humoris. Pendekatannya mempermudah pemahaman pentingnya nutrisi untuk mencegah stunting.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/home-v3' },
      { icon: 'fa6-brands:linkedin-in', href: '/home-v3' },
      { icon: 'fa6-brands:twitter', href: '/home-v3' },
    ],
  },
];
export default function HomeStyle4() {
  pageTitle('Home');
  return (
    <>
      <HeroStyle2
        title="Langkah Awal Menuju Generasi Bebas Stunting"
        subTitle="Pendamping Terpercaya Anda dalam Mencegah dan Mengatasi Stunting, Karena Kesehatan dan Masa Depan Anak Adalah Prioritas Kami. Mari Wujudkan Generasi yang Sehat dan Berkualitas!"
        bgUrl="/images/home_2/hero_bg.png"
        imgUrl="/images/home_2/patents.svg"
        videoBtnText="Cara Deteksi Stunting"
        videoUrl="https://www.youtube.com/embed/ic0tQZUZRA4?si=0oSygANmK_3XyF4h"
        btnText="POS"
        btnUrl="/"
        funfactList={[
          { number: '21,6%', title: 'Prevalensi Stunting' },
          { number: '2,8%', title: 'Penurunan Prevalensi' },
          { number: '5.3 jt', title: 'Jumlah Balita Terdampak' },
          { number: '60%', title: 'Ibu dengan Pendidikan Rendah' },
        ]}
      />

      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={100}
        className="cs_gray_bg_1"
        id="value"
      >
        <FeaturesSectionStyle5
          sectionTitle="Our Values"
          data={featureListData}
        />
      </Section>

      <Section topMd={170} topLg={120} topXl={100} id="about">
        <AboutSectionStyle5
          imgUrl="/images/home_4/about_img.jpg"
          titleUp="ABOUT US"
          title="Tim Profesional yang Berdedikasi untuk Masa Depan Anak yang Lebih Sehat"
          subTitle="Kami adalah tim profesional kesehatan yang berdedikasi untuk melawan stunting dan mendukung pertumbuhan sehat anak-anak di seluruh Indonesia. Dengan komitmen penuh untuk menyediakan layanan berkualitas dan informasi yang dapat diakses, kami percaya bahwa setiap anak memiliki hak untuk tumbuh sehat dan berkembang sesuai potensinya."
          supportTitle="24/7 Support"
          supportSubTitle="We are available when you want"
        />
      </Section>

      <Section topMd={190} topLg={150} topXl={105} id="departments">
        <DepartmentSectionStyle6
          sectionTitle="Pelayanan Terbaik Untuk Kebutuhan Anda"
          sectionTitleUp="Fitur Kami"
          data={departmentData}
        />
      </Section>

      <Section
        topMd={190}
        topLg={150}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <TestimonialSectionStyle4
          sectionTitle="Cerita inspiratif perjuangan orang tua."
          sectionTitleUp="Perjuangan Melawan Stunting"
          avatarListTitle="150+ patients are reviews about POS"
          avatarList={[
            { imgUrl: '/images/home_4/avatar_1.png' },
            { imgUrl: '/images/home_4/avatar_2.png' },
            { imgUrl: '/images/home_4/avatar_3.png' },
            { imgUrl: '/images/home_4/avatar_4.png' },
            { imgUrl: '/images/home_4/avatar_5.png' },
          ]}
          data={testimonialData}
        />
      </Section>

      <Section>
        <Cta
          title="Siap Prioritaskan Kesehatan Anak Anda?"
          subTitle="Hubungi ahli medis kami sekarang untuk jadwalkan konsultasi dan ambil langkah pertama menuju masa depan yang lebih sehat dan bebas stunting!"
          bgUrl="/images/home_4/cta_bg.jpg"
          btnUrl="/doctors"
          btnText="Konsultasi"
        />
      </Section>

      <Section>
        <BrandsSectionStyle3 data={brandData} />
      </Section>

      <Section topMd={185} topLg={145} topXl={105}>
        <FaqSectionStyle4
          sectionTitle="Informasi Penting <br />tentang Stunting"
          data={faqData}
          faqImgUrl="/images/home_4/faq_img.png"
          spiningImgUrl="/images/home_1/about_mini.svg"
        />
      </Section>

      <Section
        topMd={185}
        topLg={145}
        topXl={105}
        bottomMd={160}
        bottomLg={110}
        bottomXl={80}
      >
      </Section>
    </>
  );
}
