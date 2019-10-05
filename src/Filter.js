import React, { Component } from "react";
import moment from "moment";
import {getPropertyValue} from "fun24js";
import "./Filter.css";

export class Filter extends Component {
  static initFilterFields(list_data) {
    let filter_fields = {};

    if (Array.isArray(list_data) && list_data.length) {
      let firstItem = list_data[0];
      let keys = Object.keys(firstItem);
      keys.forEach( (key) => { filter_fields[key] = "" });
    }

    return { filter_fields };
  }

  static getFilterFieldsOptions(id, filter_options) {
    let filterItemOptions = filter_options.find( item => item.id === id );
    filterItemOptions = filterItemOptions ? filterItemOptions : {};

    if (filterItemOptions.type === "select") {
      if (!filterItemOptions.hasOwnProperty("select") && !filterItemOptions.hasOwnProperty("selectInState")) {
        filterItemOptions.select = [];
      }
    }

    let defaultOption = {
      id: id,
      type: "text",
      alias: String(id).toUpperCase(),
      disabled: false,
      hidden: false,
      className: ""
    };

    return Object.assign(defaultOption, filterItemOptions);
  }

  static compareNumber(data, filterValue) {
    return Number(data) === Number(filterValue);
  }

  static compareString(data, filterValue) {
    return (
      String(data)
        .toLowerCase()
        .indexOf(String(filterValue).toLowerCase()) !== -1
    );
  }

  static compareSelect(data, filterValue) {
    return String(data) === String(filterValue);
  }

  static compareDate(data, filterValue) {
    return (
      moment(data).format("YYYY-MM-DD") ===
      moment(filterValue).format("YYYY-MM-DD")
    );
  }

  static filterPassed(type, data, filterValue) {
    if (type === "date") {
      return this.compareDate(data, filterValue);
    } else if (type === "number") {
      return this.compareNumber(data, filterValue);
    } else if (type === "select") {
      return this.compareSelect(data, filterValue);
    };
    //else, perceive data as a string
    return this.compareString(data, filterValue);
  }

  static runFilter(list_data, filter_fields, filter_options) {
    //find not empty filds
    let filter_fields_notEmpty = {};
    for (let key in filter_fields) {
      if (filter_fields[key]) {
        filter_fields_notEmpty[key] = filter_fields[key];
      }
    }
    //filter list_data
    let list_data_filtered = list_data.filter(
      (item, i, arr) => {
        let pass = true;
        for (let key in filter_fields_notEmpty) {
          pass = pass && this.filterPassed(this.getFilterFieldsOptions(key, filter_options).type, item[key], filter_fields_notEmpty[key]);
          if (!pass) break;
        }
        return pass;
      }
    );
    return list_data_filtered;
  }

  setFilterValue(filterItemName, filterItemValue) {
    this.props.callbackSetFilterValue(filterItemName, filterItemValue);
  }

  clearFilterAllValues(e) {
    this.props.callbackClearFilterAllValues();
  }

  returnSelectOptions (state, filterItemOptions) {
    let link, alias, value, SelectOptionsArray;
    if (filterItemOptions.selectInState) {
      link = filterItemOptions.selectInState.link;
      alias = filterItemOptions.selectInState.alias;
      value = filterItemOptions.selectInState.value;
      SelectOptionsArray = getPropertyValue(state, link).value;
    } else if (filterItemOptions.select) {
      alias = 'alias';
      value = 'value';
      SelectOptionsArray = filterItemOptions.select;
    };

    let optionsJSX = [<option key={0} value={null}>{'---'}</option>]; //0 элемент

    SelectOptionsArray.forEach(function(item) { //пробегаем по массиву и добавляем опцию в select->option, где есть ИМЯ и ЗНАЧЕНИЕ
      optionsJSX.push(<option key={item[value]} value={item[value]}>{item[alias]}</option>);
    })
    return optionsJSX;
  };

  render() {
    let filterFieldsJSX = [];
    for (let key in this.props.filter_fields) {
      let filterItemOptions = Filter.getFilterFieldsOptions(
        key,
        this.props.filter_options
      );

      let curentFilterValue = this.props.filter_fields[key];

      if (filterItemOptions.type === "select") {
        filterFieldsJSX.push(
          <select
            key={key}
            disabled={filterItemOptions.disabled}
            hidden={filterItemOptions.hidden}
            title={filterItemOptions.alias}
            name={filterItemOptions.id}
            value={curentFilterValue}
            className={
              (curentFilterValue ? "ReactFilter__InputelEments_Edit" : "ReactFilter__InputelEments_notEdit") +
              (filterItemOptions.className ? " " + filterItemOptions.className : "")
            }
            onChange={event => {
              this.setFilterValue(event.target.name, event.target.value);
            }}
          >
            {this.returnSelectOptions(this.props.state, filterItemOptions) }
          </select>
        );
      } else {
        filterFieldsJSX.push(
          <input
            key={key}
            disabled={filterItemOptions.disabled}
            hidden={filterItemOptions.hidden}
            type={filterItemOptions.type}
            placeholder={filterItemOptions.alias}
            title={filterItemOptions.alias}
            name={filterItemOptions.id}
            value={curentFilterValue}
            className={
              (curentFilterValue ? "ReactFilter__InputelEments_Edit" : "ReactFilter__InputelEments_notEdit") +
              (filterItemOptions.className ? " " + filterItemOptions.className : "")
            }
            onChange={event => {
              this.setFilterValue(event.target.name, event.target.value);
            }}
          />
        );
      }
      if (this.props.thead) {
        let lastIndex = filterFieldsJSX.length - 1;
        filterFieldsJSX[lastIndex] = <th key={key}>{filterFieldsJSX[lastIndex]}</th>;
      }
    }

    if (this.props.thead) {
      //for table
      return <tr className="ReactFilter__Thead">{filterFieldsJSX}</tr>;
    } else {
      return (
        <div className="ReactFilter">
          {filterFieldsJSX}
          <button onClick={e => this.clearFilterAllValues(e)}>CLEAR</button>
        </div>
      );
    }
  }
}
