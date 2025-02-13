import React, { useState, useEffect, useLayoutEffect } from 'react'
import merge from 'lodash.merge'
import { css } from '@styled-system/css'
import { Global } from '@emotion/core'
import { useThemeUI } from './context'

const STORAGE_KEY = 'theme-ui-color-mode'

const storage = {
  get: init => window.localStorage.getItem(STORAGE_KEY) || init,
  set: value => window.localStorage.setItem(STORAGE_KEY, value),
}

export const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const dark = mql.media === darkQuery
  return dark && mql.matches
}

export const useColorState = initialMode => {
  const [mode, setMode] = useState(initialMode)

  useLayoutEffect(() => {
    // initialize
    const stored = storage.get()
    const dark = getMediaQuery()
    if (dark) {
      setMode('dark')
      return
    }
    document.body.classList.remove('theme-ui-' + stored)
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
    if (!mode) return
    storage.set(mode)
  }, [mode])

  return [mode, setMode]
}

export const useColorMode = initialMode => {
  const { colorMode, setColorMode } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ThemeProvider component`)
  }

  return [colorMode, setColorMode]
}

const bodyColor = (theme = {}) => {
  if (!theme.colors || !theme.colors.modes) return
  const { modes } = theme.colors
  const styles = {}
  Object.keys(modes).forEach(mode => {
    const colors = modes[mode]
    styles[`&.theme-ui-${mode}`] = {
      color: colors.text,
      bg: colors.background,
    }
  })

  return css({
    body: {
      ...styles,
      color: 'text',
      bg: 'background',
    },
  })(theme)
}

export const ColorMode = () => <Global styles={bodyColor} />

export default useColorMode
