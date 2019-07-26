import React, { Component } from "react";
import moment from "moment";
import { Filter } from "./Filter";
import "./Example.css";

import { filterOptions, getOptionsForItem } from "./filterOptions";

import generateFakeData from "./generateFakeData";

let timerid;

export class Example extends Component {
  constructor(props) {
    super(props);
    //this.state = {};

    let filter_options = this.props.options;
    let list_data = this.props.list_data;
    if (!filter_options) filter_options = [{}];
    if (!list_data) {
      //default
      list_data = generateFakeData(200, 30);
      filter_options = filterOptions;
    }

    const { filter_fields } = this.initFilter(list_data);

    this.state = {
      list_data,
      list_data_filtered: list_data.slice(),
      filter_fields,
      filter_options,
      /*for example: put in the state 'select' for 'GATE' (watch options in file 'filterOptions.js')*/
      selects: {
        select_gate: [
          {id: 'GATE1', name: 'Gate 1'},
          {id: 'GATE2', name: 'Gate 2'},
          {id: 'GATE5', name: 'Gate 5'},
          {id: 'GATE10', name: 'Gate 10'},
          {id: 'GATE17', name: 'Gate 17'},
          {id: 'GATE33', name: 'Gate 33'}
        ]
      }
    };
  }

  initFilter(list_data) {
    let filter_fields = {};
    if (list_data.length) {
      let item = list_data[0];
      for (let key in item) {
        filter_fields[key] = "";
      }
    }
    return { filter_fields };
  }

  filterPassed(key, data, filterValue) {
    let filterItemOptions = getOptionsForItem(
      key,
      this.state.filter_options
    );
    if (filterItemOptions.type === "date") {
      return (
        moment(data).format("YYYY-MM-DD") ===
        moment(filterValue).format("YYYY-MM-DD")
      );
    } else if (filterItemOptions.type === "number") {
      return Number(data) === Number(filterValue);
    } else if (filterItemOptions.type === "select") {
      return String(data) === String(filterValue);
    };
    //else, perceive data as a string
    return (
      String(data)
        .toLowerCase()
        .indexOf(String(filterValue).toLowerCase()) !== -1
    );
  }

  runFilter() {
    //find not empty filds
    let filter_fields_notEmpty = {};
    for (let key in this.state.filter_fields) {
      if (this.state.filter_fields[key]) {
        filter_fields_notEmpty[key] = this.state.filter_fields[key];
      }
    }

    let temp_list_data_filtered = this.state.list_data.filter(
      (item, i, arr) => {
        let pass = true;
        for (let key in filter_fields_notEmpty) {
          pass =
            pass &&
            this.filterPassed(key, item[key], filter_fields_notEmpty[key]);
          if (!pass) break;
        }
        return pass;
      }
    );
    this.setState({ list_data_filtered: temp_list_data_filtered });
  }

  setFilterValue(name, value) {
    console.log(name, " = ", value);
    let new_filter_fields = Object.assign({}, this.state.filter_fields);
    Object.assign(new_filter_fields, { [name]: value });
    this.setState({ filter_fields: new_filter_fields });

    if (timerid) {
      clearTimeout(timerid);
    }
    timerid = setTimeout(() => {
      console.log("timer 1sec!!! Fetch or ather actions for filter!!!");
      this.runFilter();
    }, 1000);
  }

  clearFilterAllValues() {
    console.log("clear");

    this.setState({
      filter_fields: this.initFilter(this.state.list_data).filter_fields,
      list_data_filtered: this.state.list_data.slice()
    });
  }

  parseDataType(item, key) {
    let filterItemOptions = getOptionsForItem(
      key,
      this.state.filter_options
    );
    if (filterItemOptions.type === "date") {
      return moment(item[key]).format("YYYY-MM-DD hh:mm");
    } else if (filterItemOptions.type === "number") {
      return Number(item[key]).toLocaleString();
    }
    return String(item[key]);
  }

  render() {
    console.log("render example component");
    let arrThead = [];
    let arrTr = [];
    this.state.list_data_filtered.forEach((item, i, arr) => {
      let arrTd = [];
      for (let key in item) {
        if (i === 0) {
          arrThead.push(<th key={key}>{key.toUpperCase()}</th>);
        }
        arrTd.push(<td key={key}>{this.parseDataType(item, key)}</td>);
      }
      arrTr.push(<tr key={i}>{arrTd}</tr>);
    });
    let jsx_table = (
      <table>
        <thead>
          <tr>{arrThead}</tr>
          <Filter
            thead={true}
            state={this.state}
            filter_options={this.state.filter_options}
            filter_fields={this.state.filter_fields}
            callbackSetFilterValue={(name, value) => {
              this.setFilterValue(name, value);
            }}
            callbackClearFilterAllValues={() => {
              this.clearFilterAllValues();
            }}
          />
        </thead>
        <tbody>{arrTr}</tbody>
      </table>
    );

    return (
      <div className="Example">
        <Filter
          state={this.state}
          filter_options={this.state.filter_options}
          filter_fields={this.state.filter_fields}
          callbackSetFilterValue={(name, value) => {
            this.setFilterValue(name, value);
          }}
          callbackClearFilterAllValues={() => {
            this.clearFilterAllValues();
          }}
        />
        <hr />
        <div className="Example__Table">
          <button onClick={e => console.log("STATE: ", this.state)}>
            show state in console
          </button>
          <br />
          <span>Rows in table: {this.state.list_data_filtered.length}</span>
          <hr />
          {jsx_table}
        </div>
      </div>
    );
  }
}
