import React, { Component } from 'react';
import MonthTable from './MonthTable';
import SortTable from './SortTable';
import YearTable from './YearTable';

const withSort = (WrappedComponent, componentName) => {
  return class extends Component {
    defineList = list => {
      const sortedListAsc = this.sortAsc(list);
      switch (componentName) {
        case 'year':
          return this.groupBy(sortedListAsc, componentName);
        case 'month':
          // const currentYear = new Date().getFullYear();
          const currentYear = new Date('2018').getFullYear();
          const listByCurrentYear = sortedListAsc.filter(
            item => new Date(item.date).getFullYear() === currentYear,
          );
          return this.groupBy(listByCurrentYear, componentName);
        default:
          return list.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    };

    sortAsc = list => {
      return list.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    groupBy = (list, param) => {
      return list.reduce((result, item) => {
        const method =
          param === 'month'
            ? new Date(item.date).toLocaleString('ru', {
                month: 'long',
              })
            : new Date(item.date).getFullYear();

        const element = result.find(item => item[param] === method);
        if (element) {
          element.amount += item.amount;
        } else {
          result.push({ [param]: method, amount: item.amount });
        }
        return result;
      }, []);
    };

    render() {
      const { list } = this.props;
      return <WrappedComponent list={this.defineList(list)} />;
    }
  };
};

const SortByMonthTable = withSort(MonthTable, 'month');
const SortByYearTable = withSort(YearTable, 'year');
const DefaultSortTable = withSort(SortTable);

export { SortByMonthTable, SortByYearTable, DefaultSortTable };
