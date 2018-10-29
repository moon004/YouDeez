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

  componentDidUpdate() {
    console.log('Component Did Update');
  }

  handleChange = value => (e) => {
    const { getAutoComp } = this.props;
    console.log('before setState', e.target.value);
    this.setState({
      value: e.target.value,
    }, () => {
      if (value && value.length > 1) {
        getAutoComp(value);
      }
    });
  }

  handleClick = (value) => {
    const { getAutoComp } = this.props;
    console.log(value);
    this.setState({
      value,
    }, () => {
      getAutoComp(value);
      this.state.value = '';
    });
  }

  render() {
    console.log('Render()');
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
          key={val[0]}
          onClick={this.handleClick(val)}
          value={val}
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
        <SearchIcon onClick={handleSubmit} type="button" />
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
  getAutoComp: PropTypes.func,
};

Search.defaultProps = {
  searchState: {
    fetchState: 'Search',
    data: [],
  },
  autoComplete: {
    currentState: '',
    autoCompData: [],
  },
  handleSubmit: () => {},
  getAutoComp: () => {},
};
export default Search;
