export const formSchema = [
  {
    $el: 'h1',
    children: 'Carbon Sequestration Grant',
  },
  {
    $cmp: 'FormKit',
    props: {
      type: 'form',
      id: 'form',
      onSubmit: '$submitApp',
      plugins: '$plugins',
      actions: false,
    },
    children: [
      {
        $el: 'ul',
        attrs: {
          class: 'steps',
        },
        children: [
          {
            $el: 'li',
            for: ['step', 'stepName', '$steps'],
            attrs: {
              class: {
                step: true,
                'has-errors': '$showStepErrors($stepName)',
              },
              onClick: '$setActiveStep($stepName)',
              'data-step-active': '$activeStep === $stepName',
              'data-step-valid': '$stepIsValid($stepName)',
            },
            children: [
              {
                $el: 'span',
                if: '$showStepErrors($stepName)',
                attrs: {
                  class: 'step--errors',
                },
                children: '$step.errorCount + $step.blockingCount',
              },
              '$camel2title($stepName)',
            ],
          },
        ],
      },
      {
        $el: 'div',
        attrs: {
          class: 'form-body',
        },
        children: [
          {
            $el: 'section',
            attrs: {
              style: {
                if: '$activeStep !== "contactInfo"',
                then: 'display: none;',
              },
            },
            children: [
              {
                $formkit: 'group',
                id: 'contactInfo',
                name: 'contactInfo',
                children: [
                  {
                    $formkit: 'text',
                    name: 'full_name',
                    label: '*Full Name',
                    placeholder: 'First Last',
                    validation: 'required',
                  },
                  {
                    $formkit: 'email',
                    name: 'email',
                    label: '*Email address',
                    placeholder: 'email@domain.com',
                    validation: 'required|email',
                  },
                  {
                    $formkit: 'tel',
                    name: 'tel',
                    label: '*Telephone',
                    placeholder: 'xxx-xxx-xxxx',
                    help: 'Phone number must be in the xxx-xxx-xxxx format.',
                    validation:
                      'required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/',
                  },
                ],
              },
            ],
          },
          {
            $el: 'section',
            attrs: {
              style: {
                if: '$activeStep !== "organizationInfo"',
                then: 'display: none;',
              },
            },
            children: [
              {
                $formkit: 'group',
                id: 'organizationInfo',
                name: 'organizationInfo',
                children: [
                  {
                    $formkit: 'text',
                    label: '*Organization name',
                    name: 'org_name',
                    placeholder: 'MyOrg, Inc.',
                    help: 'Enter your official organization name.',
                    validation: 'required|length:3',
                  },
                  {
                    $formkit: 'date',
                    label: 'Date of incorporation',
                    name: 'date_inc',
                    validation: 'required',
                  },
                ],
              },
            ],
          },
          {
            $el: 'section',
            attrs: {
              style: {
                if: '$activeStep !== "application"',
                then: 'display: none;',
              },
            },
            children: [
              {
                $formkit: 'group',
                id: 'application',
                name: 'application',
                children: [
                  {
                    $formkit: 'checkbox',
                    label: "*I'm not a previous grant recipient",
                    help: 'Have you received a grant from us before?',
                    name: 'not_previous_recipient',
                    validation: 'required|accepted',
                    validationMessages: {
                      accepted: 'We can only give one grant per organization.',
                    },
                  },
                  {
                    $formkit: 'textarea',
                    label: '*How will you use the money?',
                    name: 'how_money',
                    help: 'Must be between 20 and 500 characters.',
                    placeholder:
                      'Describe how the grant will accelerate your efforts.',
                    validation: 'required|length:20,500',
                  },
                ],
              },
            ],
          },
          {
            $el: 'div',
            attrs: {
              class: 'step-nav',
            },
            children: [
              {
                $formkit: 'button',
                disabled: '$activeStep === "contactInfo"',
                onClick: '$setStep(-1)',
                children: 'Previous Step',
              },
              {
                $formkit: 'button',
                disabled: '$activeStep === "application"',
                onClick: '$setStep(1)',
                children: 'Next Step',
              },
            ],
          },
          {
            $el: 'details',
            children: [
              {
                $el: 'summary',
                children: 'Form data',
              },
              {
                $el: 'pre',
                children: '$stringify( $get(form).value )',
              },
            ],
          },
        ],
      },
      {
        $formkit: 'submit',
        label: 'Submit Application',
        disabled: '$get(form).state.valid !== true',
      },
    ],
  },
  {
    $el: 'p',
    children: [
      {
        $el: 'small',
        children: [
          {
            $el: 'em',
            children:
              '*All the contents of this form are fictional (the company, grant, and form) for the purposes of demonstrating the capabilities of FormKit.',
          },
        ],
      },
    ],
  },
]
