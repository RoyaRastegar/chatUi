import { useState, useEffect } from 'react';
import './meet.css';
import { IoLocationOutline } from 'react-icons/io5';
import { GoPersonAdd } from 'react-icons/go';
import { RiChat3Line } from 'react-icons/ri';
import { BsCameraVideo } from 'react-icons/bs';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { GoFileMedia } from 'react-icons/go';
import { SlOptionsVertical } from 'react-icons/sl';
import { BsPaperclip } from 'react-icons/bs';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { BsSendFill } from 'react-icons/bs';
import MemberCart from '../membercart/MemberCart';
import { MdOutlineLocalPhone } from 'react-icons/md';
const Meet = ({ user }) => {
  console.log(user);
  const [allChats, setAllChats] = useState([]);
  useEffect(() => {
    fetch('/chat.json')
      .then((response) => response.json())
      .then((jsonData) => setAllChats(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className='chat'>
      {' '}
      <div className='left'>
        <div className='up'>
          <div
            style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}
          >
            <div style={{ marginRight: '10px' }}>
              <img
                style={{
                  borderRadius: '50px',
                }}
                src={user.profileImage}
                alt='img'
                width={30}
                height={30}
              />
            </div>
            <div style={{ paddingTop: '5px' }} className='userinfo'>
              {user.username}
            </div>
          </div>
          <div className='icontop'>
            <span>
              <MdOutlineLocalPhone />
            </span>
            <span>
              <BsCameraVideo />
            </span>
            <span>
              <SlOptionsVertical />
            </span>
          </div>
        </div>
        <div></div>
        <div className='typemessage'>
          <div
            style={{ border: 'none', paddingLeft: '20px', fontSize: 'large' }}
          >
            <input
              style={{ height: '50px', border: 'none' }}
              placeholder='type a massage here'
            />
          </div>
          <div className='icons'>
            <span style={{ color: 'darkgray', paddingBottom: '5px' }}>@</span>{' '}
            <span
              style={{
                color: 'darkgray',

                textDecoration: 'underline',
                paddingBottom: '5px',
              }}
            >
              A
            </span>{' '}
            <span style={{ color: 'darkgray' }}>
              <BsPaperclip />
            </span>{' '}
            <span style={{ color: 'darkgray' }}>
              <HiOutlineEmojiHappy />
            </span>
            <span style={{ color: 'darkgray' }}>
              <GoFileMedia />
            </span>
            <span
              className='two'
              style={{ borderRadius: '50%', padding: '5px' }}
            >
              <BsSendFill />
            </span>
          </div>
        </div>
      </div>
      <div className='right'>
        <div className='rightUp'>
          {' '}
          <div className='imgcountainer'>
            <img className='chatimg' src={user.profileImage} alt='no img' />
          </div>
          <div className='infouser'>
            <div className='info'>
              <span>{user.username}</span>
              <span>
                <IoLocationOutline />
                {user.address}
              </span>
            </div>
            <div className='iconchat'>
              <span>
                <GoPersonAdd />
              </span>
              <span className='one'>
                <RiChat3Line />
              </span>
              <span className='two'>
                <BsCameraVideo />
              </span>
            </div>
          </div>
        </div>
        <div className='rightdown'>
          <div className='userInformation'>
            <div className='user'>
              <span style={{ fontSize: 'small' }}>user information</span>
              <span style={{ color: 'darkgray', paddingRight: '5px' }}>
                <AiOutlineExclamationCircle />
              </span>
            </div>
            <div className='phone'>
              {' '}
              <span style={{ color: 'darkgray', fontSize: 'small' }}>
                phone
              </span>
              <span style={{ fontSize: 'small', fontWeight: '500' }}>
                {user.phone}
              </span>
            </div>
            <div className='email'>
              <span style={{ color: 'darkgray', fontSize: 'small' }}>
                email
              </span>
              <span style={{ fontSize: 'small', fontWeight: '500' }}>
                {user.email}
              </span>
            </div>
          </div>
          <div className='usergroup'>
            <div className='user'>
              <span style={{ fontSize: 'small' }}>Group Participants</span>
              <span style={{ color: 'darkgray', paddingRight: '5px' }}>
                <HiOutlineUserGroup />
              </span>
            </div>
            <div></div>
          </div>
          <div className='usermadia'>
            <div className='user'>
              {' '}
              <span style={{ fontSize: 'small' }}>Media</span>{' '}
              <span style={{ color: 'darkgray', paddingRight: '5px' }}>
                <GoFileMedia />
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Meet;
