import React from 'react';
import shortid from 'shortid';

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
          {props.list.map(item => (
            <tr key={shortid.generate()}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthTable;
