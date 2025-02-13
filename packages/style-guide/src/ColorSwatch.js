/** @jsx jsx */
import { jsx, get } from 'theme-ui'
import { toHex, toHSL } from './color'
import { useTheme } from './context'

export const ColorSwatch = ({
  color,
  name,
  ...props
}) => {
  const { colors } = useTheme()
  const value = get(colors, color)
  return (
    <div {...props} title={`${toHex(value)}`}>
      <div
        css={{
          p: 64,
          bg: color,
        }}
      />
      <div
        css={{
          py: 2,
        }}>
        {name || color}
      </div>
    </div>
  )
}

export default ColorSwatch
