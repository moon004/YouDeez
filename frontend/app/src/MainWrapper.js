import React from 'react';
import './MainWrapper.css';
import ResultObj from './Object';

import { connect } from 'react-redux';
import { updateMediaType, updateCurrentMedia } from './action/media-action';
import Search from './Search';
import DivTap from './DivTap';
import MyLibrary from './MyLibrary';
import PropTypes from 'prop-types';


class Media extends React.Component {

	render() {
			var returnMedia = null;
			if (this.props.cMedia === "Youtube") {
				returnMedia = <iframe title="Sadman" video="">
						
				</iframe>
			}
			return (
				<div>
					{returnMedia}
				</div>
			);
	}
}

export class MainWrapper extends React.Component {
	constructor() {
		super();
		this.state = {
				MediaObject: []
		};
		this.onUpdateMediaType = this.onUpdateMediaType.bind(this);
		this.ObjTap = this.ObjTap.bind(this);
		//Dummy Data
		for (let i = 1; i < 4; i++) {
			this.state.MediaObject = this.state.MediaObject.concat([{
				name: i
			}])
		}
	}

ObjTap(e) {
	console.log(e.target.value)
	this.props.onUpdateCurrentMedia(e.target.value)
}

onUpdateMediaType(e) {
	this.props.onUpdateMediaType(e.target.value)
}

/*
componentDidMount() {
	setTimeout(() => {
		this.props.onApiRequest();
	}, 2000);
}*/

	render() {

		var ObjectList = this.state.MediaObject.map((currentObj, index) => {
			return (
				<ResultObj 
				key={index}
				name={currentObj.name}
				rType={this.props.currentMediaTap}
				className="mainMediaObject"
				handleMClick={this.onUpdateMediaType}/>
			)
		});
		return (
				<div>
					<Search/>
					<DivTap/>
					<div>
						{ObjectList}
					</div>
					<div>
						<Media cMedia={this.props.whichMedia}/>
					</div>
				<MyLibrary/>
				</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	//TAKE STATE FROM STORE TO PUT ON THIS COMPONENT PUNYA PROPS
	//BELOW ARE ALL THIS COMPONENT PUNYA PROPS
	return {
		whichMedia: state.whichMedia,
		currentMediaTap: state.currentMediaTap
	}
};

const mapActionsToProps = {
		onUpdateMediaType: updateMediaType,
		onUpdateCurrentMedia: updateCurrentMedia
};

export default connect(mapStateToProps, mapActionsToProps)(MainWrapper);
