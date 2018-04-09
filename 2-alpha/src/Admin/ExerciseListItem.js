import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

import { RaisedBox, Row } from '../components/Container'
import { PNoMargins } from '../components/Text';

let Li = RaisedBox.withComponent('li')
Li = Li.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.7rem;
`
const Name = styled.div`
  flex: 1;
`
const Actions = styled.div`
  > * {
    margin-left: 0.7rem;
  }
`

const Question = PNoMargins.extend`
  color: ${p => p.theme.black};
`

const ExerciseListItem = ({
  id,
  createdAt,
  lastModified,
  authorName,
  questionPart1,
  children,
}) => (      
  <Li key={id}>
    <Name>
      <div className="row">
        <div className="col-7">
          <Question><strong>{questionPart1}</strong></Question>
        </div>
      
        <div className="col-5">
            <PNoMargins>Last updated <strong>{moment(lastModified).format("h:mma ddd, Do MMM YY")}</strong></PNoMargins>
          <PNoMargins>Created {moment(createdAt).format("ddd, Do MMM YY")} by <strong>{authorName}</strong></PNoMargins>
        </div>
      </div>
    </Name>
    <Actions>
        {React.Children.map(children, child =>  React.cloneElement(child, { id })) /* Add id prop to each child element  */}
    </Actions>
  </Li>
)

ExerciseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  questionPart1: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  lastModified: PropTypes.number.isRequired,
}

export default ExerciseListItem