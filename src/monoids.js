const Constructor = require('../util').Constructor

const getResult = x => x.val

class Max extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return Max(Number.MIN_VALUE)
  }

  concat(s2) {
    return Max(this.val > s2.val ? this.val : s2.val)
  }

  inspect(f) {
  	return 'Max('+inspect(this.val)+')'
  }
}

const inspect = x => {
  if (x === null || x === undefined) return 'null'
  return x.inspect ? x.inspect() : x
}

class Min extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return Min(Number.MAX_VALUE)
  }

  concat(s2) {
    return Min(this.val < s2.val ? this.val : s2.val)
  }

  inspect(f) {
  	return `Min(${inspect(this.val)})`
  }
}

class Sum extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return Sum(0)
  }

  concat(s2) {
    return Sum(this.val + s2.val)
  }

  inspect(f) {
  	return `Sum(${inspect(this.val)})`
  }
}

class Product extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return Product(1)
  }

  concat(s2) {
    return Product(this.val * s2.val)
  }

  inspect(f) {
  	return `Product(${inspect(this.val)})`
  }
}

class Any extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return Any(false)
  }

  concat(s2) {
    return Any(this.val || s2.val)
  }

  inspect(f) {
  	return `Any(${inspect(this.val)})`
  }
}

class All extends Constructor {
  constructor(val) {
    super(val)
    this.val = val
  }

  empty() {
    return All(true)
  }

  concat(s2) {
    return All(this.val && s2.val)
  }

  inspect(f) {
  	return `All(${inspect(this.val)})`
  }
}

export default {
  Max,
  Min,
  Sum,
  Product,
  Any,
  All,
  getResult,
}
