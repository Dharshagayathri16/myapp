import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddMedicine from "./pages/AddMedicine";
import ViewMedicines from "./pages/ViewMedicines";
import EditMedicine from "./pages/EditMedicine";
import Profile from "./pages/Profile";
import AddBatch from "./pages/AddBatch";
import BatchHistory from "./pages/BatchHistory";
import Billing from "./pages/Billing";
import BillHistory from "./pages/BillHistory";
import About from "./pages/About";
import Support from "./pages/Support";
import "./styles/style.css";
import BillView from "./pages/BillView";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateStore from "./pages/CreateStore";
import ViewStores from "./pages/ViewStores";
import EditStore from "./pages/EditStore";
import DeleteStore from "./pages/DeleteStore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/view-medicines"element={<ViewMedicines />}/>
        <Route
  path="/edit-medicine/:id"
  element={<EditMedicine />}
/>
        <Route
  path="/profile"
  element={<Profile />}
/>
        <Route
  path="/add-batch"
  element={<AddBatch />}
/>
        <Route
  path="/batch-history/:id"
  element={<BatchHistory />}
/>

    
        <Route
  path="/billing"
  element={<Billing />}
/>

        <Route
  path="/bill-history"
  element={<BillHistory />}
/>

<Route
  path="/bill/:id"
  element={<BillView />}
/>
          <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/support"
  element={<Support />}
/>

<Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
 path="/admin-dashboard"
 element={<AdminDashboard />}
/>

<Route path="/create-store" element={<CreateStore />} />

<Route
  path="/view-stores"
  element={<ViewStores />}
/>

<Route
  path="/edit-store"
  element={<EditStore />}
/>

<Route
  path="/delete-store"
  element={<DeleteStore />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;