/* eslint-env mocha */

import assert from 'assert'
import { describe, it } from 'vitest'
import minuteToHours from './index'

describe('minuteToHours', () => {
  it('converts minutes to hours', () => {
    assert(minuteToHours(60) === 1)
    assert(minuteToHours(120) === 2)
  })

  it('uses floor rounding', () => {
    assert(minuteToHours(61) === 1)
    assert(minuteToHours(59) === 0)
  })

  it('handles border values', () => {
    assert(minuteToHours(60.5) === 1)
    assert(minuteToHours(0) === 0)
  })
})
