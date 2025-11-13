import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import BlogSectionStyle2 from '../Section/BlogSection/BlogSectionStyle2';
import Breadcrumb from '../Breadcrumb';
import { pageTitle } from '../../helpers/PageTitle';

export default function Blog() {
  pageTitle('Blog');

  const [blogData, setBlogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/blog/read');
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
              thumbUrl: `http://127.0.0.1:5000/static/show_image/${blog.Gambar}`,
              date: blog.tanggal
                ? utcDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }).replace(/ /g, ' ')
                : 'Unknown Date',
              btnText: 'Learn More',
              href: `/blog/${blog.Id_Blog}`,
              socialShare: true,
            };
          });
          setBlogData(formattedData);
          setFilteredData(formattedData);
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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = blogData.filter(blog => blog.title.toLowerCase().includes(value));
    setFilteredData(filtered);
  };

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
        <div style={{ marginBottom: '20px', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            placeholder="Search blog titles..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: '10px 40px 10px 20px',
              width: '50%',
              fontSize: '16px',
              borderRadius: '25px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 'calc(28% - 25px)',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: '#999',
              cursor: 'pointer',
            }}
          >
            <SearchOutlined />
          </div>
        </div>
        <BlogSectionStyle2 data={filteredData} />
      </Section>
    </>
  );
}
