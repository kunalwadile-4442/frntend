/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { usePosterReducers } from "./app/redux/getdata/usePostReducer";
import { App_url } from "./app/utils/constants/static";
import Alert from "./app/view/components/Alert";
import DefaultLayout from "./app/view/components/layout/DefaultLayout";
import ConfirmModalPopup from "./app/view/components/layout/popup/ConfirmModalPopup";
import PageValidator from "./app/view/components/PageValidator";
import CollegeMaster from "./app/view/pages/admin/college_management/master";
import AddcollegeMasterForm from "./app/view/pages/admin/college_management/master/form";
import Dashboard from "./app/view/pages/admin/dashboard";
import ForgetPassword from "./app/view/pages/Auth/forgetPassword";
import Resetpassword from "./app/view/pages/Auth/resetPassword";
import SignIn from "./app/view/pages/Auth/signIn";


import Profile from "./app/view/pages/admin/profile";
import ConfirmPassword from "./app/view/pages/Auth/confirmpassword/index";



function App() {
  const reduxData = usePosterReducers();
  const { user_data } = reduxData;
  const navigate = useNavigate();

  const LoginRoute = () => {
    return (
      <React.Fragment>
        <Route path={App_url.link.INITIAL_URL} element={<SignIn />} />
        <Route path={App_url.link.SIGNIN_URL} element={<SignIn />} />
        <Route path={App_url.link.FORGET_PASSWORD_URL} element={<ForgetPassword />} />
        <Route path={"*"} element={<Navigate replace to={App_url.link.SIGNIN_URL} />} />
        <Route path={App_url.link.RESET_PASSWORD_URL} element={<Resetpassword />} />
        <Route path={App_url.link.CONFIRM_PASSWORD_URL} element={< ConfirmPassword/>} />
      </React.Fragment>
    )
  }

  return (
    <main className="">
      <Alert />
      <Routes>
        {!user_data?.is_Login ? (
          LoginRoute()
        ) : (
          <React.Fragment>
            <Route path={"/"} element={<DefaultLayout />}>
              <Route index element={<PageValidator />} />
              <Route index element={<Dashboard />} />
              <Route path={App_url.link.DASHBOARD_URL} element={<Dashboard />} />
              <Route path={App_url.link.COLLEGE_MASTER_URL} element={<CollegeMaster />} />
              <Route path={App_url.link.ADD_COLLEGE_MASTER_URL} element={<AddcollegeMasterForm />} />
              <Route path={App_url.link.EDIT_COLLEGE_MASTER_URL} element={<AddcollegeMasterForm />} />

            
                <Route path={App_url.link.EDIT_PROFILE} element={<Profile />} />
            </Route>
          </React.Fragment>
        )}
      </Routes>
      <ConfirmModalPopup />
    </main>
  );
}

export default App;