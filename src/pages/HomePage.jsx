import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/ProductList";
import Footer from "../features/common/Footer";

function HomePage() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default HomePage;