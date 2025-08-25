/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { getSidebarList } from '../../utils/common'
import { usePosterReducers } from '../../redux/getdata/usePostReducer';
import { Navigate } from 'react-router-dom';
import { App_url } from '../../utils/constants/static';

export default function PageValidator() {
  const { user_data } = usePosterReducers();
  const SidebarListing = useMemo(()=>getSidebarList(user_data), [user_data?.user?.role, user_data?.user?.api_permissions, user_data?.user?.role_permissions])
  const isDashboard = useMemo(()=>{
    return SidebarListing?.find((item)=>item?.route === "/dashboard")
  },[SidebarListing])
  if(!user_data?.accessToken){
    return(
        <Navigate to={App_url.link.SIGNIN_URL} />
    )
  }
  return (
    <div>
        {isDashboard? <Navigate to={App_url.link.DASHBOARD_URL} />: <Navigate to={SidebarListing?.[0]?.route} />}
    </div>
  )
}
