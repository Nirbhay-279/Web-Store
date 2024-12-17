import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
function App() {
  const {user ,checkAuth,checkingAuth} =useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
		checkAuth();
	}, [checkAuth]);
 
  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={ <Navbar> <HomePage /> </Navbar> }/>
          <Route path="/signup" element={<Navbar> { !user ? <SignupPage />:<Navigate to= '/'/> }</Navbar>}/>
          <Route path="/login" element={<Navbar>{ !user ?<LoginPage /> : <Navigate to= '/' /> }</Navbar>}/>
          <Route path="/secret-dashboard" element={<Navbar>{ user?.role=="admin" ?<AdminPage /> : <Navigate to= '/login' /> }</Navbar>}/>
          <Route path="/category/:category" element={<Navbar>{ <CategoryPage/> }</Navbar>}/>
          <Route path="/cart" element={<Navbar>{user ? <CartPage/> : <Navigate to= '/login'/> }</Navbar>}/>
          <Route path="/purchase-success" element={<Navbar>{user ? <PurchaseSuccessPage/> : <Navigate to= '/login'/> }</Navbar>}/>
          <Route path="/purchase-cancel" element={<Navbar>{user ? <PurchaseCancelPage/> : <Navigate to= '/login'/> }</Navbar>}/>


        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
