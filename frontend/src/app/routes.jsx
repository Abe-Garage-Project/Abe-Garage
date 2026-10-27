import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import PrivateAuthRoute from '../components/auth/PrivateAuthRoute.jsx';
import PublicLayout from '../layouts/PublicLayout.jsx';
import StaffLayout from '../layouts/StaffLayout.jsx';
import PrintLayout from '../layouts/PrintLayout.jsx';
import Home from '../features/public/pages/Home.jsx';
import About from '../features/public/pages/About.jsx';
import Contact from '../features/public/pages/Contact.jsx';
import Services from '../features/public/pages/Services.jsx';
import Login from '../features/auth/pages/Login.jsx';
import ForgotPassword from '../features/auth/pages/ForgotPassword.jsx';
import ResetPassword from '../features/auth/pages/ResetPassword.jsx';
import OrderStatus from '../features/tracking/pages/OrderStatus.jsx';
import Unauthorized from '../features/errors/pages/Unauthorized.jsx';
import NotFound from '../features/errors/pages/NotFound.jsx';
import Dashboard from '../features/dashboard/pages/Dashboard.jsx';
import EmployeeList from '../features/employees/pages/EmployeeList.jsx';
import AddEmployee from '../features/employees/pages/AddEmployee.jsx';
import EditEmployee from '../features/employees/pages/EditEmployee.jsx';
import CustomerList from '../features/customers/pages/CustomerList.jsx';
import AddCustomer from '../features/customers/pages/AddCustomer.jsx';
import EditCustomer from '../features/customers/pages/EditCustomer.jsx';
import CustomerProfile from '../features/customers/pages/CustomerProfile.jsx';
import AddVehicle from '../features/vehicles/pages/AddVehicle.jsx';
import EditVehicle from '../features/vehicles/pages/EditVehicle.jsx';
import VehicleDetails from '../features/vehicles/pages/VehicleDetails.jsx';
import ServiceManagement from '../features/services/pages/ServiceManagement.jsx';
import OrderList from '../features/orders/pages/OrderList.jsx';
import NewOrder from '../features/orders/pages/NewOrder.jsx';
import OrderDetails from '../features/orders/pages/OrderDetails.jsx';
import MyJobs from '../features/jobs/pages/MyJobs.jsx';
import Estimate from '../features/billing/pages/Estimate.jsx';
import Invoice from '../features/billing/pages/Invoice.jsx';
import GarageSettings from '../features/settings/pages/GarageSettings.jsx';
import MyAccount from '../features/profile/pages/MyAccount.jsx';
function StaffLanding() {
  const { employee } = useAuth();
  return employee?.role_id === 1 ? <Navigate to="/admin/my-jobs" replace /> : <Dashboard />;
}
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/order-status/:order_hash" element={<OrderStatus />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<PrivateAuthRoute />}>
        <Route element={<StaffLayout />}>
          <Route path="/admin" element={<StaffLanding />} />
          <Route element={<PrivateAuthRoute roles={[3]} />}>
            <Route path="/admin/employees" element={<EmployeeList />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[3]} />}>
            <Route path="/admin/employee/new" element={<AddEmployee />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[3]} />}>
            <Route path="/admin/employee/:employee_id/edit" element={<EditEmployee />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/customers" element={<CustomerList />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
            <Route path="/admin/customer/new" element={<AddCustomer />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
            <Route path="/admin/customer/:customer_id/edit" element={<EditCustomer />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/customer/:customer_id" element={<CustomerProfile />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
            <Route path="/admin/customer/:customer_id/vehicle/new" element={<AddVehicle />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
            <Route path="/admin/vehicle/:vehicle_id/edit" element={<EditVehicle />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/vehicle/:vehicle_id" element={<VehicleDetails />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[3]} />}>
            <Route path="/admin/services" element={<ServiceManagement />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/orders" element={<OrderList />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
            <Route path="/admin/order/new" element={<NewOrder />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/order/:order_id" element={<OrderDetails />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1]} />}>
            <Route path="/admin/my-jobs" element={<MyJobs />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[3]} />}>
            <Route path="/admin/settings" element={<GarageSettings />} />
          </Route>
          <Route element={<PrivateAuthRoute roles={[1, 2, 3]} />}>
            <Route path="/admin/profile" element={<MyAccount />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PrivateAuthRoute roles={[2, 3]} />}>
        <Route element={<PrintLayout />}>
          <Route path="/admin/order/:order_id/estimate" element={<Estimate />} />
          <Route path="/admin/order/:order_id/invoice" element={<Invoice />} />
        </Route>
      </Route>
    </Routes>
  );
}
