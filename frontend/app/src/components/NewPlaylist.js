import React, { Component } from 'react';


export default class NewPlaylist extends Component {
  constructor() {
    // PL === Playlist
    super();
    this.state = {
      value: '',
      PLarray: [],
      error: [],
    };
    this.handlePLInput = this.handlePLInput.bind(this);
  }

  handlePLInput = () => (event) => {
    console.log(event.target.value);
    const { PLAddSonghandler } = this.props;
    this.setState({
      value: event.target.value,
      error: [''],
    });
    PLAddSonghandler(event.target.value.length === 0);
  };

  addPlaylist = () => {
    const { addPlaylisthandler, stateFromParent } = this.props;
    const { value } = this.state;
    if (value.length !== 0) {
      if (stateFromParent.tmpPLArray.length !== 0) {
        this.setState({
          value: '',
          error: [],
        });
        addPlaylisthandler(value);
      } else {
        this.setState({
          error: ['You must select a song !'],
        });
      }
    } else {
      this.setState({
        error: ['You must enter a name !'],
      });
    }
  };

  render() {
    const { value, error } = this.state;
    return (
      <div>
        <button
          type="button"
          className="buttonPlayList"
          onClick={this.addPlaylist}
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
        <h6 className="errorMessage">
          {error}
        </h6>
      </div>
    );
  }
}
