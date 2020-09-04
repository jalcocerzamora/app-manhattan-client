const plugin = require('tailwindcss/plugin')

module.exports = {
  important: false,
  purge: [
    './src/**/*.html'
  ],
  theme: {
    extend: {
      height: {
        '90vh': '90vh',
      },
      fontSize: {
        '2xs': '.55rem',
        '1xs': '.65rem',
      },
      boxShadow: {
        't-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      opacity: {
        '80': '0.80',
      },
    },
  },
  variants: {
    // opacity: ['responsive', 'hover']
  },
  plugins: [
    plugin(function({ addComponents, config, e}) {
      const forms = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.form-control': {
          // fontSize: config('theme.fontSize.lg'),
          appearance: config('variants.appearance.none'),
          outline: config('variants.outline.none'),
          color: config('theme.colors.gray.700'),
          boxShadow: config('theme.boxShadow.default'),
          borderWidth: config('theme.borderWidth.default'),
          borderRadius: config('theme.borderRadius.default'),
          width: config('theme.width.full'),
          padding: `${config('theme.spacing.2')} ${config('theme.spacing.3')}`,
          marginBottom: config('theme.margin.3'),
          lineHeight:config('theme.lineHeight.tight'),
          '&:focus': {
            outline: 'transparent 0',
            boxShadow: config('theme.boxShadow.outline'),
            backgroundColor: config('theme.colors.white'),
            borderColor: config('theme.borderColor.teal.300'),
            boxShadow: config('theme.boxShadow.outline'),
          }
        },

        '.h-80': {
          height: 'calc(100vh - 2rem)',
          minHeight: 'calc(100vh - 2rem)',
        },
        '.border-t-1': {
          borderTopWidth: '0.5px',
        },
        '.border-b-1': {
          borderBottomWidth: '0.5px',
        },
        '.border-l-1': {
          borderLeftWidth: '0.5px',
        },
        '.border-r-1': {
          borderRightWidth: '0.5px',
        },
      }
      addComponents(forms)

      const truncate_custom = {
        '.truncate-2-lines': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          overflow: 'hidden',
        },
        '.truncate-3-lines': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          overflow: 'hidden',
        },
        '.truncate-block': {
          overflow: config('variants.overflow.hidden'),
          position: config('variants.position.relative'),
          lineHeight: '1.2em',
          maxHeight: '3.6em',
          textAlign: 'justify',
          marginRight: '-1em',
          paddingRight: '1em',
        },
        '.truncate-block:before': {
          content: '"..."',
          position: 'absolute',
          right: '0',
          bottom: '0',
        },
        '.truncate-block:after': {
          content: '""',
          position: 'absolute',
          right: '0',
          width: '1em',
          height: '1em',
          marginTop: '0.2em',
          background: 'white',
        }
      }
      addComponents(truncate_custom)
    }),
    // plugin(function({ addBase, config }) {
    //   addBase({
    //     'h1': { fontSize: config('theme.fontSize.2xl') },
    //     'h2': { fontSize: config('theme.fontSize.xl') },
    //     'h3': { fontSize: config('theme.fontSize.lg') },
    //   })
    // })
  ],
}
