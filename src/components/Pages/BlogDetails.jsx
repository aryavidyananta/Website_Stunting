import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pageTitle } from "../../helpers/PageTitle";
import Section from "../Section";
import Breadcrumb from "../Breadcrumb";
import Spacing from "../Spacing";
import './BlogDetails.css';

export default function BlogDetails() {
  pageTitle("Blog Details");

  const { id } = useParams(); // Mendapatkan ID blog dari URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/blog/read/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching blog data: ${response.statusText}`);
        }

        const result = await response.json();
        setBlog(result.data); // Set data blog
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]); // Menjalankan ulang useEffect jika ID berubah

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Section topMd={170} bottomMd={54} bottomLg={54}>
        {/* Breadcrumb dengan judul blog */}
        <Breadcrumb title={blog?.Judul || "Blog Details"} />
      </Section>
      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_date">
              {blog?.tanggal || "Unknown Date"}
            </div>
          </div>
        </div>
        <Spacing md="55" />

        {/* Tampilkan gambar jika ada */}
        {blog?.Gambar && (
          <div className="cs_blog_details_image">
            <img
              src={`${API_BASE_URL}/static/show_image/${blog.Gambar}`}
              alt={blog?.Judul || "Blog Image"}
              className="img-fluid custom-blog-image"
            />
          </div>
        )}

        <Spacing md="55" />

        {/* Tampilkan deskripsi dengan HTML */}
        <div
          className="custom-blog-description"
          dangerouslySetInnerHTML={{ __html: blog?.Deskripsi }}
        ></div>
        <Spacing md="90" lg="50" />
      </div>
    </>
  );
}
