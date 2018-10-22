import React from 'react';

class Media extends React.Component {

	render() {
			var returnMedia = null;

			return (
				<div>
					<iframe title={this.props.cMedia} video="">
						
						</iframe>
					{returnMedia}
				</div>
			);
	}
}


export default Media;