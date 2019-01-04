import React, { Component } from 'react';


export default class NewPlaylist extends Component {
  constructor() {
    // PL === Playlist
    super();
    this.state = {
      value: '',
      PLarray: [],
    };
    this.handlePLInput = this.handlePLInput.bind(this);
  }

  handlePLInput = () => (event) => {
    console.log(event.target.value);
    const { PLAddSonghandler } = this.props;
    this.setState({
      value: event.target.value,
    });
    if (event.target.value.length === 0) {
      PLAddSonghandler(false);
    } else {
      PLAddSonghandler(true);
    }
  }

  // addPlaylist = () => {
  //   const { PLarray } = this.state;
  //   PLarray =
  // }

  render() {
    const { value, PLarray } = this.state;
    console.log(PLarray);
    return (
      <input
        type="text"
        placeholder="Enter playlist name"
        className="playListInput"
        onChange={this.handlePLInput()}
        value={value}
      />
    );
  }
}
