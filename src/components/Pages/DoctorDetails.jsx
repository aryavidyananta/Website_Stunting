import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbStyle2 from "../Breadcrumb/BreadcrumbStyle2";
import Section from "../Section";
import DoctorDetailsSection from "../Section/DoctorDetailsSection";
import { pageTitle } from "../../helpers/PageTitle";

export default function DoctorDetails() {
  pageTitle("Doctor Details");

  const { id } = useParams(); // Get Id_Medis from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/medis/read/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const result = await response.json();
        setDoctor(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <BreadcrumbStyle2 />
      <Section bottomMd={190} bottomLg={150} bottomXl={110}>
        {doctor && (
          <DoctorDetailsSection
            bgUrl="/images/doctors/doctor_details_bg.svg"
            imgUrl={`http://127.0.0.1:5000/static/show_image/${doctor.Gambar}`}
            name={doctor.Nama}
            department={doctor.Kategori}
            designation={doctor.Kategori}
            description={doctor.Deskripsi}
            social={[
              {
                icon: "mdi:email",
                href: `https://mail.google.com/mail/?view=cm&fs=1&to=${doctor.Email}`,
                style: { fontSize: "24px", color: "#007bff" },
              },
              {
                icon: "fa6-brands:whatsapp",
                href: `https://api.whatsapp.com/send/?phone=${doctor.Tlp}&text&type=phone_number&app_absent=0`,
                style: { fontSize: "24px", color: "#25D366" },
              },
            ]}
          />
        )}
      </Section>
    </>
  );
}
