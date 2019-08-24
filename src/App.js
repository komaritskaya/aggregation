import React, { Component } from 'react';
import axios from 'axios';
import {
  SortByMonthTable,
  SortByYearTable,
  DefaultSortTable,
} from './components/WithSort';
import './App.css';

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    axios
      .get(
        'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json',
      )
      .then(response => {
        this.setState(response.data);
      });
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <SortByMonthTable list={list} />
        <SortByYearTable list={list} />
        <DefaultSortTable list={list} />
      </div>
    );
  }
}
