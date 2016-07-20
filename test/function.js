require('../pointfree').expose(global)

const assert = require("assert"),
  quickCheckLaws = require('./helper').quickCheckLaws,
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  asGenerator = claire.asGenerator,
  forAll = claire.forAll

const _stubFn = () => () => _.Str.next().value;
const FunGen = asGenerator(_stubFn)

describe('Function', () => {
  const
    f = x => x + 'hello',
    g = y => y + 'world'

  describe("Monoid", () => {
    it('runs the functions then concats the values together', () => {
      assert.equal(mappend(f, g)(' bla '), ' bla hello bla world')
      assert.equal(mconcat([f, g])(' bla '), ' bla hello bla world')
    })
  })

  describe("Functor", () => {
    it('composes the functions', () => {
      assert.equal(map(g, f)(' bla '), ' bla helloworld')
    })
  })

  describe("Applicative", () => {
    it('runs each function with the arg then passes the results on', () => {
      const h = curry((x,y) => x.toUpperCase() + y.toLowerCase())

      assert.equal(liftA2(h, f, g)(' bla '), ' BLA HELLO bla world')
    })

    it('runs each function with the arg then passes the results on (with 3)', () => {
      const h = curry((x,y,z) => x.toUpperCase() + y.toLowerCase() + z)
      const i = z => z + 'last';

      assert.equal(liftA3(h, f, g, i)(' bla '), ' BLA HELLO bla world bla last')
    })
  })
})
