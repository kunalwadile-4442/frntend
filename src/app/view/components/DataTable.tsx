import React from 'react';

interface DataTableProps {
  title: string;
  data: { rows: { cells: string[] }[] };
}

const DataTable: React.FC<DataTableProps> = ({ title, data }) => {
  return (
    <>
      <p className="font-bold text-sm">{title}:</p>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full bg-[#f4f9fb] border-collapse">
          <tbody>
            {data?.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`p-1 text-sm ${
                      (rowIndex === data?.rows.length - 1 && cellIndex === row.cells.length - 1) ? 'rounded-br-lg' : ''
                    } ${
                      (rowIndex === 0 && cellIndex === row.cells.length - 1) ? 'rounded-tr-lg' : ''
                    } ${
                      (rowIndex === data?.rows.length - 1 && cellIndex === 0) ? 'rounded-bl-lg' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
