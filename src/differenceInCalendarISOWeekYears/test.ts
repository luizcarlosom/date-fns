/* eslint-env mocha */

import assert from 'assert'
import { describe, it } from 'vitest'
import differenceInCalendarISOWeekYears from './index'

describe('differenceInCalendarISOWeekYears', () => {
  it('returns the number of calendar ISO week-numbering years between the given dates', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(2012, 6 /* Jul */, 2, 18, 0),
      new Date(2011, 6 /* Jul */, 2, 6, 0)
    )
    assert(result === 1)
  })

  it('returns a negative number if the time value of the first date is smaller', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(2011, 6 /* Jul */, 2, 6, 0),
      new Date(2012, 6 /* Jul */, 2, 18, 0)
    )
    assert(result === -1)
  })

  it('accepts timestamps', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(2014, 6 /* Jul */, 2).getTime(),
      new Date(2010, 6 /* Jul */, 2).getTime()
    )
    assert(result === 4)
  })

  it('handles dates before 100 AD', () => {
    const firstDate = new Date(0)
    firstDate.setFullYear(14, 0 /* Jan */, 1)
    firstDate.setHours(0, 0, 0, 0)
    const secondDate = new Date(0)
    secondDate.setFullYear(0, 0 /* Jan */, 1)
    secondDate.setHours(0, 0, 0, 0)
    const result = differenceInCalendarISOWeekYears(firstDate, secondDate)
    assert(result === 15)
  })

  describe('edge cases', () => {
    it('the difference is less than an ISO year, but the given dates are in different calendar ISO years', () => {
      const result = differenceInCalendarISOWeekYears(
        new Date(2012, 0 /* Jan */, 2),
        new Date(2012, 0 /* Jan */, 1)
      )
      assert(result === 1)
    })

    it('the same for the swapped dates', () => {
      const result = differenceInCalendarISOWeekYears(
        new Date(2012, 0 /* Jan */, 1),
        new Date(2012, 0 /* Jan */, 2)
      )
      assert(result === -1)
    })

    it('the ISO weeks and weekdays of the given dates are the same', () => {
      const result = differenceInCalendarISOWeekYears(
        new Date(2013, 11 /* Dec */, 30),
        new Date(2012, 0 /* Jan */, 2)
      )
      assert(result === 2)
    })

    it('the given dates are the same', () => {
      const result = differenceInCalendarISOWeekYears(
        new Date(2014, 8 /* Sep */, 5, 0, 0),
        new Date(2014, 8 /* Sep */, 5, 0, 0)
      )
      assert(result === 0)
    })

    it('does not return -0 when the given dates are the same', () => {
      function isNegativeZero(x: number): boolean {
        return x === 0 && 1 / x < 0
      }

      const result = differenceInCalendarISOWeekYears(
        new Date(2014, 8 /* Sep */, 5, 0, 0),
        new Date(2014, 8 /* Sep */, 5, 0, 0)
      )

      const resultIsNegative = isNegativeZero(result)
      assert(resultIsNegative === false)
    })
  })

  it('returns NaN if the first date is `Invalid Date`', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(NaN),
      new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', () => {
    const result = differenceInCalendarISOWeekYears(
      new Date(NaN),
      new Date(NaN)
    )
    assert(isNaN(result))
  })
})
