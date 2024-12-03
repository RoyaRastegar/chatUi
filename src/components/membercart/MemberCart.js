import './membercart.css';
const MemberCart = ({ user }) => {
  return (
    <div className='cart'>
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
