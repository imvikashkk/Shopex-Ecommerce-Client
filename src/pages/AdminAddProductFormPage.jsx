import AdminAddProductForm from "../features/admin/AdminAddProductForm";
import NavBar from "../features/navbar/Navbar";
function AdminAddProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <AdminAddProductForm></AdminAddProductForm>
            </NavBar>
        </div>
     );
}

export default AdminAddProductFormPage;