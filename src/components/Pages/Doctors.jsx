import React from 'react';
import BannerSectionStyle5 from '../Section/BannerSection/BannerSectionStyle5';
import BannerSectionStyle4 from '../Section/BannerSection/BannerSectionStyle4';
import TeamSectionStyle2 from '../Section/TeamSection/TeamSectionStyle2';
import Section from '../Section';
import { pageTitle } from '../../helpers/PageTitle';
const teamData = [
  {
    imgUrl: '/images/doctors/doctor_1.png',
    department: 'Bidan',
    name: 'Novelita Damanik',
    designation: 'Pediatrician',
    description:
      'Bidan Novel, inovator metode persalinan tiup-tiup, beliau aktif mengedukasi pentingnya nutrisi ibu hamil untuk mendukung tumbuh kembang optimal bayi.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'bidan',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_2.png',
    department: 'Bidan',
    name: 'Yesie Aprillia',
    designation: 'Pediatrician',
    description:
      'Ahli di bidang gentle birth dengan layanan seperti prenatal gentle yoga, hypnotherapy, dan hypnobirthing untuk mendukung persalinan yang nyaman dan alami.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'bidan',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_3.png',
    department: 'Bidan',
    name: 'Ony',
    designation: 'Pediatrician',
    description:
      'menyampaikan edukasi kesehatan ibu dan anak dengan gaya santai dan humoris. Pendekatannya mempermudah pemahaman pentingnya nutrisi untuk mencegah stunting.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'bidan',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_4.png',
    department: 'Bidan',
    name: 'Jamilatus Sa’diyah',
    designation: 'Pediatrician',
    description:
      'Bidan Jamilatus Sadiyah berkomitmen mencegah stunting dengan edukasi gizi dan perawatan bayi untuk tumbuh kembang optimal.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'bidan',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_5.png',
    department: 'Bidan',
    name: 'Tantri',
    designation: 'Pediatrician',
    description:
      'Bidan Tantri, ahli kebidanan berpengalaman, fokus pada pencegahan stunting melalui edukasi gizi ibu dan perkembangan anak.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'bidan',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_6.png',
    department: 'Dokter Spesialis Anak',
    name: 'Dr. Erlin Sp.A.',
    designation: 'Pediatrician',
    description:
      'Dengan bekal pengalaman sebagai dokter anak selama 19 tahun, dr. Erlin Sp.A. mampu memberikan layanan konsultasi di POS terkait stunting.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'pediatric',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_7.png',
    department: 'Dokter Spesialis Anak',
    name: 'Dr. Dandung Bawono Sp.A, M.Sc',
    designation: 'Pediatrician',
    description:
      'Dokter Dandung Bawono Sp.A, M.Sc juga bisa memberikan konsultasi terkait DBD dan penyakit tropis, pencernaan anak, alergi dan imunitas anak serta perkembangan anak.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'pediatric',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_8.png',
    department: 'Dokter Spesialis Anak',
    name: 'Dr. Gracia Deswita Natalya Fau Sp.A.',
    designation: 'Pediatrician',
    description:
      'Dengan pengalaman selama 13 tahun, dr. Gracia Deswita Natalya Fau Sp.A. bisa memberikan layanan konsultasi di POS terkait stunting. ',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'pediatric',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_9.png',
    department: 'Dokter Spesialis Anak',
    name: 'Dr. Bayu Kurniawan Sp.A, M.Biomed',
    designation: 'Pediatrician',
    description:
      'Dengan pengalaman selama 17 tahun, dr. Bayu Kurniawan Sp.A, M.Biomed memberikan layanan konsultasi di POS terkait stunting.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'pediatric',
    href: '/doctors/doctor-details',
  },
  {
    imgUrl: '/images/doctors/doctor_10.png',
    department: 'Dokter Spesialis Anak',
    name: 'dr. Dwi Lestari Avianti Sp.A, M.Ked.Klin',
    designation: 'Pediatrician',
    description:
      'Dengan pengalaman selama 16 tahun, dr. Dwi Lestari Avianti Sp.A, M.Ked.Klin memberikan layanan konsultasi di POS seputar stunting.',
    social: [
      { icon: 'fa6-brands:facebook-f', href: '/about' },
      { icon: 'fa6-brands:linkedin-in', href: '/about' },
      { icon: 'fa6-brands:twitter', href: '/about' },
    ],
    category: 'pediatric',
    href: '/doctors/doctor-details',
  },
];

export default function Doctors() {
  pageTitle('Doctors');
  return (
    <>
      <BannerSectionStyle5
        bgUrl="/images/doctors/banner_bg.svg"
        title="Perkenalkan Para <br />Ahli Kami"
        subTitle="Daftar dokter spesialis anak dan bidan bersertifikat dengan tahun pengalaman profesional"
      />
      <Section topMd={65} bottomMd={200} bottomLg={150} bottomXl={110}>
        <TeamSectionStyle2 data={teamData} />
      </Section>
    </>
  );
}
