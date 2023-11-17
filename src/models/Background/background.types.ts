export type Background = {
    alt: string,
    image: string,
    photographer: string,
    source: string,
    source_url: string,
}

export type BackgroundRequest = {
	source: string
}

export const BACKGROUND_PROVIDERS = [
	"unsplash.com", "pexels.com"
]