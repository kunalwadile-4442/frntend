import AdminDashboard from './AdminDashboard';
import { usePosterReducers } from '../../../../redux/getdata/usePostReducer';
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const { user_data } = usePosterReducers();
  // if (checkPermission(user_data, "frontDashboardService:get")) {
  if (user_data?.user?.role === 'admin') {
    return <AdminDashboard />;
  }
  else {
    return <Navigate to={"/"} />
  }
}

export default Dashboard