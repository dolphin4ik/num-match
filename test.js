const test = require('ava');
const numMatch = require('./index');

const rules = [
  '&0=Equal or less 0',
  '1&15=From 1 to 15',
  '16&30=From 16 to 30',
  '31&100=From 31 to 100',
  '125=Equal 125',
  '131&129=Out of order',
  '199&=More or equal 199',
  '155.1&155.7=Float'
];
const check = numMatch(rules);

test('Equal or less 0', t => {
  t.is(check(-17), 'Equal or less 0');
});

test('From 1 to 15', t => {
  t.is(check(12), 'From 1 to 15');
});

test('From 16 to 30', t => {
  t.is(check(17), 'From 16 to 30');
});

test('From 31 to 100', t => {
  t.is(check(31), 'From 31 to 100');
});

test('Equal 125', t => {
  t.is(check(125), 'Equal 125');
});

test('Out of order', t => {
  t.is(check(131), 'Out of order');
});

test('More or equal 199', t => {
  t.is(check(200), 'More or equal 199');
});

test('Float', t => {
  t.is(check(155.6), 'Float');
});

test('Not in rules', t => {
  t.is(check(144), false);
});
