import NavBar from '../features/navbar/Navbar';
import UserProfile from '../features/user/UserProfile';

function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
}

export default UserProfilePage;