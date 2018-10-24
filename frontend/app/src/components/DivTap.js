import React from 'react';
import PropTypes from 'prop-types';

const DivTap = ({
  searchState: {
    data,
  },
}) => (
  <div>
    <h1>DivTap</h1>
    <img alt="" src={data} />
  </div>
);

DivTap.propTypes = {
  searchState: PropTypes.shape(
    {
      fetchState: PropTypes.string,
      data: PropTypes.array,
    },
  ),
};

DivTap.defaultProps = {
  searchState: {
    fetchState: null,
    data: [],
  },
};

export default DivTap;
