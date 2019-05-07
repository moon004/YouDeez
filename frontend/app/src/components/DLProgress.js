import React, { Component } from 'react';

class DLProgress extends Component {
  constructor() {
    super();
    this.state = {
      QArray: [],
    };
  }

  shouldComponentUpdate(nextprops) {
    const { downloadObject } = this.props;
    if (nextprops.downloadObject !== downloadObject) {
      return true;
    }
    return false;
  }

  render() {
    const {
      downloadObject: {
        state,
        songName,
        totalsize,
      },
    } = this.props;
    const { QArray } = this.state;
    QArray[0] = {
      name: songName,
      total: totalsize,
    };
    console.log('DLProgress', state);
    const ListProgress = QArray.map((item) => {
      console.log(item);
      return (
        <div className="DLProgressListItem">
          <div className="DLProgressName">
            {item.name}
          </div>
          <div>
            {`${(Number(item.total) / (1024 * 1024)).toFixed(1)} Mb`}
          </div>
        </div>
      );
    });
    return (
      <div className="DLProgressDiv">
        {state === 'progressing' || state === 'progress' ? (
          <div
            className="downloadingAnimate"
          >
          Downloading
          </div>
        ) : (
          ''
        )}
        {state === 'progressing' ? ListProgress : <div />}
      </div>
    );
  }
}

export default DLProgress;
