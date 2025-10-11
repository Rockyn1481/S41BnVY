// 代码生成时间: 2025-10-11 22:48:40
import React, { useState } from 'react';

// Represents a data item in the table.
interface TableRow {
  id: number;
  name: string;
  age: number;
}

// The TableSortFilter component.
const TableSortFilter: React.FC = () => {
  // Sample data for the table.
  const initialData: TableRow[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  // State to hold the filtered and sorted data.
  const [data, setData] = useState<TableRow[]>(initialData);

  // State to hold the current filter string.
  const [filter, setFilter] = useState<string>('\'');

  // State to hold the current sort key.
  const [sortKey, setSortKey] = useState<string | null>(null);

  // Function to handle sorting.
  const handleSort = (key: keyof TableRow) => {
    setData((prevData) => {
      const isAsc = sortKey === key && prevData[0][key] < prevData[1][key];
      return prevData.sort((a, b) => {
        if (a[key] < b[key]) return isAsc ? 1 : -1;
        if (a[key] > b[key]) return isAsc ? -1 : 1;
        return 0;
      });
    });
    setSortKey((prevSortKey) => (prevSortKey === key ? null : key));
  };

  // Function to handle filtering.
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
    const filteredData = initialData.filter((item) => item.name.includes(value));
    setData(filteredData);
  };

  // Render the table header with sorting capabilities.
  const renderHeaderCell = (key: keyof TableRow) => {
    return (
      <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>{
        key.charAt(0).toUpperCase() + key.slice(1) + (sortKey === key ? ' ↑↓' : '')
      }</th>
    );
  };

  // Render the table rows.
  const renderRows = () => {
    return data.map((row) => (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.age}</td>
      </tr>
    ));
  };

  // Handle error if data is not in the expected format.
  if (!Array.isArray(data) || data.some((item) => !(item.hasOwnProperty('id') && item.hasOwnProperty('name') && item.hasOwnProperty('age')))) {
    throw new Error('Data must be an array of TableRow objects.');
  }

  return (
    <div>
      {/* Search input for filtering by name. */}
      <input
        type='text'
        placeholder='Filter by name...'
        value={filter}
        onChange={handleFilter}
      />
      {/* Table and table header. */}
      <table>
        <thead>
          <tr>
            {renderHeaderCell('id')}
            {renderHeaderCell('name')}
            {renderHeaderCell('age')}
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default TableSortFilter;