import React from 'react';
import Button from '../Button';

export default function Cta({ title, subTitle, bgUrl, btnUrl, btnText }) {
  return (
    <div className="container">
      <div
        className="cs_cta cs_style_1 cs_radius_20"
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        ></div>

        <div style={{ position: 'relative', zIndex: 2, padding: '20px' }}>
          <h2 className="cs_cta_title cs_fs_72" style={{ color: '#FFFFFF' }}>{title}</h2>
          <p className="cs_cta_subtitle cs_heading_color" style={{ color: '#F0F0F0' }}>{subTitle}</p>
          <Button btnUrl={btnUrl} btnText={btnText} />
        </div>
      </div>
    </div>
  );
}
