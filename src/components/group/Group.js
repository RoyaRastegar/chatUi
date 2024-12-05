import './group.css';
import GroupCart from '../groupcart/GroupCart';

const Group = ({ groups }) => {
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
