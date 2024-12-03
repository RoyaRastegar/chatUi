import './members.css';
import { useEffect, useState } from 'react';
import MemberCart from '../membercart/MemberCart';
import { IoMdSearch } from 'react-icons/io';
const Members = () => {
  const [searchInput, setSearchInput] = useState('');
  const [memberData, setMembarData] = useState([]);
  const [searchResult, setSearchResult] = useState('');

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
          <MemberCart key={user.id} user={user} />
        ))}
      </div>

      <div className='buttons'>
        <div>
          <button className='meetbutton'>Meeting</button>
        </div>
        <div>
          <button className='schedulebutton'>Schedule</button>
        </div>
      </div>
    </div>
  );
};
export default Members;
