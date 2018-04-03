import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { getCurrentAuthor } from '../selectors/admin'

import { Title } from '../components/Text'
import AdminNav from './AdminNav'

const Container = styled.div`
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
      <div>
        <Title>{title}</Title>
      </div>
    </Container>
  )
}



export default AdminHeader