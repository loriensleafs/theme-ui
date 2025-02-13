/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useTheme } from './context'
import ColorSwatch from './ColorSwatch'

const join = (...args) => args
  .filter(Boolean)
  .join('.')

export const ColorRow = ({
  colors,
  name,
  omit = [ 'modes' ],
  ...props
}) => {
  return (
    <div>
      <div
        css={{
          fontSize: 0,
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {Object.keys(colors).map(key => {
          const color = colors[key]
          if (!color || omit.includes(key)) return false
          const id = join(name, key)
          if (typeof color === 'object') {
            return (
              <ColorRow
                {...props}
                key={key}
                name={id}
                colors={color}
                omit={omit}
              />
            )
          }
          return (
            <ColorSwatch
              name={id}
              color={id}
              css={{
                m: 2,
                flexBasis: 128,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export const ColorPalette = ({
  omit = [],
  ...props
}) => {
  const { colors = {} } = useTheme()

  return (
    <div
      style={{
        marginLeft: -8,
        marginRight: -8,
      }}>
      <ColorRow
        omit={omit}
        colors={colors}
      />
    </div>
  )
}

export default ColorPalette
