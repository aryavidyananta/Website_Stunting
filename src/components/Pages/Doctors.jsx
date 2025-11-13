import React, { useEffect, useState } from 'react';
import BannerSectionStyle5 from '../Section/BannerSection/BannerSectionStyle5';
import TeamSectionStyle2 from '../Section/TeamSection/TeamSectionStyle2';
import Section from '../Section';
import { pageTitle } from '../../helpers/PageTitle';

export default function Doctors() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/medis/read');
        const data = await response.json();

        if (response.ok) {
          const formattedData = data.datas.map((item) => ({
            imgUrl: `http://127.0.0.1:5000/static/show_image/${item.Gambar}`,
            department: item.Kategori,
            name: item.Nama,
            designation: item.Kategori,
            description: item.Deskripsi,
            social: [
              { icon: 'mdi:email', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${item.Email}`, style: { fontSize: '24px', color: '#007bff' } },
              { icon: 'fa6-brands:whatsapp', href: `https://api.whatsapp.com/send/?phone=${item.Tlp}&text&type=phone_number&app_absent=0`, style: { fontSize: '24px', color: '#25D366' } },
            ],
            category: item.Kategori.toLowerCase(),
            href: `/doctors/${item.Id_Medis}`, // Dynamic route
          }));
          setTeamData(formattedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
