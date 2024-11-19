import { Icon } from '@iconify/react';
import React from 'react';

export default function ContactInfoWidget() {
  return (
    <ul className="cs_contact_widget">
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        Indonesia
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        08xxxxxxxxxx
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        BlackHex@gmail.com
      </li>
    </ul>
  );
}
