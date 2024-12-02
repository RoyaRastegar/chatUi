import React, { useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { PiBuildingApartment } from 'react-icons/pi';
import { LiaHourglassHalfSolid } from 'react-icons/lia';
import { BsEnvelope } from 'react-icons/bs';
import { PiNewspaperClipping } from 'react-icons/pi';
import { MdOutlineDateRange } from 'react-icons/md';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { RxPerson } from 'react-icons/rx';
import './sidbar.css';
const SidBar = () => {
  const [selectedIcon, setSElectedId] = useState(null);
  const icons = [
    { id: 1, component: <IoHomeOutline /> },
    { id: 2, component: <PiBuildingApartment /> },
    { id: 3, component: <LiaHourglassHalfSolid /> },
    { id: 4, component: <BsEnvelope /> },
    { id: 5, component: <PiNewspaperClipping /> },
    { id: 6, component: <MdOutlineDateRange /> },
    { id: 7, component: <IoChatbubbleEllipsesOutline /> },
    { id: 8, component: <IoSettingsOutline /> },
    { id: 9, component: <RxPerson /> },
  ];

  return (
    <div className='sidbar'>
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`${selectedIcon === icon.id ? 'border' : 'noborder'}`}
          onClick={() => setSElectedId(icon.id)}
        >
          {icon.component}
        </div>
      ))}
    </div>
  );
};

export default SidBar;
