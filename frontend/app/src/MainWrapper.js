import React from 'react';
import './MainWrapper.css';
import { connect } from 'react-redux';
import { updateMediaType, updateCurrentMedia } 
	from './action/media-action';
import { fetchObjStart } from './action/search-action';

import axios from 'axios';

import ResultObj from './Object';
import Search from './components/Search';
import DivTap from './components/DivTap';
import MyLibrary from './components/MyLibrary';
import Media from './components/Media';
import PropTypes from 'prop-types';




export class MainWrapper extends React.Component {
	constructor() {
		super();
		this.state = {
				MediaObject: []
		};
		this.onUpdateMediaType = this.onUpdateMediaType.bind(this);
		this.ObjTap = this.ObjTap.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
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

onSubmitSearch(e) {
	this.props.onSubmit(e.target.value)
}


	render() {
		return (
				<div>
					<div>
					<Search handleSubmit={this.onSubmitSearch}/>
					<DivTap/>
					</div>
					<div>
						<Media cMedia={this.props.whichMedia}/>
					</div>
					<MyLibrary/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	//TAKE STATE FROM STORE TO PUT ON THIS COMPONENT PUNYA PROPS
	//BELOW ARE ALL THIS COMPONENT PUNYA PROPS
	return {
		whichMedia: state.whichMedia,
		currentMediaTap: state.currentMediaTap
	}
};

const mapActionsToProps = {
		onUpdateMediaType: updateMediaType,
		onUpdateCurrentMedia: updateCurrentMedia,
		onSubmitSearch: fetchObjStart
};

export default connect(mapStateToProps, mapActionsToProps)(MainWrapper);
