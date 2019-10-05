import React, { Component } from "react";
import moment from "moment";
import { Filter } from "./Filter";
import "./Example.css";

import { filterOptions } from "./filterOptions";

import generateFakeData from "./generateFakeData";

//you can replace the comparison methods (four methods: compareString(this method is used by default), compareNumber,
//compareSelect, compareDate) with your methods, for example
Filter.compareDate = (data, filterValue) => {
  return (
    moment(data).format("YYYY-MM-DD") >= //default '==='
    moment(filterValue).format("YYYY-MM-DD")
  );
}

let timerid;

export class Example extends Component {
  constructor(props) {
    super(props);
    //this.state = {};

    //incoming data, see index.js: <Example list_data = anyAraayOfObject filter_options = anyOptionsFromList_Data_SeeFile_filterOptions.js />
    let list_options = this.props.options;
    let list_data = this.props.list_data;

    //default
    if (!list_options) list_options = [{}];
    if (!list_data) {
      //generate
      list_data = generateFakeData(200, 30);
      list_options = filterOptions;
    }

    //init Filter
    const { filter_fields } = Filter.initFilterFields(list_data);
    const { filter_options } = Filter.initFilterOptions(filter_fields, list_options);

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
      let list_data_filtered = Filter.runFilter(this.state.list_data, this.state.filter_fields, this.state.filter_options);
      this.setState({ list_data_filtered });
    }, 1000);
  }

  clearFilterAllValues() {
    console.log("clear");

    this.setState({
      filter_fields: Filter.initFilterFields(this.state.list_data).filter_fields,
      list_data_filtered: this.state.list_data.slice()
    });
  }

  formatDataType(item, key) {
    let filterItemOptions = this.state.filter_options.find( option => option.id === key );

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
        arrTd.push(<td key={key}>{this.formatDataType(item, key)}</td>);
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
