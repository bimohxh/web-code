var Animal = function (name) {
  this.name = name
}

var a = new Animal('a')
var b = new Animal('b')

Animal.prototype.say = function () {
  console.log('hello I can say')
}
a.__proto__.fuck = function () {
  console.log('fuck')
}


console.log(Animal.prototype === a.__proto__)