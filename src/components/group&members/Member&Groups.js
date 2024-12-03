import Group from '../group/Group';
import Members from '../members/Members';
import './groupmember.css';
const MembersdGroups = () => {
  return (
    <div className='countainer'>
      <Members />
      <Group />
    </div>
  );
};
export default MembersdGroups;
