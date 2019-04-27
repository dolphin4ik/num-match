const B = require('big.js');

const parser = str => {
  let num = numA = numB = false;
  let [numbers, label] = str.split('=');
  numbers = numbers.split('&');
  if (numbers.length === 1) {
    num = parseFloat(numbers[0]);
  } else {
    numbers = numbers.sort((i, j) => parseFloat(i) > parseFloat(j));
    numA = !!numbers[0].length
      ? { strict: numbers[0].endsWith('!'), value: parseFloat(numbers[0]) }
      : false;
    numB = !!numbers[1].length
      ? { strict: numbers[1].endsWith('!'), value: parseFloat(numbers[1]) }
      : false;
  }
  return { num, numA, numB, label };
};

const eq = (num, label) => v => B(v).eq(num) ? label : false;

const lt = (numB, label) => v =>
  B(v)[numB.strict ? 'lt' : 'lte'](numB.value) ? label : false;

const gt = (numA, label) => v =>
  B(v)[numA.strict ? 'gt' : 'gte'](numA.value) ? label : false;

const bt = (numA, numB, label) => v =>
  (B(v)[numA.strict ? 'gt' : 'gte'](numA.value)
    && B(v)[numB.strict ? 'lt' : 'lte'](numB.value))
    ? label
    : false;

const numMatch = config => {
  const rules = [];
  config.forEach(i => {
    const { num, numA, numB, label } = parser(i);
    if (num) {
      rules.push(eq(num, label))
    } else if (!numA) {
      rules.push(lt(numB, label));
    } else if (!numB) {
      rules.push(gt(numA, label))
    } else {
      rules.push(bt(numA, numB, label));
    }
  });

  return v => {
    let result = false;
    rules.some(r => {
      return result = r(v);
    });
    return result;
  };
};

module.exports = numMatch;
