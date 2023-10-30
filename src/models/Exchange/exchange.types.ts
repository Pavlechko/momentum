export type Rate = {
	change: number,
	end_rate: number,
}

type ExchangeData = {
	[symbol: string]: Rate
}
export type Exchange = {
	NBU: ExchangeData
}