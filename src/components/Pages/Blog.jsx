import React, { useEffect, useState } from 'react';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import BlogSectionStyle2 from '../Section/BlogSection/BlogSectionStyle2';
import Breadcrumb from '../Breadcrumb';
import { pageTitle } from '../../helpers/PageTitle';

export default function Blog() {
  pageTitle('Blog');

  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('http://172.20.10.3:5000/api/v1/blog/read');
        const result = await response.json();

        if (response.ok && result.datas) {
          const formattedData = result.datas.map(blog => {
            const blogDate = new Date(blog.tanggal);
            const utcDate = new Date(
              blogDate.getUTCFullYear(),
              blogDate.getUTCMonth(),
              blogDate.getUTCDate()
            );

            return {
              title: blog.Judul || 'Untitled Blog',
              // Ensure the correct image URL format
              thumbUrl: `http://172.20.10.3:5000/static/show_image/${blog.Gambar}`, // Correct image URL
              date: blog.tanggal
                ? utcDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }).replace(/ /g, ' ')
                : 'Unknown Date',
              btnText: 'Learn More',
              href: `/blog/${blog.Id_Blog}`,  // Dynamic routing
              socialShare: true,
            };
          });
          setBlogData(formattedData);
        } else {
          throw new Error('Failed to fetch blog data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Section topMd={170} bottomMd={96} bottomLg={70}>
        <Breadcrumb title="Literasi Edukasi Stunting" />
      </Section>
      <Section bottomMd={200} bottomLg={150} bottomXl={110}>
        <BlogSectionStyle2 data={blogData} />
      </Section>
    </>
  );
}
