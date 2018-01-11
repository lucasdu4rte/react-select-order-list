import React from 'react';
import { List } from 'immutable';
import SelectOrderList from '../../../src/index';
import '../../../src/list-control/react-select-order-list.component.scss';
import './style.scss';

export default class ListItemsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableData: List([
        {
          label: 'one',
          value: 'one',
        },
        {
          label: 'two',
          value: 'two',
        },
        {
          label: 'three',
          value: 'three',
        },
      ]),
      selectedData: List([
        {
          label: 'two',
          value: 'two',
        },
        {
          label: 'three',
          value: 'three',
        },
      ]),
      allSelected: false,
    };
  }

  onAllSelectionChange = (allSelected) => {
    const selectedData = allSelected ? this.state.availableData : List();
    this.setState({ allSelected, selectedData });
  }

  onChange =(data) => {
    this.setState(data);
  }

  render() {
    return (
      <div className="oc-select-order-list">
        <SelectOrderList
          availableData={this.state.availableData}
          selectedData={this.state.selectedData}
          dataSelectionId="selectedData"
          allSelectionId="allSelected"
          availableListLabel="Available data"
          selectedListLabel="Selected data"
          allLabel="All"
          allSelected={this.state.allSelected}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
