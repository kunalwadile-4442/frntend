import React from "react";


interface IReportTableProps {
    tableData?: any;
    tableTitle?:any;
}
const ReportTableUI: React.FunctionComponent<IReportTableProps> = (props) => {
    let allTotalAmount = 0;
    let allOpenBalanceAmount = 0;
    props?.tableData?.forEach?.((customer) => {
        customer?.projectData?.forEach?.((project) => {
            project?.invoiceList?.forEach?.((invoice) => {
                allTotalAmount += parseFloat(invoice.amount);
                allOpenBalanceAmount += parseFloat(invoice.open_balance);
            });
        });
    });

    return (
        <div className="">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-[#EAF4F8]">
                        {props?.tableTitle.map((col, index) => (
                            <th
                                key={index}
                                className="py-2 px-4 text-left text-[#4E4E4E] font-[600] border-b"
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-t bg-white font-[600]">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="py-2 px-4">Total</td>
                        <td className="py-2 px-4">{allTotalAmount}</td>
                        <td className="py-2 px-4">{allOpenBalanceAmount}</td>
                    </tr>
                    {props?.tableData?.map?.((customer, customerIndex) =>
                        customer?.projectData?.map?.((project, projectIndex) => {
                            let totalAmount = 0;
                            let totalBalanceAmount = 0;
                            return (
                                <React.Fragment key={`${customerIndex}-${projectIndex}`}>
                                    <tr className="border-b border-t bg-white">
                                        <td
                                            colSpan={7}
                                            className="py-2 px-4 text-black font-[600] border-b"
                                        >
                                            {customer.customer_name}
                                        </td>
                                    </tr>
                                    <tr className="border-b bg-white">
                                        <td
                                            rowSpan={project.invoiceList.length + 1}
                                            className="py-2 px-4 text-black border-b"
                                        >
                                            {project.project_name}
                                        </td>
                                    </tr>
                                    {project?.invoiceList?.map?.((invoice, invoiceIndex) => {
                                        totalAmount += parseFloat(invoice.amount);
                                        totalBalanceAmount += parseFloat(invoice.open_balance);
                                        return (
                                            <tr key={`invoice-${invoiceIndex}`} className="bg-white">
                                                <td className="py-2 px-4">{invoice.invoice_number}</td>
                                                <td className="py-2 px-4">{invoice.invoice_data}</td>
                                                <td className="py-2 px-4">{invoice.due_date}</td>
                                                <td className="py-2 px-4">{invoice.post_due}</td>
                                                <td className="py-2 px-4">{invoice.amount}</td>
                                                <td className="py-2 px-4">{invoice.open_balance}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr className="border-t bg-[#F4FBF7]">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="py-2 px-4">Total</td>
                                        <td className="py-2 px-4">{totalAmount}</td>
                                        <td className="py-2 px-4">{totalBalanceAmount}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTableUI;
