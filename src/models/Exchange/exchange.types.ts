export type Exchange = {
	change: number,
	end_rate: number,
	from: string,
	to: string,
	source: string
}

export type ExchangeRequest = {
	from: string,
	to: string,
	source: string
}

export const CURRENCIES = [
	"AUD", "BRL", "EGP", "CAD", "CLP", "CNY", "CZK", "EGP", "EUR", "GBP", "HKD",
	"INR", "JPY", "KRW", "LTL", "LVL", "TRY", "USD", "XAG", "XAU", "UAH", "PLN"
]

export const EXCHANGE_PROVIDERS = [
	"NBU", "Layer"
]