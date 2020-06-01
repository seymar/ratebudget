/**
 * @name    ratebudget
 * @author  seymar
 * @date    June 2020
 */

 /**
 * @function create_ratebudget
 * @param options {
 *      period: 1000    Period in milliseconds
 * }
 * @returns async function (fn, costs)
 *      @param  fn      The function to execute
 *      @param  costs   The costs of the function per period. For example to
 *                      rate limit the function to 3 times/s, costs = 334 [ms]
 *      @returns        Promise that resolves when the function is executed
 */
export function create_ratebudget (options) {
    const period = options.period
    const burst = typeof options.burst == 'undefined' ? true : options.burst

    let budgeted = 0, release_times = []

    return async (fn, costs) => new Promise((res, rej) => {
        const now = new Date().getTime()

        // Remove release times that are in the past
        release_times = release_times.filter(t => t > now)

        // If no budget, delay until budget becomes available/is released.
        // Normally there is a delay until the next budget release time.
        // In burst mode there is a delay until the next budget period
        const execution_time = budgeted > period || !burst ?
                               release_times.shift() || now : now

        const usage_period = burst ? period : costs

        setTimeout(() => {
            res(fn())
        }, execution_time - now)

        budgeted += costs
        release_times.push(execution_time + usage_period)
    })
}