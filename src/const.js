class ConstType {
  constructor(val) {
    this.val = val
  }

  map(x) {
    return Const(this.val)
  }

  of(x) {
    return Const(x.empty())
  }

  ap(c2) {
    return Const(this.val.concat(c2.val))
  }
}

const getConst = c => c.val
const Const = val => new ConstType(val)

Const.of = ConstType.prototype.of

export default { Const, getConst }
