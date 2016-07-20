const curry = require('lodash.curry')

const _flatten = xs => xs.reduce((a,b) => a.concat(b), [])

const _fmap = function(f) {
  return this.map(x => f(x)) //avoid index
}

Object.defineProperty(Array.prototype, 'fmap', {
  value: _fmap,
  writable: true,
  configurable: true,
  enumerable: false
})

const _empty = () => []

Object.defineProperty(Array.prototype, 'empty', {
  value: _empty,
  writable: true,
  configurable: true,
  enumerable: false
})

const _chain = function(f) { return _flatten(this.fmap(f)) }

Object.defineProperty(Array.prototype, 'chain',{
  value: _chain,
  writable: true,
  configurable: true,
  enumerable: false
})

const _of = x => [x]

Object.defineProperty(Array.prototype, 'of', {
  value: _of,
  writable: true,
  configurable: true,
  enumerable: false
})

const _ap = function(a2) {
  return _flatten(this.map(f => a2.map(a => f(a))))
}

Object.defineProperty(Array.prototype, 'ap',{
  value: _ap,
  writable: true,
  configurable: true,
  enumerable: false
})

const _traverse = function(f, point) {
  const cons_f = (ys, x) => f(x).map(x => y => y.concat(x)).ap(ys)
  return this.reduce(cons_f, point([]))
}

Object.defineProperty(Array.prototype, 'traverse',{
  value: _traverse,
  writable: true,
  configurable: true,
  enumerable: false
})
