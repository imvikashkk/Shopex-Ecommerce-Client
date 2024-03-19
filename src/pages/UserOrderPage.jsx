import NavBar from '../features/navbar/Navbar';
import UserOrders from '../features/user/UserOrder';

function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <h1 className='ml-4 text-2xl px-3 font-bold text-[#333]'>My Orders</h1>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}

export default UserOrdersPage;