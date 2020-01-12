import React, { Component } from 'react';
import { searchPropTypes, searchDefaultProps } from '../props';
import {
  Input, SearchIcon, List,
} from '../styling/Search.style';
import {
  SEARCHING,
  SEARCHDONE,
} from '../constants/constant';

const divStyle = {
  color: '#e40303',
  fontSize: '0.8em',
  marginLeft: '0.9em',
  top: '-1.6em',
  position: 'absolute',
};

class Search extends Component {
  static propTypes = searchPropTypes;

  static defaultProps = searchDefaultProps;

  constructor() {
    super();
    this.state = {
      cursor: -1,
      value: '',
      searchDone: true,
      autoList: null,
      focused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputRef = React.createRef();
  }


  handleChange = () => (event) => {
    const { onGetAutoComp } = this.props;
    this.setState({
      value: event.target.value,
      searchDone: false,
    });
    if (event.target.value.length > 0) {
      onGetAutoComp(event.target.value);
    }
  }

  onBlur = () => {
    this.setState({ focused: true });
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  // click on autocomeplete list
  handleClick = value => () => {
    const { onGetAutoComp, onSubmitSearch } = this.props;
    this.setState({}, () => {
      onGetAutoComp(value);
      this.state.value = value;
    });
    onSubmitSearch(value);
    this.setState({ searchDone: true });
  }

  // Click on Search Icon
  handleSubmitClick = value => () => {
    const { onSubmitSearch } = this.props;
    onSubmitSearch(value);
    this.setState({ searchDone: true });
  }

  // Enter pressed
  handleKeyPress = (event) => {
    const { onSubmitSearch } = this.props;
    const { value } = this.state;
    if (event.key === 'Enter' && value.length > 0) {
      this.setState({
        searchDone: true,
      }, () => {
        onSubmitSearch(value);
      });
    }
  }

  // On ArrowKey Pressed
  handleKeyDown = (event) => {
    const { cursor } = this.state;
    const { onGetAutoComp } = this.props;
    const {
      autoComplete: {
        autoCompData,
      },

    } = this.props;
    if (event.key === 'Enter') {
      this.handleKeyPress(event);
    }
    if (autoCompData.length > 0) {
      //    key Up
      if (event.key === 'ArrowUp' && cursor > -1) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1,
          value: autoCompData[1][cursor - 1],
        }));
        event.preventDefault();
        //          key down
      } else if (event.key === 'ArrowDown' && cursor < autoCompData[1].length - 1) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1,
          value: autoCompData[1][cursor + 1],
        }));
      } else if (event.key === 'Backspace') {
        this.setState({
          cursor: -1,
        });
      } else if (event.key === 'Escape') {
        onGetAutoComp('');
      }
    }
  }

  render() {
    const {
      apiReqState: {
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
    const { value, searchDone, cursor } = this.state;
    let { autoList } = this.state;
    let errorCode = '';
    if (currentState === 'Success' && Array.isArray(autoCompData[1])) {
      autoList = autoCompData[1].map((val, i) => (

        <List
          key={val}
          cursor={cursor === i}
          onClick={this.handleClick(val)}
        >
          {val}
        </List>
      ));
      if (fetchState === 'Error') {
        errorCode = 'Make sure you have internet access';
      }
      // empty the autocomplete list
      if (value === ''
        || fetchState === SEARCHING
          || (searchDone && fetchState === SEARCHDONE)) {
        autoList = <div />;
        autoCompData = [];
        errorCode = '';
      }
    }
    return (
      <div className="searchDiv" position="relative">
        <div style={divStyle}>
          {errorCode}
        </div>
        <SearchIcon
          className="searchIcon"
          onClick={this.handleSubmitClick(value)}
          value={value}
          type="button"
          blink={fetchState === 'Searching'}
        />
        <Input
          autoFocus
          id="searchInput"
          type="text"
          onChange={this.handleChange(value)}
          onKeyDown={this.handleKeyDown}
          placeholder={fetchState}
          value={value}
          ref={this.inputRef}
          popList={Array.isArray(autoCompData[1]) && autoCompData[1].length}
        />
        <ul id="searchListItem">
          {autoList}
        </ul>
      </div>

    );
  }
}

export default Search;
