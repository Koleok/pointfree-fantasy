require('../pointfree').expose(global)

const Constant = require('../instances/const'),
  quickCheckLaws = require('./helper').quickCheckLaws,
  Const = Constant.Const,
  getConst = Constant.getConst,
  assert = require("assert"),
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  forAll = claire.forAll

var ConstGen = claire.transform(Const, _.Str)

describe('Const', () => {
  quickCheckLaws({ Functor: ConstGen })

  describe('Functor', () => {
    it('ignores map entirely', () => {
      const someFn = x => x + 'this will not happen'

      assert.deepEqual(map(someFn, Const('hi')), Const('hi'))
    })
  })

  describe('Applicative', () => {
    it('concats values if value is a monoid', () =>  {
      assert.deepEqual(Const('1').ap(Const('2')), Const('12'))
    })
  })
})
