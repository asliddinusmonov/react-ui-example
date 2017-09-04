import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import AppBar from '../../../src/components/AppBar'
import MenuFullWidth from '../../../src/components/AppBar/MenuFullWidth'
import MenuIcon from '../../../src/components/AppBar/MenuIcon'
import { setStorage } from '../../../src/helpers/localStorage'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) AppBar', () => {
  let props, component
  const Content = () => <div>Content</div>

  beforeEach(() => {
    props = {
      title: 'Title',
      profile: {
        email: 'user@example.com',
        image: null,
      },
      logout: sinon.spy()
    }
  })

  it('renders its children inside of the viewport', () => {
    component = mount(
      <MuiThemeProvider>
        <AppBar {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(Content)).to.have.lengthOf(1)
  })

  it('AppBar contain MenuIcon', () => {
    setStorage('menuOpen', false)

    component = mount(
      <MuiThemeProvider>
        <AppBar {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(MenuIcon)).to.have.lengthOf(1)
  })

  it('AppBar contain FullMenu', () => {
    setStorage('menuOpen', true)

    component = mount(
      <MuiThemeProvider>
        <AppBar {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(MenuFullWidth)).to.have.lengthOf(1)
  })

  it('render user email in FullMenu', () => {
    setStorage('menuOpen', true)

    component = mount(
      <MuiThemeProvider>
        <AppBar {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )
    const element = component.find('#userEmail')
    expect(element.text()).to.equal(props.profile.email)
  })
})
