# ratebudget
Ratelimits function calls by delaying them based on a budget
* Allows for different ratelimits (costs) per function call
* Allows for bursts of calls
* Simple lightweight implementation

Ratebudget originates from the need to make multiple API calls on an API with
a ratelimit whereby some endpoints have different ratelimits.

# Example
```javascript
import { create_ratebudget } from 'ratebudget'

const ratelimit = create_ratebudget({
    period: 1000, // In milliseconds
    burst: true // True by default
})

function somefunction (n) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(`fn ${n} done`)
            res()
        }, Math.random() * 100)
    })
}

for (let n = 0; n < 10; n++)
    ratelimit(() => somefunction('A' + n), 334) // About 3 times/second

for (let n = 0; n < 10; n++)
    ratelimit(() => somefunction('B' + n), 1000) // 1 times/second

```

## Burst mode vs non-burst mode
Burst mode is enabled by default. Calls are instantly executed until the budget
is used up. Further calls are delayed until the next period and when budget is 
available.