import React from 'react';
import PageLayout from '../../../components/layout/PageLayout';
import { App_url } from '../../../../utils/constants/static';

const AdminDashboard: React.FC = () => {
  return (
    <PageLayout>
      <div className=" bg-gray-100">
        <div className="grid grid-cols-4 gap-4 mb-8 bg-white p-2 rounded-lg">
          <div className="w-[260px] h-[150px] p-4 rounded-lg  text-center" style={{
            backgroundImage: `url(${App_url.image.card1})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "object-fit",
            backgroundRepeat: "no-repeat",
          }}>
          </div>
          <div className="w-[260px] h-[150px] p-4 rounded-lg  text-center" style={{
            backgroundImage: `url(${App_url.image.card2})`,
            backgroundSize: "contain",
            backgroundPosition: "object-fit",
            backgroundRepeat: "no-repeat",
          }}>
          </div>
          <div className="w-[260px] h-[150px] p-4 rounded-lg  text-center" style={{
            backgroundImage: `url(${App_url.image.card3})`,
            backgroundSize: "contain",
            backgroundPosition: "object-fit",
            backgroundRepeat: "no-repeat",
          }}>
          </div>
          <div className="w-[260px] h-[150px] p-4 rounded-lg  text-center" style={{
            backgroundImage: `url(${App_url.image.card4})`,
            backgroundSize: "contain",
            backgroundPosition: "object-fit",
            backgroundRepeat: "no-repeat",
          }}>
          </div>
        </div>

        {/* Activity Logs and Reports Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Activity Logs */}
          <div className="bg-white rounded-lg  p-4">
            <h3 className="font-semibold text-lg mb-4">Activity Logs</h3>
            <ul>
              {['In Processing', 'Completed', 'Rejected', 'Rejected'].map((status, index) => (
                <li
                  key={index}
                  className={`flex justify-center items-center gap-2 py-2 border-b ${index === 3 ? '' : 'border-gray-200'
                    }`}
                >
                  <span>Student Amit Sharma applied for MBBS at XYZ College</span>
                  <span
                    className={`ml-auto w-[150px] text-center px-3 py-1 rounded-full text-sm ${status === 'In Processing'
                      ? 'bg-yellow-100 text-yellow-600'
                      : status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reports & Exports */}
          <div className="bg-white rounded-lg  p-4">
            <h3 className="font-semibold text-lg mb-4">Reports & Exports</h3>
            <ul>
              {[
                { name: 'Student Admissions Report', types: ['PDF', 'CSV'] },
                { name: 'Payment Transactions Report', types: ['PDF', 'CSV'] },
                { name: 'Refund History', types: ['PDF', 'CSV'] },
              ].map((report, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center py-2 border-b ${index === 2 ? '' : 'border-gray-200'
                    }`}
                >
                  <span>{report.name}</span>
                  <div className="flex space-x-2">
                    {report.types.map((type) => (
                      <button
                        key={type}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
