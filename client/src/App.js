import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Styles from "./pages/Styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ScrollToTop from "./helpers/ScrollToTop";
import Sell from "./pages/Sell";
import SuccessAsk from "./pages/SuccessAsk";
import SuccessOrder from "./pages/SuccessOrder";
import NewProduct from "./pages/NewProduct";
import NewPost from "./pages/NewPost";
import EditProduct from "./pages/EditProduct";

const App = () => {
  const user = useSelector((state) => state.currentUser);
  return (
    <Router>
      <ScrollToTop />
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:brand" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/find" element={<ProductList />} />
        <Route path="/posts" element={<Styles />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/sell/:id" element={<Sell />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/successAsk" element={<SuccessAsk />} />
        <Route path="/successOrder" element={<SuccessOrder />} />
        <Route
          path="/newProduct"
          element={user?.isAdmin ? <NewProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/editProduct/:id"
          element={user?.isAdmin ? <EditProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/newPost"
          element={user?.isAdmin ? <NewPost /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
