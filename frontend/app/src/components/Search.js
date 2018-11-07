import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input, SearchIcon, Div, List,
} from '../styling/Search.style';
import {
  SEARCHING,
  SEARCHDONE,
} from '../constants/constant';

const ulStyle = {
  margin: '-1em 0 0 0',
  padding: 0,
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputRef = React.createRef();
  }

  handleChange = () => (event) => {
    const { onGetAutoComp } = this.props;
    console.log(event.target.value);
    this.setState({
      value: event.target.value,
    });
    if (event.target.value.length > 0) {
      onGetAutoComp(event.target.value);
    }
  }

  handleClick = value => () => {
    const { onGetAutoComp, handleSubmit } = this.props;
    this.setState({}, () => {
      onGetAutoComp(value);
      this.state.value = value;
    });
    handleSubmit(value);
  }

  handleSubmitClick = value => () => {
    const { handleSubmit } = this.props;
    handleSubmit(value);
    this.setState({
      value: '',
    });
  }

  handleKeyPress = (event) => {
    const { handleSubmit } = this.props;
    const { value } = this.state;
    if (event.key === 'Enter' && value.length > 0) {
      console.log('enter pressed');
      handleSubmit(value);
    }
  }

  render() {
    const {
      searchState: {
        fetchState,
      },
      autoComplete: {
        currentState,
      },
    } = this.props;
    let {
      autoComplete: {
        autoCompData,
      },
    } = this.props;
    const { value } = this.state;
    let autoList;
    let errorCode = '';
    if (currentState === 'Success') {
      autoList = autoCompData[1].map(val => (

        <List
          key={val}
          onClick={this.handleClick(val)}
        >
          {val}
        </List>
      ));
      if (fetchState === 'Error') {
        errorCode = 'Make sure you have internet access';
      }
      // empty the autocomplete list
      if (value === '' || fetchState === SEARCHING || fetchState === SEARCHDONE) {
        autoList = <div />;
        autoCompData = [];
        errorCode = '';
      }
    }
    return (
      <Div position="relative">
        <div style={{
          color: '#e40303',
          fontSize: '0.8em',
          marginLeft: '0.9em',
          top: '-1.6em',
          position: 'absolute',
        }}
        >
          {errorCode}
        </div>
        <SearchIcon
          onClick={this.handleSubmitClick(value)}
          value={value}
          type="button"
          blink={fetchState === 'Searching'}
        />
        <Input
          id="searchInput"
          type="text"
          onChange={this.handleChange(value)}
          onKeyPress={this.handleKeyPress}
          placeholder={fetchState}
          value={value}
          ref={this.inputRef}
          onMouseEnter={() => { this.inputRef.current.focus(); }}
          popList={autoCompData.length > 0}
        />
        <ul style={ulStyle}>
          {autoList}
        </ul>
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
