import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { getCurrentAuthor } from '../selectors/admin'

import { Title } from '../components/Text'
import AdminNav from './AdminNav'

const Container = styled.div`

`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
  & > * {
  }
`

export const AdminHeader = ({ 
  title, 
  children,
  startAdminLogout,
  location, 
  match, 
  name = 'administrator',
  ...rest 
}) => {
  return (
    <Container>
      <AdminNav />
      <Header>
        <Title>{title}</Title>
        <div>
          {children}
        </div>
      </Header>
    </Container>
  )
}



export default AdminHeader