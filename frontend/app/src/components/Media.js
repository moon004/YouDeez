import React from 'react';

class Media extends React.Component {
  render() {
    const returnMedia = null;

    return (
      <div>
        <iframe title={this.props.cMedia} video="" />
        {returnMedia}
      </div>
    );
  }
}


export default Media;
