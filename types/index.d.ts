declare namespace UserRequest {
	/** Request and response headers. */
	export type Headers = Record<string, any>
	
	/**
	 * Request options.
	 * 
	 * - `maxRetryAttempts`: The maximum number of time this request can be retried. Defaults to `10`.
	 * - `headers`: You can override or add request headers.
	 */
	export interface Options {
		maxRetryAttempts?: number
		headers?: Headers
	}
	
	/**
	 * Response data.
	 * 
	 * - `data`: The page's HTML content.
	 * - `headers`: The response headers.
	 * - `status`: The status code.
	 * - `statusText`: The status text.
	 * - `retryAttempts`: The number of retry attempts this request took.
	 * - `didFail`: If the request failed by either returning a 404 or 500, or running out of retry attempts.
	 */
	export interface Response {
		data: string
		headers: Headers
		status: number
		statusText: string
		retryAttempts: number
		didFail: boolean
	}
}

/**
 * Fetch a page with the specified URL.
 * 
 * @param url The desired page URL.
 * @param options The request options.
 * 
 * @returns A `Promise` of the `Response`. This function never returns a rejected `Promise`.
 * 
 * @example
 * const response = await get('https://memorize.ai')
 * console.log(response.data)
 */
declare function UserRequest(url: string, options?: UserRequest.Options): Promise<UserRequest.Response>

export = UserRequest
