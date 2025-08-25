/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";
import { useNavigate, Route, Navigate, Routes } from "react-router-dom";
import { usePosterReducers } from "./app/redux/getdata/usePostReducer";
import { App_url } from "./app/utils/constants/static";
import Alert from "./app/view/components/Alert";
import DefaultLayout from "./app/view/components/layout/DefaultLayout";
import ConfirmModalPopup from "./app/view/components/layout/popup/ConfirmModalPopup";
import PageValidator from "./app/view/components/PageValidator";
import ForgetPassword from "./app/view/pages/Auth/forgetPassword";
import Resetpassword from "./app/view/pages/Auth/resetPassword";
import confirmPassword from "./app/view/pages/Auth/confirmpassword/index";
import SignIn from "./app/view/pages/Auth/signIn";
import Dashboard from "./app/view/pages/dashboard";
import CollegeMaster from "./app/view/pages/college_management/master";
import AddcollegeMasterForm from "./app/view/pages/college_management/master/form";
import StudentManagement from "./app/view/pages/student_management";
import AddStudentForm from "./app/view/pages/student_management/form";
import CollegeList from "./app/view/pages/student_management/college/list";
import Packages from "./app/view/pages/master_management/package";
import Category from "./app/view/pages/master_management/category";
import AddCategory from "./app/view/pages/master_management/category/form";
import Ug from "./app/view/pages/master_management/ug";
import AddUgForm from "./app/view/pages/master_management/ug/form";
import Pg from "./app/view/pages/master_management/pg";
import District from "./app/view/pages/master_management/district";
import AddDistrict from "./app/view/pages/master_management/district/form";
import BoardExam from "./app/view/pages/master_management/board_exam";
import AddBoardExam from "./app/view/pages/master_management/board_exam/form";
import PassingYear from "./app/view/pages/master_management/passing_year";
import AddPassingYear from "./app/view/pages/master_management/passing_year/form";
import Payments from "./app/view/pages/payments";
import AddPaymentForm from "./app/view/pages/payments/form";
import Reports from "./app/view/pages/reports";
import AddReportForm from "./app/view/pages/reports/form";
import News from "./app/view/pages/news";
import AddNewsForm from "./app/view/pages/news/form";
import Notification from "./app/view/pages/notification";
import AddNotificationFOrm from "./app/view/pages/notification/form";
import ActivityLog from "./app/view/pages/activity_logs";
import AddActivityLogForm from "./app/view/pages/activity_logs/form";
import Admission from "./app/view/pages/admission";
import AddAdmissionForm from "./app/view/pages/admission/form";
import AddPackageForm from "./app/view/pages/master_management/package/form";
import AddPgForm from "./app/view/pages/master_management/pg/form";
import AddCategoryForm from "./app/view/pages/master_management/category/form";
import SubCategory from "./app/view/pages/master_management/subcategory";
import AddSubCategoryForm from "./app/view/pages/master_management/subcategory/form";
import AddDistrictForm from "./app/view/pages/master_management/district/form";
import CollegeType from "./app/view/pages/master_management/collegetype";
import AddCollegeTypeForm from "./app/view/pages/master_management/collegetype/form";
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

              <Route path={App_url.link.STD_MANAGEMENT_URL} element={<StudentManagement />} />
              <Route path={App_url.link.ADD_STUDENT_URL} element={<AddStudentForm />} />
              <Route path={App_url.link.EDIT_STUDENT_URL} element={<AddStudentForm />} />
              <Route path={App_url.link.STD_MANAGEMENT_COLLEGE_LIST_URL} element={<CollegeList />} />

              <Route path={App_url.link.PACKAGE_URL} element={<Packages />} />
              <Route path={App_url.link.ADD_PACKAGE_URL} element={<AddPackageForm />} />
              <Route path={App_url.link.EDIT_PACKAGE_URL} element={<AddPackageForm />} />

              <Route path={App_url.link.CATEGORY_URL} element={<Category />} />
              <Route path={App_url.link.ADD_CATEGORY_URL} element={<AddCategoryForm />} />
              <Route path={App_url.link.EDIT_CATEGORY_URL} element={<AddCategoryForm />} />

              <Route path={App_url.link.SUB_CATEGORY_URL} element={<SubCategory />} />
              <Route path={App_url.link.ADD_SUB_CATEGORY_URL} element={<AddSubCategoryForm />} />
              <Route path={App_url.link.EDIT_SUB_CATEGORY_URL} element={<AddSubCategoryForm />} />

              <Route path={App_url.link.UG_URL} element={<Ug />} />
              <Route path={App_url.link.ADD_UG_URL} element={<AddUgForm />} />
              <Route path={App_url.link.EDIT_UG_URL} element={<AddUgForm />} />

              <Route path={App_url.link.PG_URL} element={<Pg />} />
              <Route path={App_url.link.ADD_PG_URL} element={<AddPgForm />} />
              <Route path={App_url.link.EDIT_PG_URL} element={<AddPgForm />} />

              <Route path={App_url.link.DISTRICT_URL} element={<District />} />
              <Route path={App_url.link.ADD_DISTRICT_URL} element={<AddDistrictForm />} />
              <Route path={App_url.link.EDIT_DISTRICT_URL} element={<AddDistrictForm />} />

              <Route path={App_url.link.COLLEGE_TYPE_URL} element={<CollegeType />} />
              <Route path={App_url.link.ADD_COLLEGE_TYPE_URL} element={<AddCollegeTypeForm />} />
              <Route path={App_url.link.EDIT_COLLEGE_TYPE_URL} element={<AddCollegeTypeForm />} />

              <Route path={App_url.link.BOARD_EXAM_URL} element={<BoardExam />} />
              <Route path={App_url.link.ADD_BOARD_EXAM_URL} element={<AddBoardExam />} />
              <Route path={App_url.link.EDIT_BOARD_EXAM_URL} element={<AddBoardExam />} />

              <Route path={App_url.link.PASSING_YEAR_URL} element={<PassingYear />} />
              <Route path={App_url.link.ADD_PASSING_YEAR_URL} element={<AddPassingYear />} />
              <Route path={App_url.link.EDIT_PASSING_YEAR_URL} element={<AddPassingYear />} />

              <Route path={App_url.link.PAYMENTS_URL} element={<Payments />} />
              <Route path={App_url.link.ADD_PAYMENTS_URL} element={<AddPaymentForm />} />
              <Route path={App_url.link.EDIT_PAYMENTS_URL} element={<AddPaymentForm />} />

              <Route path={App_url.link.ACTIVITY_LOG_URL} element={<ActivityLog />} />
              <Route path={App_url.link.ADD_ACTIVITY_LOG_URL} element={<AddActivityLogForm />} />
              <Route path={App_url.link.EDIT_ACTIVITY_LOG_URL} element={<AddActivityLogForm />} />

              <Route path={App_url.link.REPORT_URL} element={<Reports />} />
              <Route path={App_url.link.ADD_REPORT_URL} element={<AddReportForm />} />
              <Route path={App_url.link.EDIT_REPORT_URL} element={<AddReportForm />} />

              <Route path={App_url.link.NEWS_ALERT_URL} element={<News />} />
              <Route path={App_url.link.ADD_NEWS_ALERT_URL} element={<AddNewsForm />} />
              <Route path={App_url.link.EDIT_NEWS_ALERT_URL} element={<AddNewsForm />} />

              <Route path={App_url.link.NOTIFICATION_URL} element={<Notification />} />
              <Route path={App_url.link.ADD_NOTIFICATION_URL} element={<AddNotificationFOrm />} />
              <Route path={App_url.link.EDIT_NOTIFICATION_URL} element={<AddNotificationFOrm />} />

              <Route path={App_url.link.ADMISSION_URL} element={<Admission />} />
              <Route path={App_url.link.ADD_ADMISSION_URL} element={<AddAdmissionForm />} />
              <Route path={App_url.link.EDIT_ADMISSION_URL} element={<AddAdmissionForm />} />




            </Route>
          </React.Fragment>
        )}
      </Routes>
      <ConfirmModalPopup />
    </main>
  );
}

export default App;