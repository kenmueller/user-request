export type Headers = Record<string, any>

export interface Options {
	maxRetryAttempts?: number
	headers?: Headers
}

export interface Response {
	data: string
	headers: Headers
	status: number
	statusText: string
	retryAttempts: number
	didFail: boolean
}

function get(url: string, options?: Options): Promise<Response>

export = get
