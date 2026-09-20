import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './About/About';
import DataEntry from './DataEntry/DataEntry';
import ContactUs from './ContactUs/ContactUs';
import Dashboard from './Dashboard/Dashboard';
import NavBar from './Navbar/Navbar';
import Footer from "./Footer/Footer";
import Login from './Login/Login';
import Checkout from './Checkout/Checkout';
import PaymentGateway from './PaymentGateway/PaymentGateway';
import CartContext from "./CartContext/CartContext";
import ProductCard from './ProductCard/ProductCard';
import Shop from './Shop/Shop';
import ProductDetail from './ProductDetails/ProductDetail';
import Cart from './Cart/Cart';
import Electronics from './Electronics/Electronics';
import Sidebar from './Sidebar/Sidebar';
// import Project from './Project/Project';
import BuyPage from './BuyPage/BuyPage';
import Packages from './Packages/Packages';
import Interior from './Interior/Interior';
import Plumbing from './Plumbing/Plumbing';
// import Admin from './Project/Admin';
import ProjectLogin from './Project/ProjectLogin';
import PropertyDetail from "./Project/PropertyDetail";
import InstaHelp from './Instahelp/Instahelp';
// import Carpenter from './Carpenter/Carpenter';
import SecurityAgency from './SecurityAgency/SecurityAgency';
import TeacherPage from './TeacherPage/TeacherPage';
import CCTVPage from './CCTVPage/CCTVPage';
import TailorPage from './TailorPage/TailorPage';
import BookingsPage from './TailorPage/BookingPage';
import TailorLogin from './TailorPage/TailorLogin';
import Catering from './Catering/Catering';
import Laundry from './Laundry/Laundry';
import Property from './Property/Property';
import PropertyAdmin from './PropertyAdmin/PropertyAdmin';
import EventManagement from './EventManagement/EventManagement';
import Industry from './Industry/Industry';
import CustomerLogin from './CustomerLogin/CustomerLogin';
import ChatBot from "./ChatBot/ChatBot";
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import FieldStaffLogin from "./FieldStaffLogin/FieldStaffLogin";
import FieldStaffDashboard from "./FieldStaffDashboard/FieldStaffDashboard";
import AddVendor from "./AddVendor/AddVendor";
import VendorLogin from "./VendorLogin/VendorLogin";
import VendorDashboard from "./VendorDashboard/VendorDashboard";
import GlobalConsultantPopup from "./GlobalConsultantPopup/GlobalConsultantPopup";
import FieldStaffAdmin from "./FieldStaffAdmin/FieldStaffAdmin";
import FieldStaffManagement from "./FieldStaffManagement/FieldStaffManagement";
import VendorAdmin from "./VendorAdmin/VendorAdmin";
import VendorPackageAdmin from "./VendorPackageAdmin/VendorPackageAdmin";
import OfferLetterGenerator from "./OfferLetterGenerator/OfferLetterGenerator";
import MrSabKuchHome from "./MrSabKuch/Home";
import MrSabKuchAdmin from "./MrSabKuch/Admin";
function AppShell() {
  const location = useLocation();
  const hideLegacyNav = location.pathname === "/" || location.pathname === "/mr-admin";
  return (
      <>
      {!hideLegacyNav && <NavBar />}
        <div>
          <Routes>
            <Route path="/" element={<MrSabKuchHome />} />
            <Route path="/niss-home" element={<About />} />
            <Route path="/mr-admin" element={<MrSabKuchAdmin />} />
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/navBar" element={<NavBar />} />
            <Route path='/footer' element={<Footer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/paymentgateway' element={<PaymentGateway />} />
            <Route path='/productcard' element={<ProductCard />} />
            <Route path='cartcontext' element={<CartContext />} />
            <Route path="/shop" element={<Shop />} /> {/* Corrected this line */}
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Corrected this line */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/electronics' element={<Electronics />} />
            <Route path='/sidebar' element={<Sidebar />} />
            {/* <Route path='/project' element={<Project />} /> */}
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/interior" element={<Interior />} />
            <Route path="/plumbing" element={<Plumbing />} />
            <Route path="/admin" element={<ProjectLogin />} />
            {/* <Route path="/admin/dashboard" element={<Admin />} /> */}
            <Route path="/property-detail" element={<PropertyDetail />}/>
            <Route path="/instahelp" element={<InstaHelp />}/>
             {/* <Route path="/carpenter" element={<Carpenter />}/> */}
             <Route path="/security" element={<SecurityAgency />}/>
             <Route path="/teacher" element={<TeacherPage />}/>
             <Route path="/cctv" element={<CCTVPage />}/>
             <Route path ="/tailor" element={<TailorPage />} />
             <Route path ="/bp" element={<BookingsPage />} />
              <Route path ="/tlogin" element={<TailorLogin />} />
<Route path ="/catering" element={<Catering />} />
<Route path ="/laundry" element={<Laundry />} />
<Route path ="/property" element={<Property />} />
<Route path="/property-admin" element={<PropertyAdmin />} />
<Route path="/events"    element={<EventManagement />}/>
<Route path="/field-staff-login"   element={<FieldStaffLogin />}/>
<Route path="/field-staff-dashboard"  element={<FieldStaffDashboard />}/>
<Route path="/customerlogin" element={<CustomerLogin />} />
<Route path="/chatbot"     element={<ChatBot />}          />
<Route path="/industry" element={<Industry />} />
<Route path="/customer-dashboard"   element={<CustomerDashboard />}/>
<Route path="/add-vendor"   element={<AddVendor />}/>
<Route path="/vendor-login"   element={<VendorLogin />} />
<Route   path="/vendor-dashboard"   element={<VendorDashboard />}/>
<Route
  path="/field-staff-admin"
  element={<FieldStaffAdmin />}
/>

<Route
  path="/field-staff-management"
  element={<FieldStaffAdmin />}
/>

// without navbar ye sab h
<Route
  path="/vendor-admin"
  element={<VendorAdmin />}
/>
<Route
  path="/vendor-dashboard/:vendorId"
  element={<VendorDashboard />}
/>

<Route
  path="/vendor-package-admin"
  element={<VendorPackageAdmin />}
/>

<Route
  path="/offer-letter-generator"
  element={<OfferLetterGenerator />}
/>
          </Routes>
        </div>
        {!hideLegacyNav && <GlobalConsultantPopup />}
        {!hideLegacyNav && <ChatBot />}
      </>
  );
}

function App() {
  return <Router><AppShell /></Router>;
}

export default App;
