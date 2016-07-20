require('../pointfree').expose(global)

const assert = require("assert"),
  quickCheckLaws = require('./helper').quickCheckLaws,
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  asGenerator = claire.asGenerator,
  monoids = require('../instances/monoids'),
  forAll = claire.forAll


const _stubFn = () => () => _.Str.next().value
const FunGen = asGenerator(_stubFn)

describe('Monoids', () => {
  it('gets the max', () => {
    assert.equal(monoids.getResult(mappend(monoids.Max(12), monoids.Max(20))), 20)
  })

  it('gets the min', () => {
    assert.equal(monoids.getResult(mappend(monoids.Min(12), monoids.Min(20))), 12)
  })

  it('gets the sum', () => {
    assert.equal(monoids.getResult(mappend(monoids.Sum(12), monoids.Sum(20))), 32)
  })

  it('gets the product', () => {
    assert.equal(monoids.getResult(mappend(monoids.Product(2), monoids.Product(20))), 40)
  })

  it('gets the disjunction', () => {
    assert.equal(monoids.getResult(mappend(monoids.Any(true), monoids.Any(false))), true)
    assert.equal(monoids.getResult(mappend(monoids.Any(false), monoids.Any(false))), false)
  })

  it('gets the conjunction', () => {
    assert.equal(monoids.getResult(mconcat([monoids.All(true), monoids.All(false)])), false)
    assert.equal(monoids.getResult(mappend(monoids.All(true), monoids.All(true))), true)
  })

  it('runs the functions then gets the conjuction', () => {
    const
      f = x => monoids.Any(x > 1),
      g = y => monoids.Any(y > 2)

    // const t = compose(monoids.getResult, monoids.mconcat, fmap(monoids.All), mconcat([f, g]))
    // assert.equal(t(2, 3), false)
    assert.deepEqual(mconcat([f, g])(4, 6), monoids.Any(true))
    assert.deepEqual(mconcat([f, g])(0, 0), monoids.Any(false))
  })

})
