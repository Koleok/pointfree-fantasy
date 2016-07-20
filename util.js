"use strict"

const Constructor = function(f) {
  const x = function(){
    if(!(this instanceof x)){
      const inst = new x()
      f.apply(inst, arguments)
      return inst
    }
    f.apply(this, arguments)
  }

  return x
}
exports.Constructor = Constructor

const makeType = function(f) {
  f = f || function(v){ this.val = v }
  return Constructor(f)
}
exports.makeType = makeType

const subClass = function(superclass, constructr) {
  const x = makeType()
  x.prototype = new superclass()
  x.prototype.constructor=constructr
  return x
}
exports.subClass = subClass

exports.K = x => () => x

exports.I = x => x
