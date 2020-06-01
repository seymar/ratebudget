import { create_ratebudget } from './ratebudget.mjs'
/*
var counter = 0
function fn (arg) {
    counter++
    //console.log(`${counter} fn(${arg}) called`)
    return new Promise((res, rej) => {
        setTimeout(() => {
            //console.log(`${counter} fn(${arg}) resolved`)
            res()
        }, Math.random() * 100)
    })
}

const rl = create_ratebudget({ period: 1000, burst: false })

var c = -1
var ci = setInterval(() => {
    rl(() => fn(), 334).catch(console.error)

    if (++c > 10)
        clearInterval(ci)
}, 10)

setInterval(() => {
    rl(() => fn(), 2000)
}, 500)*/

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