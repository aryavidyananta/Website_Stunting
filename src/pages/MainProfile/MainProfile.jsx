import React, { useState } from 'react';
import {
  Heart,
  HelpCircle,
  MessageSquare,
  Search,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

const AdminHelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = [
    { title: 'Cara Mengelola Data Kesehatan Anak', views: '3.5k', category: 'Manajemen Data' },
    { title: 'Tips Memantau Stunting dengan Efektif', views: '2.1k', category: 'Pemantauan' },
    { title: 'Menggunakan Dashboard untuk Analisis', views: '4.2k', category: 'Analisis' },
  ];

  const faqItems = [
    { question: 'Bagaimana cara menambahkan data anak?', answer: 'Klik menu "Tambah Data" di dashboard dan isi formulir yang tersedia.' },
    { question: 'Apa langkah awal jika data anak tidak lengkap?', answer: 'Periksa kembali sumber data dan tambahkan informasi yang diperlukan melalui menu "Edit Data".' },
    { question: 'Bagaimana cara menghasilkan laporan stunting?', answer: 'Gunakan fitur "Laporan" di dashboard untuk membuat dan mengunduh laporan.' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e3f2fd', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div
        style={{
          background: 'linear-gradient(to right, #42a5f5, #1e88e5)',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
          Selamat Datang di Pusat Bantuan Admin
        </h1>
        <p style={{ color: 'white', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Kelola data kesehatan anak dengan mudah dan efektif.
        </p>
        <div
          style={{
            maxWidth: '36rem',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Search
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
            }}
          />
          <input
            type="text"
            placeholder="Cari fitur, artikel, atau FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 3rem',
              borderRadius: '1rem',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem' }}>
        {/* Trending Topics */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', color: '#1976d2' }}>
            Topik Populer
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s',
                }}
              >
                <TrendingUp style={{ color: '#1976d2', height: '2rem', width: '2rem', marginBottom: '1rem' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1976d2' }}>{topic.category}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0.5rem 0' }}>{topic.title}</h3>
                <p style={{ color: '#6b7280' }}>{topic.views} views</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', color: '#1976d2' }}>
            Pertanyaan yang Sering Diajukan
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.question}</h3>
                <p style={{ color: '#6b7280' }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', color: '#1976d2' }}>
            Sumber Informasi Lainnya
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
              }}
            >
              <Heart style={{ color: '#1976d2', height: '2rem', width: '2rem', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Panduan Data</h3>
              <p style={{ color: '#6b7280' }}>Panduan lengkap untuk pengelolaan data kesehatan.</p>
            </div>
            <div
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
              }}
            >
              <MessageSquare style={{ color: '#1976d2', height: '2rem', width: '2rem', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Forum Diskusi</h3>
              <p style={{ color: '#6b7280' }}>Berinteraksi dengan admin lain dan berbagi wawasan.</p>
            </div>
            <div
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
              }}
            >
              <HelpCircle style={{ color: '#1976d2', height: '2rem', width: '2rem', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Bantuan Teknis</h3>
              <p style={{ color: '#6b7280' }}>Dukungan langsung untuk semua fitur dashboard.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHelpCenter;
