import React from 'react';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import BlogSectionStyle2 from '../Section/BlogSection/BlogSectionStyle2';
import Breadcrumb from '../Breadcrumb';
import { pageTitle } from '../../helpers/PageTitle';
const blogData = [
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_1.jpeg',
    date: 'March 12',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_2.jpeg',
    date: 'March 11',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_3.jpeg',
    date: 'March 9',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_4.jpeg',
    date: 'March 8',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_5.jpeg',
    date: 'March 5',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_6.jpeg',
    date: 'March 2',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_7.jpeg',
    date: 'Feb 28',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_8.jpeg',
    date: 'Feb 26',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Lorem ipsum Blog Stunting',
    thumbUrl: 'images/blog/post_9.jpeg',
    date: 'Feb 25',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
];

export default function Blog() {
  pageTitle('Blog');
  return (
    <>
      <Section topMd={170} bottomMd={96} bottomLg={70}>
        <Breadcrumb title="Literasi Edukasi Stunting" />
      </Section>
      <Section bottomMd={200} bottomLg={150} bottomXl={110}>
        <BlogSectionStyle2 data={blogData} />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
          imgUrl="/images/doctors/banner_img_3.png"
        />
      </Section>
    </>
  );
}
