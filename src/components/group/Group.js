import { useEffect, useState } from 'react';
import './group.css';
import GroupCart from '../groupcart/GroupCart';

const Group = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch('/groups.json')
      .then((response) => response.json())
      .then((jsonData) => setGroups(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  console.log(groups);
  return (
    <div className='group'>
      <div className='length'>
        Groups({groups.length})<button className='addgroup'>+</button>
      </div>

      {groups.map((group) => (
        <GroupCart group={group} />
      ))}
    </div>
  );
};
export default Group;
