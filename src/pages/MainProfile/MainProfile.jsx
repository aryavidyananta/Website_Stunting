import { Book, ChevronRight, FileQuestion, Mail, MessageCircle, MessageSquare, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';


const MainProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    { question: 'How do I reset my password?', answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.' },
    { question: 'How do I contact customer support?', answer: 'You can reach our support team through email, phone, or live chat available 24/7.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers.' },
  ];

  const articles = [
    { title: 'Getting Started Guide', views: '2.3k', category: 'Basics' },
    { title: 'Account Security', views: '1.8k', category: 'Security' },
    { title: 'Billing & Subscriptions', views: '1.5k', category: 'Billing' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
            }}
          >
            How can we help you?
          </h1>
          <div
            style={{
              maxWidth: '32rem',
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
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 3rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                border: 'none',
                transition: 'box-shadow 0.3s',
              }}
            />
          </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Quick Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s',
            }}
          >
            <Book style={{ height: '2rem', width: '2rem', color: '#2563eb', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Knowledge Base
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Browse through our comprehensive guides and tutorials
            </p>
            <button
              style={{
                color: '#2563eb',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Learn more <ChevronRight style={{ height: '1rem', width: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
  
          {/* Repeat similar cards for Community Forum and FAQs */}
        </div>
  
        {/* Popular Articles */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Popular Articles
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s',
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: '#2563eb',
                    fontWeight: '500',
                  }}
                >
                  {article.category}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                  {article.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                  <Book style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                  {article.views} views
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* FAQ Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {item.question}
                </h3>
                <p style={{ color: '#6b7280' }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default MainProfile;