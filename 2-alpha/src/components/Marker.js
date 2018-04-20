import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SequenceContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 10;
  white-space: pre-wrap;
`

const MarkerContainer = styled.span`
  > span {
    position: relative;
    width: 200px;
  }
`

const Arrow = styled.div`
  display: inline-block;
  margin-left: -2px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 1px 60px 1px;
  border-color: transparent transparent ${p => p.color} transparent;
`
const Text = styled.span`
  word-break: keep-all;
  position: absolute;
  left: -5px;
  line-height: 1;
  margin-top: 75px;
  color: ${p => p.color};
`

const Marker = ({ position, text, color = '#FF0000', className = '', ...rest }) => {
  if (isNaN(position)) return null
  return (
    <SequenceContainer className={`sequence ${className}`} {...rest}>
      {_.padStart('', position, ' ')}
      <MarkerContainer>
        <span>
          <Arrow color={color} />
          <Text color={color}>{text}</Text>
        </span>
      </MarkerContainer>
    </SequenceContainer>
  )
}
Marker.propTypes = {
  markers: PropTypes.shape({
    text: PropTypes.string,
    pos: PropTypes.number,
    color: PropTypes.string,
  })
}

export default Marker