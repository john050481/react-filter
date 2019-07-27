import React, { Component } from "react";
import {getPropertyValue} from "fun24js";
import "./Filter.css";

import { getOptionsForItem } from "./filterOptions";

export class Filter extends Component {
  setFilterValue(name, value) {
    this.props.callbackSetFilterValue(name, value);
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

    let optionsJsx = [<option key={0} value={null}>{'---'}</option>]; //0 элемент

    SelectOptionsArray.forEach(function(item) { //пробегаем по массиву и добавляем опцию в select->option, где есть ИМЯ и ЗНАЧЕНИЕ
      optionsJsx.push(<option key={item[value]} value={item[value]}>{item[alias]}</option>);
    })
    return optionsJsx;
  };

  render() {
    let filter_list = [];
    for (let key in this.props.filter_fields) {
      let filterItemOptions = getOptionsForItem(
        key,
        this.props.filter_options
      );

      let curentFilterValue = this.props.filter_fields[key];

      if (filterItemOptions.type === "select") {
        filter_list.push(
          <select
            key={key}
            disabled={filterItemOptions.disabled}
            hidden={filterItemOptions.hidden}
            title={filterItemOptions.alias}
            name={filterItemOptions.id}
            value={curentFilterValue}
            className={
              curentFilterValue
                ? "ReactFilter__InputelEments_Edit"
                : "ReactFilter__InputelEments_notEdit"
            }
            onChange={event => {
              this.setFilterValue(event.target.name, event.target.value);
            }}
          >
            {this.returnSelectOptions(this.props.state, filterItemOptions) }
          </select>
        );
      } else {
        filter_list.push(
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
              curentFilterValue
                ? "ReactFilter__InputelEments_Edit"
                : "ReactFilter__InputelEments_notEdit"
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
      return <tr className="ReactFilterThead">{filter_list}</tr>;
    } else {
      return (
        <div className="ReactFilter">
          {filter_list}
          <button onClick={e => this.clearFilterAllValues(e)}>CLEAR</button>
        </div>
      );
    }
  }
}
