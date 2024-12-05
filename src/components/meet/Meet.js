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
import { MdOutlineLocalPhone } from 'react-icons/md';

const Meet = ({ user, me, getDateUserChat, groups }) => {
  const [allChats, setAllChats] = useState([]);
  const [chatuser, setChatUser] = useState([]);
  const [message, setMessage] = useState('');
  // const [searchMessage, setSearchMessage] = useState('');
  // const [searchResult, setSearchResult] = useState([]);
  const userId = user.id;

  useEffect(() => {
    fetch(`http://18.143.79.95/api/chatSystem/chatByUserId/${userId}`)
      .then((response) => response.json())
      .then((jsonData) => setChatUser(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, [userId]);

  useEffect(() => {
    fetch('http://18.143.79.95/api/chatSystem/chat/list')
      .then((response) => response.json())
      .then((jsonData) => setAllChats(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (chatuser.length > 0) {
    getDateUserChat(chatuser[chatuser.length - 1].timestamp);
  } else {
    return;
  }
  const handelSendMessag = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      alert('please write somthing');
      return;
    }
    const url = 'http://18.143.79.95/api/chatSystem/chat/add';
    const requestBody = {
      fromUser: me.id,
      toUser: userId,
      message: message,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
          'Content-Language': 'en-US',
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setAllChats((prevChats) => [
          ...prevChats,
          {
            id: result.id || Math.random(),
            fromUser: requestBody.fromUser,
            toUser: requestBody.toUser,
            image: result.image || null,
            message: requestBody.message,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      setMessage('');
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
    } catch (error) {
      console.error('Error sending message:', error.message, error.stack);
    }
  };

  const findGroupName = groups.filter((group) => group.users.includes(userId));
  const groupName = findGroupName[0].name;
  return (
    <div className='chat'>
      {' '}
      <div className='left'>
        {/* left up */}
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
              <span style={{ fontSize: 'small' }}>{user.username}</span>
              <span
                style={{
                  fontSize: 'x-small',
                  color: 'darkgray',
                  fontWeight: '700',
                }}
              >
                {groupName}
              </span>
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
        {/* left middel */}
        <div className='showChat'>
          {chatuser.map((userselectecd) => {
            const date = new Date(userselectecd.timestamp);
            const formattedDate = date.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            return (
              <div>
                {userselectecd.fromUser !== 5 ? (
                  <div key={userselectecd.id} className='leftchat'>
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
                    <div>
                      <span
                        style={{
                          fontWeight: '700',
                          fontSize: 'small',
                          marginRight: '5px',
                        }}
                      >
                        {' '}
                        {user.username}
                      </span>
                      <span
                        style={{
                          color: 'darkgray',
                          fontSize: 'x-small',
                          fontWeight: '700',
                        }}
                      >
                        {' '}
                        {formattedDate}
                      </span>
                      <div className='msgdiv'>
                        <p style={{ fontSize: 'small', padding: '1px' }}>
                          {userselectecd.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={userselectecd.id} className='rightchat'>
                    <div style={{ marginLeft: 'auto' }}>
                      <div style={{ textAlign: 'end' }}>
                        {' '}
                        <span
                          style={{
                            color: 'darkgray',
                            fontSize: 'x-small',
                            fontWeight: '700',
                          }}
                        >
                          {' '}
                          {formattedDate}
                        </span>
                        <span
                          style={{
                            fontWeight: '700',
                            fontSize: 'small',
                            marginRight: '5px',
                          }}
                        >
                          {' '}
                          {me.username}
                        </span>
                      </div>

                      <div className='msgdivme'>
                        <p style={{ fontSize: 'small', padding: '1px' }}>
                          {userselectecd.message}
                        </p>
                      </div>
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <img
                        style={{
                          borderRadius: '50px',
                        }}
                        src={me.profileImage}
                        alt='img'
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* left down */}
        <div className='typemessage'>
          <form className='form' onSubmit={handelSendMessag}>
            <div
              style={{ border: 'none', paddingLeft: '20px', fontSize: 'large' }}
            >
              <input
                style={{ height: '50px', border: 'none' }}
                placeholder='type a massage here'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              <button
                type='submit'
                className='two'
                style={{ borderRadius: '50%', padding: '5px' }}
              >
                <BsSendFill />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* right */}
      <div className='right'>
        {/* right up */}
        <div className='rightUp'>
          {' '}
          <div className='imgcountainer'>
            <img className='chatimg' src={user.profileImage} alt='no img' />
          </div>
          <div className='infouser'>
            <div className='info'>
              <span>{user.username}</span>
              <span
                style={{
                  fontSize: 'x-small',
                  color: 'darkgray',
                  fontWeight: '700',
                }}
              >
                {groupName}
              </span>
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
        {/* right down */}
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
