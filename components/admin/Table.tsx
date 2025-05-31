type TableProps = {
  columns: string[];
  data: any[][];
};

const Table = ({ columns, data }: TableProps) => {
  return (
    <table className="w-full overflow-hidden text-left border border-gray-200 rounded-md bg-white/10 border-white/10">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-3 text-sm font-semibold text-white bg-gray-800 border-b border-white/10">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="transition hover:bg-white/5">
            {row.map((cell, i) => (
              <td key={i} className="p-3 text-sm text-gray-200 border-b border-white/10">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
