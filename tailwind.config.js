const plugin = require('tailwindcss/plugin')

module.exports = {
  important: false,
  // purge: {
  //   enabled: true,
  //   content: './projects/**/*.html'
  // },
  theme: {
    extend: {
      spacing: {
        '28': '7.5rem',
      },
      // width: theme => ({ 
      //   ...theme('spacing'),
      // }),
      minWidth: {
        'xxs': '18rem',
      },
      maxWidth: {
        'xxs': '18rem',
      },
      minHeight: {
        '40': '10rem',
        '48': '12rem',
      },
      maxHeight: {
        '40': '10rem',
        '48': '12rem',
      },
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
      scrollSnapAlign: {
        'start': 'start'
      },
    },
  },
  variants: {
    // opacity: ['responsive', 'hover']
    textTransform: ['responsive', 'firstletter'],
    pointerEvents: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    plugin(function({ addVariant, e }) {
      // addVariant('scrollSnap', ({ modifySelectors, separator }) => {
      //   modifySelectors(({ className }) => {
      //     return `.${e(`scrollSnap${separator}${className}`)}`
      //   })
      // })
      // addVariant('disabled', ({ modifySelectors, separator }) => {
      //   modifySelectors(({ className }) => {
      //     return `.${e(`disabled${separator}${className}`)}:disabled`
      //   })
      // })
      addVariant('firstletter', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`firstletter${separator}${className}`)}:first-letter`
        })
      })
    }),

    plugin(function({ addComponents, config, e}) {
      const forms = {
        'form': {
          '&.ng-untouched': {
            '.invalid-feedback': {
              display: 'none !important'
            }
          },

          ".btn-default": {
            float: 'right',
            color: config('theme.textColor.gray.700'),
            fontWeight: config('theme.fontWeight.medium'),
            padding: `${config('theme.spacing.1')} ${config('theme.spacing.4')}`,
            // paddingBottom: config('theme.spacing.4'),
            // paddingBottom: config('theme.spacing.4'),
            borderWidth: config('theme.borderWidth.default'),
            borderColor: config('theme.border.gray.400'),
            borderRadius: config('theme.borderRadius.lg'),
            letterSpacing: config('theme.letterSpacing.wide'),
            marginRight: config('theme.margin.1'),
            "&:hover": {
              backgroundColor: config('theme.colors.gray.100'),
              // hover:bg-gray-100
            }
          }
        },

        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },

        '.form-textarea': {
          appearance: config('variants.appearance.none'),
          backgroundColor: config('theme.colors.white'),
          borderColor: config('theme.colors.gray.300'),
          borderWidth: config('theme.borderWidth.default'),
          borderRadius: config('theme.spacing.1'),
          padding: `${config('theme.spacing.1')} ${config('theme.spacing.0')}`,
          fontSize: config('theme.fontSize.xs'),
          lineHeight: config('theme.lineHeight.none'),

          '&::-moz-placeholder': {
            color: config('theme.colors.gray.500'),
            opacity: config('theme.opacity.100'),
          },

          '&:-ms-input-placeholder': {
            color: config('theme.colors.gray.500'),
            opacity: config('theme.opacity.100'),
          },

          '&::placeholder': {
            color: config('theme.colors.gray.500'),
            opacity: config('theme.opacity.100'),
          },
              
          '&:focus': {
            outline: 'none',
            borderColor: config('theme.colors.orange.500'),
          }
        },

        '.form-control': {
          fontSize: config('theme.fontSize.lg'),
          appearance: config('variants.appearance.none'),
          outline: config('variants.outline.none'),
          color: config('theme.colors.gray.700'),
          boxShadow: config('theme.boxShadow.default'),
          borderWidth: config('theme.borderWidth.default'),
          borderRadius: config('theme.borderRadius.default'),
          width: config('theme.width.full'),
          padding: `${config('theme.spacing.2')} ${config('theme.spacing.3')}`,
          // marginBottom: config('theme.margin.4'),
          lineHeight: config('theme.lineHeight.tight'),
          
          '&:focus': {
            outline: 'transparent 0',
            boxShadow: config('theme.boxShadow.outline'),
            backgroundColor: config('theme.colors.white'),
            borderColor: config('theme.borderColor.teal.300'),
            boxShadow: config('theme.boxShadow.outline'),
          },

          '&.form-control-sm': {
            fontSize: config('theme.fontSize.xs'),
            height: config('theme.height.sm'),
            padding: `${config('theme.spacing.1')} ${config('theme.spacing.1')}`,
            // lineHeight: config('theme.lineHeight.none'),
            borderRadius: config('theme.borderRadius.default'),
          },

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

        // Validations
        '.is-invalid': {
          border: config('theme.borderWidth.default'),
          borderColor: config('theme.borderColor.red.500'),
          borderStyle: config('theme.borderStyle.solid'),
        },
        '.invalid-feedback': {
          display: 'none',
          width: '100%',
          marginTop: '.25rem',
          fontSize: '80%',
          fontStyle: 'italic',
          color: config('theme.colors.red.500'),
        }
      }
      addComponents(forms)

      // const truncate_custom = {
      //   '.truncate-2-lines': {
      //     display: '-webkit-box',
      //     '-webkit-box-orient': 'vertical',
      //     '-webkit-line-clamp': '2',
      //     overflow: 'hidden',
      //   },
      //   '.truncate-3-lines': {
      //     display: '-webkit-box',
      //     '-webkit-box-orient': 'vertical',
      //     '-webkit-line-clamp': '3',
      //     overflow: 'hidden',
      //   },
      //   '.truncate-block': {
      //     overflow: config('variants.overflow.hidden'),
      //     position: config('variants.position.relative'),
      //     lineHeight: '1.2em',
      //     maxHeight: '3.6em',
      //     textAlign: 'justify',
      //     marginRight: '-1em',
      //     paddingRight: '1em',
      //   },
      //   '.truncate-block:before': {
      //     content: '"..."',
      //     position: 'absolute',
      //     right: '0',
      //     bottom: '0',
      //   },
      //   '.truncate-block:after': {
      //     content: '""',
      //     position: 'absolute',
      //     right: '0',
      //     width: '1em',
      //     height: '1em',
      //     marginTop: '0.2em',
      //     background: 'white',
      //   }
      // }
      // addComponents(truncate_custom)

      const scrollSnapAlign = {
        '.scroll-start': {
          scrollSnapAlign: 'start',
        },
        '.scroll-center': {
          scrollSnapAlign: 'center',
        }
      }
      addComponents(scrollSnapAlign)

      // const titleCase = {
      //   '.scroll-start': {
      //     scrollSnapAlign: 'start',
      //   },
      // }
      // addComponents(titleCase)

      // .progTitle::first-letter {
      //   text-transform: uppercase;
      // }
    }),

    plugin(function({ addUtilities, config, e }) {
      const truncateLines = {
        '.truncate-lines-2': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          overflow: 'hidden',
        },
        '.truncate-lines-3': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          overflow: 'hidden',
        },
      }

      addUtilities(truncateLines, ['responsive'])

    //   const rotateUtilities = _.map(config('theme.scrollSnapAlign'), (value, key) => {
    //     return {
    //       [`.${e(`scroll-align-${key}`)}`]: {
    //         scrollSnapAlign: `(${value})`
    //       }
    //     }
    //   })

    //   addUtilities(rotateUtilities)
    }),
    
    plugin(function({ addBase, config }) {
      addBase({
        'h1': {
          fontSize: config('theme.fontSize.2xl'),
          textTransform: 'uppercase',
        },
        'h2': { fontSize: config('theme.fontSize.xl') },
        'h3': { fontSize: config('theme.fontSize.lg') },
      })
    })
  ],
}
