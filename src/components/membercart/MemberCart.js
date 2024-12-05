import './membercart.css';
const MemberCart = ({ user, getUser, formattedDate }) => {
  function userSelected() {
    return getUser(user);
  }
  return (
    <div onClick={userSelected} className='cart'>
      <div>
        <img
          className='img'
          src={user.profileImage}
          alt='img'
          width={30}
          height={30}
        />
      </div>
      <div className='userinfo'>
        <span style={{ marginRight: 'auto' }}>{user.username}</span>
        <span style={{ fontSize: 'smaller', color: 'darkgray' }}>
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
export default MemberCart;
