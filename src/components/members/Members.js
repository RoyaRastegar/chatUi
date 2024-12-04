import './members.css';
import { useEffect, useState } from 'react';
import MemberCart from '../membercart/MemberCart';
import { IoMdSearch } from 'react-icons/io';
import Meet from '../meet/Meet';
const Members = () => {
  const [searchInput, setSearchInput] = useState('');
  const [memberData, setMembarData] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [userSelected, setUserSelected] = useState({
    username: '',
    id: '',
    address: '',
    email: '',
    phone: '',
    position: '',
    profileImage: '',
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
  useEffect(() => {
    fetch('/members.json')
      .then((response) => response.json())
      .then((jsonData) => setMembarData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
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
          <MemberCart key={user.id} user={user} getUser={getUserId} />
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
      <Meet user={userSelected} />
    </div>
  );
};
export default Members;
