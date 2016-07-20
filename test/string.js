require('../pointfree').expose(global)

const assert = require("assert"),
  quickCheckLaws = require('./helper').quickCheckLaws,
  curry = require('lodash.curry'),
  claire = require('claire'),
  _ = claire.data,
  forAll = claire.forAll

describe('String', () => {
  quickCheckLaws({ Semigroup: _.Str, Monoid: _.Str })
})
