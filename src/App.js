import Group from './components/group/Group';
import Members from './components/members/Members';
import Profile from './components/profile/Profile';
import SidBar from './components/sidbar/SidBar';
import { useEffect, useState } from 'react';

function App() {
  const [groups, setGroups] = useState([]);
  const [memberData, setMembarData] = useState([]);
  const me = memberData[4];
  useEffect(() => {
    fetch('http://18.143.79.95/api/chatSystem/groups/list')
      .then((response) => response.json())
      .then((jsonData) => setGroups(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    fetch('http://18.143.79.95/api/chatSystem/users/list')
      .then((response) => response.json())
      .then((jsonData) => setMembarData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <SidBar />
      <Members memberData={memberData} me={me} groups={groups} />
      <Group groups={groups} />
      <Profile me={me} />
    </>
  );
}

export default App;
