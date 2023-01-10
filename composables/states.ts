export const useUser = () => useState<string>('user', () => 'New User')
export const useQuoteNumber = () => useState<number>('quoteNumber', () => 0)

export const useAddToCart = () => useState<boolean>('addToCart', () => false)

const useQuote = () => useState('quote', () => {})
