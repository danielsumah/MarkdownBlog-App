import React from 'react'
import { Container } from 'semantic-ui-react'
import Nav from '../components/Nav'

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <Container text style={{ marginTop: '7em' }}>
                {children}
            </Container>
        </>
    )
}

export default Layout;