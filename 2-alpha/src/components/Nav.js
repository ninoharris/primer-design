import React from 'react'
import styled from 'styled-components'
import { darken, lighten, rgba } from 'polished'


const NavDiv = styled.nav`
  display: flex;
  justify-content: space-between;
  background: ${p => rgba(p.theme.cream, 0.07)};
  padding: 8px 10px;
  width: 100%;
`
const Title = styled.h1`
  font-size: 14px
  line-height: 17px;
  text-transform: uppercase;
`
// All direct children of 'left', 'center', 'right' cannot create a new line or mess with nav sizing via their margins.
// Children of these children are free to apply any own styles.
// &&& -> extra CSS weighting to override child styles
const NavInner = styled.div`
  display: flex;
  align-items: center;
  &&& > * {
    display: inline-block;
    margin: 0 5px;
  }
`

const Nav = ({ children }) => (
  <NavDiv>
    {children}
  </NavDiv>
)

const NavLeft = ({ children }) => (
  <NavInner>
    <Title>Primer<br/> Designer</Title>
    {children}
  </NavInner>
)
const NavCenter = ({ children }) => (
  <NavInner>
    {children}
  </NavInner>
)

const NavRight = ({ children, loggedIn = false }) => (
  <NavInner>
    {children}
  </NavInner>
)

Nav.Left = NavLeft
Nav.Center = NavCenter
Nav.Right = NavRight

export default Nav