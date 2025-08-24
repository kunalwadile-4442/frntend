import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

export default function DefaultLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
    setIsActive(!isActive);
  };
  return (
    <div className="flex  fixed w-[100%] ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`w-full  ${isSidebarOpen ? 'body-content' : ''}`}>
        <div className="body-wrapper bg-tertiary">
          <Header toggleSidebar={toggleSidebar} isActive={isActive} />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
