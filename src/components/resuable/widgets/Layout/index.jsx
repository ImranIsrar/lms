
import React from 'react'
import { Container } from 'react-bootstrap'


/*
  * secClass  => Classes
  * secAfterContainerContent => Add Div or anything render after Container
  * secContainerFluid => If this Prop is given then Container act like a fluid
  * secStyle => If Prop is given then style is apply on it
*/

const Layout = ({ secClass, secAfterContainerContent, secContainerFluid, secStyle, children }) => {
  return (
    <>
      <section className={ secClass ? secClass : undefined } 
        style={ secStyle ? secStyle : undefined }>
        <Container fluid={secContainerFluid ? secContainerFluid : undefined}>
          {children}
        </Container>

        { secAfterContainerContent && secAfterContainerContent }
      </section>
    </>
  )
}

export default Layout
