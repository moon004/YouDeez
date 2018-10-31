import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input, SearchIcon, Div, List,
} from '../styling/Search.style';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputRef = React.createRef();
  }

  handleChange = value => (e) => {
    const { onGetAutoComp } = this.props;
    this.setState({
      value: e.target.value,
    }, () => {
      if (value && value.length > 1) {
        onGetAutoComp(value);
      }
    });
  }

  handleClick = value => () => {
    const { onGetAutoComp } = this.props;
    this.setState({}, () => {
      onGetAutoComp(value);
      this.state.value = value;
    });
  }

  render() {
    const {
      searchState: {
        fetchState,
      },
      autoComplete: {
        currentState,
        autoCompData,
      },
      handleSubmit,
    } = this.props;
    const { value } = this.state;
    let autoList;
    if (currentState === 'Success') {
      autoList = autoCompData[1].map(val => (

        <List
          key={val}
          onClick={this.handleClick(val)}
        >
          {val}
        </List>
      ));
      if (value === '') {
        autoList = <div />;
      }
    }
    return (
      <Div position="relative">
        <SearchIcon
          onClick={handleSubmit}
          type="button"
          blink={fetchState === 'Searching'}
        />
        <Input
          id="searchInput"
          type="text"
          onChange={this.handleChange(value)}
          placeholder={fetchState}
          value={value}
          ref={this.inputRef}
          onMouseEnter={() => { this.inputRef.current.focus(); }}
        />
        {autoList}
      </Div>

    );
  }
}

Search.propTypes = {
  searchState: PropTypes.shape(
    {
      fetchState: PropTypes.string,
      data: PropTypes.array,
    },
  ),
  autoComplete: PropTypes.shape(
    {
      currentState: PropTypes.string,
      autoCompData: PropTypes.array,
    },
  ),
  handleSubmit: PropTypes.func,
  onGetAutoComp: PropTypes.func,
};

Search.defaultProps = {
  searchState: {
    fetchState: 'Search', // Initial state will take value from reducer initialState
    data: [],
  },
  autoComplete: {
    currentState: '',
    autoCompData: [],
  },
  handleSubmit: () => {},
  onGetAutoComp: () => {},
};
export default Search;
