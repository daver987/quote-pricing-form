import { createInput } from '@formkit/vue'

/**
 * Here we define our input schema. We'll be using
 * createInput() so we're supplying the schema for
 * the "inner" section of a FormKit input.
 */
const numberInputSchema = [
  {
    $el: 'button',
    children: [
      {
        $el: 'span',
        children: '-',
      },
    ],
    attrs: {
      class: '$classes.stepInput',
      onClick: '$handlers.updateValue(-1)',
    },
  },
  {
    $el: 'input',
    bind: '$attrs',
    attrs: {
      id: '$id',
      name: '$name',
      type: 'number',
      class: '$classes.input',
      onInput: '$handlers.DOMInput',
      onBlur: '$handlers.blur',
      disabled: '$disabled',
      value: '$_value',
    },
  },
  {
    $el: 'button',
    children: [
      {
        $el: 'span',
        children: '+',
      },
    ],
    attrs: {
      class: '$classes.stepInput',
      onClick: '$handlers.updateValue(1)',
    },
  },
]

/**
 * Here we add our custom handlers to support
 * the unique needs of our input.
 */
function addHandlers(node: any) {
  node.on('created', () => {
    node.context.handlers.updateValue = (n: any) => () => {
      if (!node.context.disabled) {
        // step the value
        const value = parseInt(node.value) || 0
        node.input(value + n)
        // trigger the blur handler because we've touched the input
        node.on('settled', () => {
          setTimeout(() => {
            // ensure we run after validation
            node.context.handlers.blur()
          }, 0)
        })
      }
    }
  })
}

/**
 * Export the output of the createInput call using
 * our schema and handlers function.
 */
export default createInput(numberInputSchema, {
  features: [addHandlers],
})
