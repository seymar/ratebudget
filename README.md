# s-ratelimit
Ratelimits function calls by delaying them
* Allows for bursts of calls
* Simple lightweight implementation

# Example
```javascript
import { create_ratelimiter } from './s-ratelimiter.mjs'

const ratelimit = create_ratelimiter({ amount: 1 })

function somefunction (n) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`fn ${n} done`)
        }, Math.random() * 100)
    })
}

for (let n = 0; n < 10; n++)
    ratelimit(() => {
        somefunction('A' + n)
        .then(console.log)
    })

```