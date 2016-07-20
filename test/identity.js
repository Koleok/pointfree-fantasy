require('../pointfree').expose(global)

const assert = require("assert"),
  quickCheckLaws = require('./helper').quickCheckLaws,
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  asGenerator = claire.asGenerator,
  forAll = claire.forAll,
  Identity = require('../instances/identity').Identity

const IdentityGen = claire.transform(Identity, _.Str)

describe('Identity', () => {
  quickCheckLaws({
    Semigroup: IdentityGen,
    Monoid: IdentityGen,
    Functor: IdentityGen,
    Applicative: IdentityGen,
    Monad: IdentityGen,
  })
})
