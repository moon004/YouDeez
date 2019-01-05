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
    PLAddSonghandler(event.target.value.length !== 0);
  }

  // addPlaylist = () => {
  //   const { PLarray } = this.state;
  //   PLarray =
  // }

  render() {
    const { value, PLarray } = this.state;
    const { addPlaylisthandler } = this.props;
    console.log(PLarray);
    return (
      <div>
        <button
          type="button"
          className="buttonPlayList"
          onClick={addPlaylisthandler(value)}
        >
          {'Add Playlist'}
        </button>
        <input
          type="text"
          placeholder="Enter playlist name"
          className="playListInput"
          onChange={this.handlePLInput()}
          value={value}
        />
      </div>
    );
  }
}
