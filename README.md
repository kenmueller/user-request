# user-request

> Simulate a user requesting an HTML page

Perfect for web scraping, and allows retry attempts.

You're able to bypass CloudFlare protection by using `user-request`.

## Install

```bash
npm i user-request
```

## Import

```js
const get = require('user-request')
```

Or...

```ts
import * as get from 'user-request'
```

## Instructions

### Call the `get` function with a URL to fetch that page.

```js
const response = await get('https://memorize.ai')
```

### Pass options to the `get` function

```js
const response = await get('https://memorize.ai', {
	maxRetryAttempts: 20, // Optional, 10 by default
	headers: { // Optional, you can override or add headers here
		'Accept-Encoding': 'gzip'
	}
})
```

### Properties on the `Response` object

- `data`: The page's HTML content.
- `headers`: The response headers.
- `status`: The status code.
- `statusText`: The status text.
- `retryAttempts`: The number of retry attempts this request took.
- `didFail`: If the request failed by either returning a 404 or 500, or running out of retry attempts.
