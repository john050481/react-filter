import React, { Component } from "react";
import "./Filter.css";

import { getOptionsForItem } from "./defaultOptionsItems";

export class Filter extends Component {
  setFilterValue(name, value) {
    this.props.callbackSetFilterValue(name, value);
  }

  clearFilterAllValues(e) {
    this.props.callbackClearFilterAllValues();
  }

  render() {
    let filter_list = [];
    for (let key in this.props.filter_fields) {
      let defaultOptionsForItem = getOptionsForItem(
        key,
        this.props.filter_options
      );

      let curentFilterValue = this.props.filter_fields[key];

      if (defaultOptionsForItem.type === "select") {
        filter_list.push(
          <select
            key={key}
            disabled={defaultOptionsForItem.disabled}
            hidden={defaultOptionsForItem.hidden}
            title={defaultOptionsForItem.alias}
            name={defaultOptionsForItem.id}
            value={curentFilterValue}
            className={
              curentFilterValue
                ? "ClassCompFilter_InputelEments_Edit"
                : "ClassCompFilter_InputelEments_notEdit"
            }
            onChange={event => {
              this.setFilterValue(event.target.name, event.target.value);
            }}
          >
            <option value={""}>---</option>
            {defaultOptionsForItem.select.map((item, i, arr) => {
              return (
                <option key={i} value={item.value}>
                  {item.alias}
                </option>
              );
            })}
          </select>
        );
      } else {
        filter_list.push(
          <input
            key={key}
            disabled={defaultOptionsForItem.disabled}
            hidden={defaultOptionsForItem.hidden}
            type={defaultOptionsForItem.type}
            placeholder={defaultOptionsForItem.alias}
            title={defaultOptionsForItem.alias}
            name={defaultOptionsForItem.id}
            value={curentFilterValue}
            className={
              curentFilterValue
                ? "ClassCompFilter_InputelEments_Edit"
                : "ClassCompFilter_InputelEments_notEdit"
            }
            onChange={event => {
              this.setFilterValue(event.target.name, event.target.value);
            }}
          />
        );
      }
      if (this.props.thead) {
        let lastIndex = filter_list.length - 1;
        filter_list[lastIndex] = <th key={key}>{filter_list[lastIndex]}</th>;
      }
    }

    if (this.props.thead) {
      //for table
      return <tr className="ClassCompFilterThead">{filter_list}</tr>;
    } else {
      return (
        <div className="ClassCompFilter" id="filterInputElements">
          {filter_list}
          <button onClick={e => this.clearFilterAllValues(e)}>CLEAR</button>
        </div>
      );
    }
  }
}
