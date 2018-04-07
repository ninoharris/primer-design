import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { transparentize } from 'polished'

import Options from './Options'
import { P } from './Text'

const theme = {
  textDefault: '#1E182B',
}

const Container = styled.div`
  flex: 1; /* take up the rest of the bottom, if possible (container of footer is flex) */
  background-color: ${p => transparentize(0.6, p.theme.darkerGrey)};
  display: flex;
  > * {
    padding: ${p => p.theme.sidebarPadding};
  }
`

const Sidebar = styled.div`
  width: ${p => p.theme.sidebarWidth};
`

const Main = styled.div`
  flex: 1;
`

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar>
          <Options />
        </Sidebar>
        <Main>
          {/* <ExerciseMistakes /> */}
          <P><strong>Your most common mistakes</strong></P>
        </Main>
      </Container>
    </ThemeProvider>
  )
}

export default Footer