const numMatch = require('./index');

const rules = [
  '1&15=From 1 to 15',
  '16&30=From 16 to 30',
  '31&100=From 31 to 100',
  '125=Equal 125',
  '150&=More or equal 150'
];

const check = numMatch(rules);

console.log(check(10) === 'From 1 to 15');
console.log(check(25) === 'From 16 to 30');
console.log(check(47) === 'From 31 to 100');
console.log(check(125) === 'Equal 125');
console.log(check(151) === 'More or equal 150');
