# s-ratelimiter
Ratelimits function calls by delaying them
* Allows for bursts of calls
* Simple lightweight implementation

# Example
```javascript
import { create_ratelimiter } from './s-ratelimiter.mjs'

const ratelimit = create_ratelimiter({
    amount: 1,
    period: 1000 // once/1000ms
})

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