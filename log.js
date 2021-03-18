var a = require('debug')('worker:a')
a("haha")
a({
    name: "Xx",
    age: 18
})
a(JSON.stringify({name: "Xx", age: 18}))
a(JSON.stringify([{name: "Xx"}, {name: "Xx2"}]))
a([{name: "Xx"}, {name: "Xx2"}], {age: 18})
a(`
<xml>
    123
<xml>
`)