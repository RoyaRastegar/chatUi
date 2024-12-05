import './profile.css';
const Profile = ({ me }) => {
  return (
    <div className='profile'>
      {me ? (
        <>
          {' '}
          <img
            className='img'
            src={me.profileImage}
            alt='img'
            width={40}
            height={40}
          />
          <span style={{ fontSize: 'x-small', fontWeight: '800' }}>
            {' '}
            {me.username}
          </span>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default Profile;
