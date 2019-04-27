# num-match
Verbal number classifier

```sh
npm i num-match
```

```javascript
const numMatch = require('num-match');
// or
const numMatch from 'num-match';
```

### Create array of verbal rules:
```javascript
const rules = [
  '&2=baby', // till 2
  '3&8=child', // from 3 to 8
  '9&18=teenager',
  '19&26!=student', // from 19 to 26 (26 not include)
  // use ! to not to "include"
  '26&=grownup' // from 26
];
```

### Create your func and use:
```javascript
const match = numMatch(rules);

match(0); // baby
match(5); // child
match(14); // teenager
match(25); // student
match(99); // grownup
```

### Feature
```javascript
const rules = [
  '17=Just 17' // strict 17
];
const match = numMatch(rules);
match(17); // Just 17
match(100); // false (no match)
```

### Test
```sh
npm test
```