const assert = require("assert"),
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  forAll = claire.forAll

const add = curry((x, y) => x + y)

const semigroupAssocTest = gen => {
  return forAll(gen, gen, gen).satisfy((a, b, c) => {
    assert.deepEqual(mappend(mappend(a, b), c), mappend(a, mappend(b, c)))
    return true
  }).asTest({times: 100})
}

const monoidIdentityTest = gen => {
  return forAll(gen).satisfy(m => {
    assert.deepEqual(mappend(m.empty(), m), mappend(m, m.empty()))
    return true
  }).asTest({times: 100})
}

const functorIdentity = gen => {
  return forAll(gen).satisfy(m => {
    assert.deepEqual(map(I, m), I(m))
    return true
  }).asTest({times: 100})
}

const functorComp = gen => {
  return forAll(gen).satisfy(m => {
    const
      f = add('one'),
      g = add('two')

    assert.deepEqual(map(compose(f, g), m), compose(map(f), map(g))(m))
    return true
  }).asTest({times: 100})
}

const applicativeIdentity = gen => {
  return forAll(gen).satisfy(m => {
    assert.deepEqual(ap(m.of(I), m), m)
    return true
  }).asTest({times: 100})
}

const applicativeComp = gen => {
  return forAll(gen, gen).satisfy((m, w) => {
    const
      f = m.of(add('one')),
      g = m.of(add('two')),
      _compose = curry((f,g,x) => f(g(x)))

    assert.deepEqual(ap(ap(ap(m.of(_compose), f), g), w), ap(f, ap(g, w)))
    return true
  }).asTest({times: 100})
}

const applicativeHomoMorph = gen => {
  return forAll(gen, _.Any).satisfy((m, x) => {
    const f = y => [y]

    assert.deepEqual(ap(m.of(f), m.of(x)), m.of(f(x)))
    return true
  }).asTest({times: 100})
}

const applicativeInterChange = gen => {
  return forAll(gen, _.Any).satisfy((m, x) => {
    const u = m.of(x => [x])

    assert.deepEqual(ap(u, m.of(x)), ap(m.of(f => f(x)), u))
    return true
  }).asTest({times: 100})
}

const monadAssoc = gen => {
  return forAll(gen).satisfy(m => {
    const
      f = x => m.of(add('nest1', x)),
      g = x => m.of(add('nest2', x)),
      h = x => m.of(add('nest3', x)),
      mcompose_ = curry((f, g, x) => chain(f, g(x)))

    assert.deepEqual(mcompose_(f, mcompose_(g, h))(m), mcompose_(mcompose_(f, g), h)(m))
    return true
  }).asTest({times: 100})
}

const Laws = {
  Semigroup: [['associativity', semigroupAssocTest]],
  Monoid: [['identity', monoidIdentityTest]],
  Functor: [['identity', functorIdentity], ['composition', functorComp]],
  Applicative: [
    ['identity', applicativeIdentity],
    ['composition', applicativeComp],
    ['homomorphism', applicativeHomoMorph],
    ['interchange', applicativeInterChange],
  ],
  Monad: [['assoc', monadAssoc]],
}

module.exports.quickCheckLaws = laws => {
  Object.keys(laws).map(typeclass => {
    describe(typeclass, () => {
      Laws[typeclass].map(law => {
        it(law[0], law[1](laws[typeclass]))
      })
    })
  })
}
