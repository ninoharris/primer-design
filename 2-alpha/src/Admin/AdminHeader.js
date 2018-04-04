import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { getCurrentAuthor } from '../selectors/admin'

import { Title } from '../components/Text'
import AdminNav from './AdminNav'
import { FlexVerticallyCenter } from '../components/Container'

const Container = styled.div`

`

const Header = FlexVerticallyCenter.extend`
  margin: 24px 0;
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header>
              <div>
                  <Title>{title}</Title>
              </div>
              <div>
                {children}
              </div>
            </Header>
          </div>
        </div>
      </div>
    </Container>
  )
}



export default AdminHeader