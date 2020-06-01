import { create_ratelimiter } from '../s-ratelimiter.mjs'

const ratelimit = create_ratelimiter({ amount: 1 })

function somefunction (n) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(`fn ${n} done`)
            res()
        }, Math.random() * 100)
    })
}

for (let n = 0; n < 10; n++)
    ratelimit(() => somefunction('A' + n))

setTimeout(() => {
    for (let n = 0; n < 10; n++)
        ratelimit(() => somefunction('B' + n))
}, 5000)