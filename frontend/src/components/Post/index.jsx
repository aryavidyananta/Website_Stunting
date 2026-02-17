import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './Pos.css';

export default function Post({
  title,
  thumbUrl,
  date,
  btnText,
  href,
  socialShare,
  variant,
}) {
  return (
    <div className={`cs_post cs_style_1 ${variant}`}>
      <Link to={href} className="cs_post_thumb cs_view_mouse">
        {/* Tambahkan class "blog-thumbnail" untuk konsistensi ukuran gambar */}
        <img src={thumbUrl} alt={title} className="blog-thumbnail" />
      </Link>
      <div className="cs_post_info">
        <div>
          <div className="cs_post_meta">
            <div className="cs_posted_by">{date}</div>
          </div>
          <h2 className="cs_post_title cs_semibold cs_fs_32">
            <Link to={href}>{title}</Link>
          </h2>
        </div>
        {btnText && (
          <div className="cs_heading_color cs_medium">
            <Link to={href} className="cs_post_btn">
              {btnText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
