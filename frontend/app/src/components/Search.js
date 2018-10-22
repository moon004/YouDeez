import React from 'react';



class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value:''
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }


  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="text"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder="Search"/>
      </form>
    )
  };
}

export default Search;