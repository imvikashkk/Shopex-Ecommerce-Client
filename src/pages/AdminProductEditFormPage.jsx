import AdminProductEditForm from "../features/admin/AdminProductEditForm";
import NavBar from "../features/navbar/Navbar";
function AdminProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductEditForm></AdminProductEditForm>
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;