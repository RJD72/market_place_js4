import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sell from "./pages/Sell";
import Browse from "./pages/Browse";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
