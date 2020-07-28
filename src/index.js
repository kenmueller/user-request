const axios = require('axios').default
const getRandomUserAgent = require('random-useragent').getRandom

const DEFAULT_MAX_RETRY_ATTEMPTS = 10

const transformResponse = (
	{ data, headers, status, statusText },
	{ retryAttempts, didFail }
) => ({
	data,
	headers,
	status,
	statusText,
	retryAttempts,
	didFail
})

const get = async (url, options = {}, retryAttempts) => {
	const maxRetryAttempts = options.maxRetryAttempts || DEFAULT_MAX_RETRY_ATTEMPTS
	
	if (retryAttempts === undefined)
		retryAttempts = maxRetryAttempts
	
	try {
		const response = await axios.get(url, {
			headers: {
				Accept: 'text/html',
				'User-Agent': getRandomUserAgent(),
				'Cache-Control': 'no-cache',
				'Accept-Language': 'en-US,en',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Dest': 'document',
				'Sec-Fetch-Mode': 'navigate',
				...options.headers
			}
		})
		
		return transformResponse(response, {
			retryAttempts: maxRetryAttempts - retryAttempts,
			didFail: false
		})
	} catch ({ response }) {
		const { status } = response
		
		return status === 404 || status === 500 || retryAttempts <= 0
			? transformResponse(response, {
				retryAttempts: maxRetryAttempts - retryAttempts,
				didFail: true
			})
			: get(url, options, retryAttempts - 1)
	}
}

module.exports = get
