import _ from 'lodash'
import React from 'react'
import * as api from '../api'
import styled from 'styled-components'
import { PropTypes } from 'prop-types';

const Container = styled.span`
  z-index: -15; /* Put behind everything else */
`

const ContextualHelpers = ({ helpers = [], direction = 'forward' }) => {
  // Only show valid helpers, sort by pos, and map to an array to be iterated over
  let output = []
  helpers
    .filter(helper => helper.pos && helper.len)
    .sort((a, b) => a.pos - b.pos)
    .forEach(
      ({ pos, name, len, color }) => {

      const style = { color: api.pickTextColor(color), backgroundColor: color }
      output.push(<span key={pos} className={` ${name}`} style={style}>{_.padStart('', len, ' ')}hi</span>)
    }
  )

  return (<Container className="Highlighted-Sequence sequence">{output}</Container>)
}
ContextualHelpers.propTypes = {
  helpers: PropTypes.arrayOf(PropTypes.shape({
    pos: PropTypes.number,
    len: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  direction: PropTypes.string.isRequired,
}

export default ContextualHelpers