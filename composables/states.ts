export const useUser = () => useState<string>('user', () => 'New User')
export const useQuoteNumber = () => useState<number>('quoteNumber', () => 0)
