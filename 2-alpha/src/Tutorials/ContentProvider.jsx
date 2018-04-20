import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import allContent from './content'

import { Title } from '../components/Text'

const Container = styled.div`
`

const ContentProvider = (props) => {
  const url = props.match.params.url
  if(!allContent[url]) {
    return (<Title>Sorry content not found for {url}</Title>)
  }
  const { title, content } = allContent[url]
  return (
    <Container>
      <Title>{title}</Title>
      {content}
    </Container>
  )
}

export default ContentProvider