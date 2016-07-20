require('../pointfree').expose(global)

const Maybe = require('../instances/maybe'),
  Just = Maybe.Just,
  Nothing = Maybe.Nothing,
  assert = require("assert"),
  quickCheckLaws = require('./helper').quickCheckLaws,
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  forAll = claire.forAll


const pluck = curry((x, o) => o[x])

const safeGet = curry((x, o) => Maybe(o[x]))

const add = curry((x, y) => x + y)

const user = {email: "sally@test.com", address: {street: {number: 23, name: "Winston"}}}

const MaybeGen = claire.transform(Maybe, _.Any)
const MaybeMonoidGen = claire.transform(Maybe, _.Str)

describe('Maybe', () => {
  quickCheckLaws({
    Semigroup: MaybeMonoidGen,
    Monoid: MaybeMonoidGen,
    Functor: MaybeGen,
    Applicative: MaybeMonoidGen,
    Monad: MaybeGen,
  })

  describe('Monoid', () => {
    it('ignores the nulls and combines the contained monoid', () => {
      assert.deepEqual(mconcat([Just("hi, "), Nothing(), Just("guy")]), Just("hi, guy"))
    })
  })

  describe('Functor', () => {
    it('works with map', () => {
      const getStreet = compose(map(add('my email is ')), safeGet('email'))
      assert.deepEqual(getStreet(user), Just('my email is sally@test.com'))
    })
  })

  describe('Applicative', () => {
    it('runs if values are present', () => {
      assert.deepEqual(Just(add('yo ')).ap(Just('dawg')), Just('yo dawg'))
    })

    it('fails on null', () => {
      assert.deepEqual(Just(add('yo ')).ap(Just('dawg')).ap(Nothing()), Nothing())
    })

    it('applys the function to the value within the context of Maybe', () => {
      assert.deepEqual(ap(Just(add(2)), Just(3)), Just(5))
    })

    it('lifts a function into the maybe context', () => {
      assert.deepEqual(liftA2(add, Just(2), Just(3)), Just(5))
    })
  })

  describe('Monad', () => {
    const flatSafeTraverseStreetName = compose(
      mjoin,
      map(safeGet('name')),
      mjoin,
      map(safeGet('street')),
      safeGet('address')
    )

    it('flattens the nested maps', () => {
      const user = {email: "sally@test.com", address: {street: {number: 23, name: "Winston"}}}
      assert.deepEqual(flatSafeTraverseStreetName(user), Just('Winston'))
    })

    it('fails if null', () => {
      const user = {email: "sally@test.com", address: null}
      assert.deepEqual(flatSafeTraverseStreetName(user), Nothing())
    })

    it('binds a value to the function', () => {
      const result = chain(three => chain(four => Just(three + four), Just(4)), Just(3))
      assert.deepEqual(result, Just(7))
    })
  })
  describe('Other', () => {
    it('is traversable', () => {
      const f = x => [x]
      assert.deepEqual(traverse(f, Array.of, Just(1)), [Just(1)])
    })

    it('is foldable', () => {
      assert.deepEqual(foldMap(concat([1,2]), Just([3,4])), [1,2,3,4])
      assert.deepEqual(toList(Just(3)), [3])
    })
  })
})
