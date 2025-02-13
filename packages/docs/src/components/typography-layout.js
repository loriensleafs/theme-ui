/** @jsx jsx */
import React from 'react'
import { jsx, ThemeProvider, Flex, Styled } from 'theme-ui'
import { useState } from 'react'
import merge from 'lodash.merge'

import { toTheme } from 'theme-ui-typography'

import Layout from './layout'
import GoogleFonts from './google-fonts'
import Button from './button'
import Select from './select'
import themes from './typography-themes'
import typographyThemes from './typography-themes'
import baseTheme from '../gatsby-theme-ui'

const themeNames = Object.keys(themes)

const ThemeSelect = props => (
  <div>
    <label
      htmlFor={props.name}
      css={{
        fontSize: 16,
        mr: 2,
      }}
    >
      Theme
    </label>
    <select
      id={props.name}
      {...props}
      css={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        p: 2,
      }}
    >
      {themeNames.map(name => (
        <option key={name} label={name} value={name} />
      ))}
    </select>
  </div>
)

export default props => {
  const [themeName, setTheme] = useState(themeNames[0])

  const typographyTheme = typographyThemes[themeName]
  const theme = toTheme(typographyTheme)

  return (
    <Layout {...props}>
      <Flex py={4} alignItems="center">
        <ThemeSelect
          name="theme"
          value={themeName}
          onChange={e => {
            setTheme(e.target.value)
          }}
        />
        <Button
          css={{
            ml: 2,
          }}
          onClick={e => {
            const i = (themeNames.indexOf(themeName) + 1) % themeNames.length
            setTheme(themeNames[i])
          }}
        >
          Next
        </Button>
      </Flex>
      <ThemeProvider theme={theme}>
        <GoogleFonts />
        <Styled.root>{props.children}</Styled.root>
      </ThemeProvider>
    </Layout>
  )
}
