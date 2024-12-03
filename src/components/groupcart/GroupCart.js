import './groupcart.css';
const GroupCart = ({ group }) => {
  return (
    <div className='groupcart'>
      <div className='groupname'>
        <span>{group.name}</span>
      </div>
      <div className='grouplength'>
        {' '}
        {group.users.length > 0 && (
          <span className='lenmember'>+{group.users.length}</span>
        )}
      </div>
    </div>
  );
};
export default GroupCart;
