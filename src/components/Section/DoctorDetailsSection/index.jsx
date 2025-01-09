import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Spacing from '../../Spacing';

export default function DoctorDetailsSection({
  bgUrl,
  imgUrl,
  name,
  department,
  designation,
  description,
  social,
}) {
  return (
    <div className="cs_doctor_details">
      <div
        className="cs_doctor_details_bg cs_bg_filed"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      />
      <Spacing md="85" />
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="cs_single_doctor overflow-hidden cs_radius_20">
              <img src={imgUrl} alt="Doctor" className="w-100" />
              <h3 className="cs_white_color cs_accent_bg mb-0 text-center cs_semibold cs_fs_24">
                {department}
              </h3>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1 position-relative">
            <Spacing md="55" />
            <h2 className="cs_fs_48 mb-0 cs_semibold">{name}</h2>
            <Spacing md="12" />
            <h3 className="cs_semibold cs_fs_24 mb-0">{designation}</h3>
            <Spacing md="32" />
            <p className="mb-0 cs_heading_color">{description}</p>
            <div className="cs_social_links cs_accent_bg cs_radius_15">
              {social?.map((item, index) => (
                <Link to={item.href} key={index}>
                  <Icon icon={item.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
