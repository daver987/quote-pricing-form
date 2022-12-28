import { Stripe } from 'stripe'
import { Session } from '~/types/session'
import { Query } from '~/types/query'

const YOUR_DOMAIN = 'https://hpl-checkout.netlify.app'
const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const query = (await getQuery(event)) as unknown as Query

  const customer = await stripe.customers.create({
    email: query.email,
    name: `${query.fname} ${query.lname}`,
    phone: query.phone,
  })
  const session = <Session>await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    mode: 'setup',
    payment_method_types: ['card'],
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
    automatic_tax: { enabled: false },
    customer: customer.id,
  })

  return {
    statusCode: 200,
    url: session.url,
    customer: customer.id,
  }
})
