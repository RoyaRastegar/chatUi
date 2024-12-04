import './membercart.css';
const MemberCart = ({ user, getUser }) => {
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
      <div className='userinfo'>{user.username}</div>
    </div>
  );
};
export default MemberCart;
