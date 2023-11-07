
import React from 'react'
import { Container } from 'react-bootstrap'


/*
  * secClass  => Classes
  * secAfterContainerContent => Add Div or anything render after Container
  * secContainerFluid => If this Prop is given then Container act like a fluid
*/

const Layout = ({ secClass, secAfterContainerContent, secContainerFluid, children }) => {
  return (
    <>
      <section className={ secClass ? secClass : undefined }>
        <Container fluid={secContainerFluid ? secContainerFluid : undefined}>
          {children}
        </Container>

        { secAfterContainerContent && secAfterContainerContent }
      </section>
    </>
  )
}

export default Layout
