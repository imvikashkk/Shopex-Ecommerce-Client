import AdminProductList from "../features/admin/AdminProductList";
import NavBar from "../features/navbar/Navbar";

function AdminHomePage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
     );
}

export default AdminHomePage;