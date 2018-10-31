import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DivT, Button, ButDeez, StyledScrollbar, EqDivider,
} from '../styling/DivTap.style';

class DivTap extends Component {
  constructor() {
    super();
    this.renderThumb = this.renderThumb.bind(this);
    this.handleTapClick = this.handleTapClick.bind(this);
  }

  renderThumb = (props) => {
    const thumbStyle = {
      backgroundColor: 'black',
    };
    return (
      <div {...props} style={{ ...thumbStyle }} className="vertical-thumb" />
    );
  }

  handleTapClick = value => () => {
    const { onObjTap } = this.props;
    onObjTap(value);
  }

  render() {
    const {
      searchState: {
        data,
      },
      tapState,
    } = this.props;


    return (
      <DivT currentap={tapState}>
        <EqDivider>
          <Button
            type="button"
            onClick={this.handleTapClick('Youtube')}
            currentap={tapState}
          >
            {''}
          </Button>
          <ButDeez
            type="button"
            onClick={this.handleTapClick('Deezer')}
            currentap={tapState}
          >
            {''}
          </ButDeez>
        </EqDivider>
        <StyledScrollbar
          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
          thumbMinSize={50}
          currentap={tapState}
        >
          <img alt="" src={data} />
          {tapState}
        </StyledScrollbar>

      </DivT>
    );
  }
}

DivTap.propTypes = {
  searchState: PropTypes.shape(
    {
      fetchState: PropTypes.string,
      data: PropTypes.array,
    },
  ),
  tapState: PropTypes.string,
};

DivTap.defaultProps = {
  searchState: {
    fetchState: '',
    data: '',
  },
  tapState: 'Youtube', // Default to youtube
};

export default DivTap;
