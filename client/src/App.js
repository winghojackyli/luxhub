import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
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
import SearchProducts from "./pages/SearchProducts";

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
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/sell/:id" element={<Sell />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/successask" element={<SuccessAsk />} />
        <Route path="/successorder" element={<SuccessOrder />} />
        <Route path="/find" element={<SearchProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
