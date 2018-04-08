import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { SUCCESS, ERROR, INFO } from '../../selectors/evaluator-messages'
import { Link } from '../../components/Link'

export const Li = styled.li`
  padding: ${p => p.theme.sidebarPadding};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: ${p => p.type === SUCCESS ? p.theme.success : (p.type === ERROR ? p.theme.error : p.theme.info )};
  color: ${p => p.type === INFO ? p.theme.black : p.theme.white};
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  p {
    line-height: 1.5rem;
    flex: 1; /* shift around other elements in the row */
    padding-right: 1.2rem;
  }
`


const Message = ({ message, type }) => {
  const { title, additional, url } = message
  console.log(type)
  return (
    <Li type={type}>
      <Row>
        <p>{title}</p>
        {url ? <Link target="_blank" to={`/tutorials${url}`}>See tutorial </Link> : ''}
      </Row>
      {additional ? <p className="additional">{additional}</p> : ''}
    </Li>
  )
}
Message.propTypes = {
  message: PropTypes.shape({
    context: PropTypes.any,
    inputs: PropTypes.arrayOf(PropTypes.string),
    additional: PropTypes.string,
    url: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf([SUCCESS, ERROR, INFO]).isRequired,
}

export default Message