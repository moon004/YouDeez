import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      resData: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = this.state;
    const { getAutoComp } = this.props;
    this.setState({
      value: e.target.value,
    }, () => {
      if (value && value.length > 1) {
        if (value.length % 2 === 0) {
          getAutoComp(value);
        }
      }
    });
  }

  render() {
    const {
      searchState: {
        fetchState,
      },
      autoComplete: {
        currentState,
      },
      handleSubmit,
    } = this.props;
    const { value } = this.state;
    let buttonState = 'Submit';
    if (currentState === 'Fail') {
      buttonState = 'Fail';
    } else if (currentState === 'Success') {
      buttonState = 'Success';
    }
    return (
      <div>
        <input
          id="searchInput"
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder={fetchState}
        />
        <button onClick={handleSubmit} type="button">{buttonState}</button>

      </div>

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
      data: PropTypes.array,
    },
  ),
  handleSubmit: PropTypes.func,
  getAutoComp: PropTypes.func,
};

Search.defaultProps = {
  searchState: {
    fetchState: 'Search',
    data: '',
  },
  autoComplete: {
    currentState: '',
    data: [],
  },
  handleSubmit: () => {},
  getAutoComp: () => {},
};
export default Search;
