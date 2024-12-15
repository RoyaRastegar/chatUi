import './members.css';
import { useState } from 'react';
import MemberCart from '../membercart/MemberCart';
import { IoMdSearch } from 'react-icons/io';
import Meet from '../meet/Meet';
const Members = ({ memberData, me, groups }) => {
  const [searchInput, setSearchInput] = useState(''); //for holding search input value
  const [searchResult, setSearchResult] = useState(''); //for holding values after searching
  const [dateUserChat, setDateUserChat] = useState(null); //we want to need last message time and show it inside membercart for each person
  const [userSelected, setUserSelected] = useState({
    username: '',
    id: '',
    address: '',
    email: '',
    phone: '',
    position: '',
    profileImage: '',
  });
  // conver timestamp to localtime
  const date = new Date(dateUserChat);
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  // for searching member by name
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
  // get input value to hole inside searchinpt and pass it as parameter to searchitem method
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    searchItems(value);
  };
  // we need data from membercart to member(child to parent)
  const getUserId = (user) => {
    const userId = memberData.filter((item) => item.id === user.id);
    return setUserSelected(userId[0]);
  };
  // get last massage date
  function getDateUserChat(date) {
    setDateUserChat(date);
  }
  console.log('member');

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
