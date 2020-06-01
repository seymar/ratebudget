/**
 * @author  seymar
 * @date    June 2020
 * @license MIT License
 */

 /**
 * create_ratelimiter - Creates the ratelimit function
 * @param options {
 *      amount: 3
 *      period: 1000
 * }
 * @returns async function (fn)
 *      @param  fn      The function to execute
 *      @returns        Promise that resolves when the function is executed
 */
export function create_ratelimiter (options) {
    const amount = options.amount
    const period = options.period || 1000

    let budgeted = 0, release_times = []
    let last_period = 0

    return async fn => new Promise((res, rej) => {
        const now = new Date().getTime()

        if (++budgeted > amount) {
            budgeted--
            last_period = release_times.shift()
        }

        last_period = Math.max(last_period, now)

        setTimeout(() => {
            const r = fn()
            res(r)
        }, last_period - now)

        release_times.push(last_period + period)
    })
}