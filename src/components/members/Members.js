import './members.css';
import { useState } from 'react';
import MemberCart from '../membercart/MemberCart';
import { IoMdSearch } from 'react-icons/io';
import Meet from '../meet/Meet';
const Members = ({ memberData, me, groups }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [dateUserChat, setDateUserChat] = useState(null);
  const [userSelected, setUserSelected] = useState({
    username: '',
    id: '',
    address: '',
    email: '',
    phone: '',
    position: '',
    profileImage: '',
  });
  const date = new Date(dateUserChat);
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const searchItems = (name) => {
    if (!name.trim()) {
      setSearchResult([]);
    } else {
      const result = memberData.filter((user) =>
        user.username.toLowerCase().includes(name.toLowerCase())
      );
      setSearchResult(result);
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    searchItems(value);
  };
  const getUserId = (user) => {
    const userId = memberData.filter((item) => item.id === user.id);
    return setUserSelected(userId[0]);
  };
  function getDateUserChat(date) {
    setDateUserChat(date);
  }
  return (
    <div className='members'>
      <div onClick={() => searchItems(searchInput)} className='search'>
        <input
          className='serachinput'
          icon='search'
          placeholder='Search contact'
          value={searchInput}
          onChange={handleSearchChange}
        />
        <IoMdSearch className='searchicon' />
      </div>
      <div className='body'>
        {(searchResult.length > 0 ? searchResult : memberData).map((user) => (
          <MemberCart
            key={user.id}
            user={user}
            getUser={getUserId}
            formattedDate={formattedDate}
          />
        ))}
      </div>
      <div className='buttons'>
        <div>
          <button
            onClick={() => {
              if (!userSelected) {
                alert('choose one person for chating');
              }
            }}
            className='meetbutton'
          >
            Meeting
          </button>
        </div>
        <div>
          <button className='schedulebutton'>Schedule</button>
        </div>
      </div>

      <Meet
        user={userSelected}
        me={me}
        getDateUserChat={getDateUserChat}
        groups={groups}
      />
    </div>
  );
};
export default Members;
