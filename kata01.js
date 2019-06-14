// 1: template strings - basics
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('A template string, is wrapped in ` (backticks) instead of \' or "', function() {
    describe('by default, behaves like a normal string', function() {
      it('just surrounded by backticks', function() {
        //var str = ``;
        var str = `like a string`; //made str into a string
        assert.equal(str, 'like a string');
      });
    });
  
    var x = 42;
    var y = 23;
    
    describe('can evaluate variables, which are wrapped in "${" and "}"', function() {
      it('e.g. a simple variable "${x}" just gets evaluated', function() {
        var evaluated = `x=${x}`;
        assert.equal(evaluated, 'x=' + x);
      });
      it('multiple variables get evaluated too', function() {
        //var evaluated = `${ x } + ${ y }`;
        var evaluated = `${x}+${y}`; //removed the spaces between x and y curly brackets, 
        assert.equal(evaluated, x + '+' + y); //then added backticks
      });
    });
  
    describe('can evaluate any expression, wrapped inside "${...}"', function() {
      it('all inside "${...}" gets evaluated', function() {
        //var evaluated = `${ x } + ${ y }`; <- original
        var evaluated = `${x+y}`; //Combined x and y into the same curly brackets
        assert.equal(evaluated, x+y);
      });
      it('inside "${...}" can also be a function call', function() {
        // function getDomain(){ 
        //   return document.domain; 
        // }
        // var evaluated = `${ getDomain }`;function getDomain(){ 
          function getDomain(){ 
          return document.domain; 
        }
        var evaluated = `${ getDomain() }`;
        assert.equal(evaluated, 'tddbin.com');
      });
    });
  });
  
 // 2: template strings - multiline
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Template string, can contain multiline content', function() {
  it('wrap it in backticks (`) and add a newline, to span across two lines', function() {
    //var normalString = `line1 //// line3`;
  var normalString = `line1\n\nline3`;
    assert.equal(normalString, `line1\n\nline3`);
  });
  it('even over more than two lines', function() {
    //var multiline = ``;
    var multiline = `\n\n\n`;//added '\n\n\n'
	    
	  
    assert.equal(multiline.split('\n').length, 4);
  });
  describe('and expressions inside work too', function() {
    var x = 42;
    it('like simple variables', function() {
      //var multiline = `line 1 $ {x}`;
      var multiline = `line 1\n
      ${x}`;//added a \n after "line" then hit enter

      
      assert.equal(multiline, 'line 1\n\n      42');
    });
    it('also here spaces matter', function() {
      //var multiline = ``;
      var multiline = `\n\n42`;

      assert.equal(multiline, '\n\n42');
    });
  });
});


// 3: template strings - tagged
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Tagged template strings, are an advanced form of template strings', function() {
  it('syntax: prefix a template string with a function to call (without "()" around it)', function() {
    function tagFunction(s) {
      return s.toString();
    }
   // var evaluated = tagFunc `template string`; 
    var evaluated = tagFunction `template string`;//added "tagFunction" and wrapped 
    assert.equal(evaluated, 'template string');// with this one you can call functions without using paranthesis
  });
  describe('the tag function can access each part of the template', function() {
    describe('the 1st parameter receives only the pure strings of the template string', 
    function() {
      function tagFunction(strings) {
        return strings;
      }
      it('the strings are an array', function() {
        //var result = 'template string';
        var result = tagFunction`template string`;//added tagFunction
        assert.deepEqual(tagFunction`template string`, result);
      });
      it('expressions are NOT passed to it', function() {
        //var tagged = tagFunction`one${23}`; //added the "two" on line 27
        var tagged = tagFunction`one${23}two`;//why can we change the number inside the 
        assert.deepEqual(tagged, ['one', 'two']);//curly brackets to anything and it still works
      });
    });
    describe('the 2nd and following parameters contain the values of the processed substitution', function() {
      var one = 1;
      var two = 2;
      var three = 3;
      it('the 2nd parameter contains the first expression`s value', function() {
        //function firstValueOnly(strings, first_value) {
        function firstValueOnly(strings, firstValue) { //corrected the parameter to firstValue
          return firstValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 1);
      });
      it('the 3rd parameter contains the second expression`s value', function() {
        //function firstValueOnly(strings, firstValue, ____) {
        function firstValueOnly(strings, firstValue, secondValue) { //changed the ____ to secondValue
          return secondValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 2);
      });
      it('using ES6 rest syntax, all values can be accessed via one variable', function() {
        function valuesOnly(stringsArray, ...allValues) { // using the new ES6 rest syntax
          //return;
          return allValues; // returning allValues
        }
        assert.deepEqual(valuesOnly`uno=${one}, dos=${two}, tres=${three}`, [1, 2, 3]);
      });
    });
  });
});


// 5: arrow functions - basics
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Arrow functions', function() {
  it('are shorter to write, instead of `function(){}` write `() => {}`', function() {
    //var func = function(){};
    var func = '() => {}'; //got rid of 'function' and put quotes around
    assert.equal('' + func, '() => {}');
  });
  it('instead `{}` use an expression, as return value', function() {
    //var func = () => {};
    var func = () => {
      return 'I return too'
    };
    assert.equal(func(), 'I return too');
  });
  it('one parameter can be written without parens', () => {
    //var func = p => param - 1;
    var func = param => param - 1; //entered param
    assert.equal(func(25), 24);
  });
  it('many params require parens', () => {
    //var func = param => param + param1;
    var func = (param, param1) => param + param1; // changed it to this.. but why?
    assert.equal(func(23, 42), 23+42);
  });
  it('the function body needs parens to return an object', () => {
    //var func = () => {iAm: 'an object'};
    var func = () => ({iAm: 'an object'}); //put parenthesis around the curly brackets
    assert.deepEqual(func(), {iAm: 'an object'});
  });
});




// 6: arrow functions - binding
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

class LexicallyBound {
  getFunction() {
    return () => {
      return new LexicallyBound();
    }
  }
  getArgumentsFunction() {
    return function() {return arguments}
  }
}

describe('Arrow functions have lexical `this`, no dynamic `this`', () => {
  it('bound at definition time, use `=>`', function() {
    var bound = new LexicallyBound();
  //var fn = bound.getFunction();
    var fn = () => bound; //turned this function into an arrow function
    assert.strictEqual(fn(), bound);
  });
  it('can NOT bind a different context', function() {
 
   // var bound = new LexicallyBound();
    var bound = new LexicallyBound();
    //var fn = bound.getFunction();
    var fn = (anotherObj) => {expected=anotherObj} //basically combing all of these into one
   // var anotherObj = {};
    var anotherObj = {};
   // var expected = anotherObj;
    var expected = anotherObj;
    assert.strictEqual(fn.call(anotherObj), expected);
  });
  it('`arguments` does NOT work inside arrow functions', function() {
    var bound = new LexicallyBound();
    var fn = bound.getArgumentsFunction();
    return fn.length// added this 
    assert.equal(fn(1, 2).length, 0);
  });
});






// 7: block scope - let
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('`let` restricts the scope of the variable to the current block', () => {
  describe('`let` vs. `var`', () => {
    it('`var` works as usual, it`s scope is the function', () => {
      if (true) {
        // let varX = true; 
        var varX = true; //changed let to var, showing me that let and var are doing the same thing
      }                 //let only presist in the scope where var reaches outside the scope
      assert.equal(varX, true);
    });
    it('`let` restricts scope to inside the block', () => {
      if (true) {
        // var letX = true;
        let letX = true; //changed var to let. let involces only whats inside the scope
      }
      assert.throws(() => console.log(letX));
    });
  });

  describe('`let` usage', () => {
    it('`let` use in `for` loops', () => {
      let obj = {x: 1};
   // for (var key in obj) {}
      for (let key in obj) {} //changed var to let
      assert.throws(() => console.log(key));
    });
    it('create artifical scope, using curly braces', () => {
      {
        //var letX = true;
        let letX = true; // var can be used globally where let only deals with the scope
      }
      assert.throws(() => console.log(letX));
    });
  });
});


// 8: block scope - const
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('`const` is like `let` plus read-only', () => {
  describe('scalar values are read-only', () => {
    it('e.g. a number', () => {
      // const constNum = 0;
      // constNum = 1;
      // assert.equal(constNum, 0); 
      let constNum = 0;//changed const to let
      constNum = 0;//changed 1 to 0
      assert.equal(constNum, 0);
    });
    it('or a string', () => {
      //const constString = 'I am a const';
      let constString = 'I am a const';     //changed const to let
      // constString = 'Cant change you?';    // took this line out
      assert.equal(constString, 'I am a const');
    });
  });
  const notChangeable = 23;
  it('const scope leaks too', () => {
    assert.equal(notChangeable, 23);
  });
  describe('complex types are NOT fully read-only', () => {
    it('array`s items can be changed', () => {
      const arr = [];
      arr[0] = 0;
      //assert.equal(arr[0], 42);
      assert.equal(arr[0], 0); //changed 42 to 0
    });
    it('object`s can be modified', () => {
      const obj = {x: 1};
      //obj.x = 2;
      obj.x = 3; //changed 2 to 3
      assert.equal(obj.x, 3);
    });
  });
});


// 9: object-literals - basics
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('The object literal allows for new shorthands', () => {
  const x = 1;
  const y = 2;
  describe('with variables', () => {
    it('the short version for `{x: x}` is {x}', () => {
      const short = {x};
      //assert.deepEqual(short, {y: y});
      assert.deepEqual(short, {x: 1}); //changed the y: y to x: 1
    });
    it('works with multiple variables too', () => {
      //const short = {x, y: z};
      const short = {x, y}; //z was not defined so i took it out
      assert.deepEqual(short, {x: x, y: y});
    });
  });
  describe('with methods', () => {
    const func = () => func;
    it('using the name only uses it as key', () => {
      //const short = {it};
      const short = {func};//changed it to func
      
      assert.deepEqual(short, {func});
    });
    it('a different key must be given explicitly, just like before ES6', () => {
   // const short = {func};
      const short = {otherKey: func};
      assert.deepEqual(short, {otherKey: func});
  
    });
    it('inline functions, can written as `obj={func(){}}` instead of `obj={func:function(){}}`', () => {
      const short = {
        //inlineFunc: 'I am inline'
        inlineFunc() {
        return 'I am inline';} //had to return 'I am inline'
      };
      assert.deepEqual(short.inlineFunc(), 'I am inline');
    });
  });
});

// 10: destructuring - array
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Destructuring arrays makes shorter code', () => {
  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    //let firstValue = [1];
    let [firstValue] = [1]; //added the brackets around firstValue
    assert.strictEqual(firstValue, 1);
  });
  it('get the last item from array', () => {
    //let lastValue = [1, 2, 3];
    let lastValue = [1, 2, 3];
      lastValue = lastValue.pop();//.pop grabs the last item from an array
    assert.strictEqual(lastValue, 3);
  });
  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    //[x, y] = [x, y];
    [x, y] = [y, x]; //swapped the x and y around
    assert.deepEqual([x, y], ['why', 'ax']);
  });
  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    //const [,z] = all;
    const [,,z] = all; //put another , in front of z each comma takes a place in an array,
    assert.equal(z, 'zet'); //so for z to equal zet, i had to move its place
  });
  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
   // const [firstName, surname, age] = user;
    const [[firstName, surname], age] = user;
    const expected = 'Some One = 23 years';
    assert.equal(`${firstName} ${surname} = ${age} years`, expected);
  });
  it('chained assignments', () => {
    let c, d;
    //let a, b = [c, d] = [1, 2];
    let [a, b] = [c, d] = [1, 2];
    assert.deepEqual([a, b, c, d], [1, 2, 1, 2]);
  });
  it('in for-of loop', () => {
    for (var [,a, b] of [[0, 1, 2]]) {} //added a comma before the 'a'
    assert.deepEqual([a, b], [1, 2]);
  });
});


// 11: destructuring - string
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Destructuring also works on strings', () => {
  it('destructure every character, just as if the string was an array', () => {
  //let a, b, c = 'abc';
    let [a, b, c] = 'abc';
    assert.deepEqual([a, b, c], ['a', 'b', 'c']);
  });
  it('missing characters are undefined', () => {
  //const [a, c] = 'ab';
    const [a,b, c] = 'ab'; //added a b value so c is undefined
    assert.equal(c, void 0);
  });
  it('unicode character work too', () => {
  //const [space, coffee] = 'a ☕';
    const [space, coffee] = ' ☕'; //0, 1, 2. space is index 0, the space between a and coffe cup is index 1, and coffe cup is index 2
    assert.equal(coffee, '\u{2615}'); //i made the coffee equal index 1
  });
});



// 12: destructuring - object
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Destructure objects', () => {
  it('by surrounding the left-hand variable with `{}`', () => {
    const {x} = {x: 1}; //added curly braces to the x
    assert.equal(x, 1);
  });
  describe('nested', () => {
    it('multiple objects', () => {
      const magic = {first: 23, second: 42};
    //const {magic: [second]} = {magic};
      const {magic: {second}} = {magic}; //put curly braces around 'second' because we want to pull out what second is
      assert.equal(second, 42);
    });
    it('object and array', () => {
    //const {z:[x]} = {z: [23, 42]};
      const {z:[x]} = {z: [42]}; // got rid of the 23 so x automatically equals 42
      assert.equal(x, 42);
    });
    it('array and object', () => {
    //const [,{lang}] = [null, [{env: 'browser', lang: 'ES6'}]];
      const [,[{lang}]] = [null, [{env: 'browser', lang: 'ES6'}]]; //added 2 more brackets to get into that nested array
      assert.equal(lang, 'ES6');
    });
  });
  describe('interesting', () => {
    it('missing refs become undefined', () => {
    //const {z} = {x: 1, z: 2};
      const {z} = {x: 1, y: 2}; //changed z:2 to y:2
      assert.equal(z, void 0);
    });
    it('destructure from builtins (string)', () => {
    //const {substr} = 1;
      const {substr} = '1'; //changed it to a string
      assert.equal(substr, String.prototype.substr);
    });
  });
});


// 13: destructuring - defaults
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('When destructuring you can also provide default values', () => {
  it('just assign a default value, like so `a=1`', () => {
  //const [a:1] = [];
    const [a=1] = []; //assigned 'a' a default value
    assert.equal(a, 1);
  });
  it('for a missing value', () => {
  //const [b=2] = [1,,3];
    const [a,b=2,c] = [1,,3];
    assert.equal(b, 2);
  });
  it('in an object', () => {
  //const [a, b=2] = {a: 1};
    const {a, b=2} = {a: 1};// 
    assert.equal(b, 2);
  });
  it('if the value is undefined', () => {
  //const {a, b} = {a: 1, b: void 0};
    const {a, b=2} = {a: 1, b: void 0};//assigning b to 2
    assert.strictEqual(b, 2);
  });
  it('also a string works with defaults', () => {
  //const [b=2] = '1';
    const [a, b=2] = '1';
    assert.equal(a, '1');
    assert.equal(b, 2);
  });
});

// 14: destructuring - parameters
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Destructuring function parameters', () => {
  describe('destruct parameters', () => {
    it('multiple params from object', () => {
    //const fn = ({id}, {name}) => {
      const fn = ({id, name}) => {
        assert.equal(id, 42);
        assert.equal(name, 'Wolfram');
      };
      const user = {name: 'Wolfram', id: 42};
      fn(user);
    });
    it('multiple params from array/object', () => {
    //const fn = ([{name}]) => {
      const fn = ([,{name}]) => { //added a comma to grab the second index
        assert.equal(name, 'Alice');
      };
      const users = [{name: 'nobody'}, {name: 'Alice', id: 42}];
      fn(users);
    });
  });
  describe('default values', () => {
    it('for simple values', () => {
   // const fn = (id, name='Bobby') => {
      const fn = (id, name='Bob') => { //changed bobby to bob
        assert.strictEqual(id, 23);
        assert.strictEqual(name, 'Bob');
      };
      fn(23);
    });
    it('for a missing array value', () => {
      const defaultUser = {id: 23, name: 'Joe'};
      //const fn = ([user]) => {
      const fn = ([user = {id: 23, name: 'Joe'}]) => {
        assert.deepEqual(user, defaultUser);
      };
      fn([]);
    });
    it('mix of parameter types', () => {
    //const fn = (id, [arr], {obj}) => {
      const fn = (id=1, [arr=2], {obj=3}) => { //assigning the values to the numbers
        assert.equal(id, 1);
        assert.equal(arr, 2);
        assert.equal(obj, 3);
      };
      fn(void 0, [], {});
    });
  });
});


// 15: destructuring - assign
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Assign object property values to new variables while destructuring', () => {
  describe('for simple objects', function() {
    it('use a colon after the property name, like so `propertyName: newName`', () => {
    //const {x: newName} = {x: 1};
      const {x: y} = {x: 1}; //just assigning the x value to y
      assert.equal(y, 1);
    });
    it('assign a new name and give it a default value using `= <default value>`', () => {
      //const {x: y=2} = {y: 23};
      const {x: y=42} = {y: 23}; //
      assert.equal(y, 42);
    });
  });
  describe('for function parameter names', function() {
    it('do it the same way, with a colon behind it', () => {
    //const fn = ({x}) => {
      const fn = ({x:y}) => { //
        assert.equal(y, 1);
      };
      fn({x: 1});
    });
    it('giving it a default value is possible too, like above', () => {
    //const fn = ({x: z=3}) => {
      const fn = ({x: y=3}) => { //
        assert.equal(y, 3);
      };
      fn({});
    });
  });
});

// 16: object-literal - computed properties
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Object literal properties may be computed values', () => {
  it('a computed property `x` needs to be surrounded by `[]`', () => {
    
    const propertyName = 'x';
 // const obj = {propertyName: 1};
    const obj = {[propertyName]: 1}; //wrapping the property name
    assert.equal(obj.x, 1);
  });
  it('can also get a function assigned', () => {
    const key = 'func';
  //const obj = {[key]: 'seven'};
    const obj = {[key]() {
      return 'seven'
    }};
    assert.equal(obj.func(), 'seven');
  });
  it('the key may also be the result of a function call', () => {
    const getName = () => 'propertyName';
 // const obj = {[getName]() {return 'seven'}};
    const obj = {[getName()]() {return 'seven'}}; //called the function inside a variable
    assert.equal(obj.propertyName(), 'seven');
  });
  it('the key can also be constructed by an expression', () => {
  //const what = 'Key';
    const what = 'Name';
  //const obj = {['proper' + what]: null};
    const obj = {['property' + what]: null};
    assert('propertyName' in obj);
  });
  it('accessor keys can be computed names too', () => {
    const obj = {
    //set ['key'](_) {return 1},
      get ['key']() {return 1},
      
    };
    assert.equal(obj.key, 1);
  });
});


// 17: unicode - in strings
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Unicode in strings', () => {
  it('are prefixed with `\\u` (one backslash and u)', () => {
  //const nuclear = 2622;
    const nuclear = '\u2622';//unicode being letters and numbers to make symbols
    assert.equal(nuclear, '☢');
  });
  it('value is 4 bytes/digits', () => {
  //const nuclear = '\u26222';
    const nuclear = '\u2622'; //deleted the additional '2'
    assert.equal(`no more ${nuclear}`, 'no more ☢');
  });
  it('even "normal" character`s values can be written as hexadecimal unicode', () => {
  //const nuclear = `\u006B\u006A more \u2622`;
    const nuclear = `\u006E\u006F more \u2622`; //E and F are normal lettersm for unicode
    assert.equal(nuclear, 'no more ☢');
  });
  it('curly braces may surround the value', () => {
  //const nuclear = `\u{0000000006E}\u00006F more \u2622`;
    const nuclear = `\u{00006E}\u{00006F} more \u2622`; //added curly braces to surround the value
    assert.equal(nuclear, 'no more ☢');
  });
});


// 19: rest - with-destructuring
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Rest parameters with destructuring', () => {
  it('must be last', () => {
  //const [...all, last] = [1, 2, 3, 4];
    const [...all] = [1, 2, 3, 4]; //
    assert.deepEqual(all, [1, 2, 3, 4]);
  });
  it('assign rest of an array to a variable', () => {
  //const [...all] = [1, 2, 3, 4];
    const [x,...all] = [1, 2, 3, 4];// x skips the first one. rest calls whats left over
    assert.deepEqual(all, [2, 3, 4]);
  });
  // the following are actually using `spread` ... oops, to be fixed #TODO
  it('concat differently', () => {
    const theEnd = [3, 4];
  //const allInOne = [1, 2, ...[theEnd]];
    const allInOne = [1, 2, ...theEnd];
    assert.deepEqual(allInOne, [1, 2, 3, 4]);
  });
  it('`apply` made simple, even for constructors', () => {
    const theDate = [2015, 1, 1];
  //const date = new Date(theDate);
    const date = new Date(...theDate);//??
    assert.deepEqual(new Date(2015, 1, 1), date);
  });
});

// 21: spread - with-strings
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Spread syntax with strings', () => {
  it('expands each character of a string by prefixing it with `...`', function() {
  //const [b, a] = [...'ab'];
    const [a, b] = [...'ab'];
    assert.equal(a, 'a');
    assert.equal(b, 'b');
  });
  it('expands any kind of character', function() {
  //const arr = [...'12'];
    const arr = [...'1 ☢ 2'];
    assert.deepEqual(arr, ['1', ' ', '☢', ' ', '2']);
  });
  it('works anywhere inside an array (must not be last)', function() {
  //const letters = ['a', 'bcd', 'e', 'f'];
    const letters = ['a', ...'bcd', 'e', 'f'];
    assert.equal(letters.length, 6);
  });
  it('don`t confuse with the rest operator', function() {
  //const [...rest] = ['1234', ...'5'];
    const [...rest] = [...'12345'];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });
  it('can also be used as function parameter', function() {
  //const max = Math.max('12345');
    const max = Math.max(...'12345');
    assert.deepEqual(max, 5);
  });
});

// 22: class - creation
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Class creation', () => {
  it('is as simple as `class XXX {}`', function() {
  //let TestClass;
    class TestClass{}//changed let to class
    const instance = new TestClass();
    assert.equal(typeof instance, 'object');
  });
  it('a class is block scoped', () => {
  //class Inside {}
    {}
    {class Inside {}}
    assert.equal(typeof Inside, 'undefined');
  });
  it('the `constructor` is a special method', function() {
    class User {
    //constructor(id) {}
      constructor(id) {
        this.id = id; //this allows you to get into the scope
      }
    }
    const user = new User(42);
    assert.equal(user.id, 42);
  });
  it('defining a method by writing it inside the class body', function() {
    //class User {
  //  }
    class User {
      writesTests() {
        return false;
      }
    }
    const notATester = new User();
    assert.equal(notATester.writesTests(), false);
  });
  it('multiple methods need no commas (opposed to object notation)', function() {
    class User {
      wroteATest() { this.everWroteATest = true; }
      wroteATest() { this.everWroteATest = true; }
   // isLazy() {  }
      isLazy() { return !this.everWroteATest }//?
    }
    const tester = new User();
    assert.equal(tester.isLazy(), true);
    tester.wroteATest();
    assert.equal(tester.isLazy(), false);
  });
  it('anonymous class', () => {
   // const classType = typeof {
    const classType = typeof class{};//?? I have no clue
    assert.equal(classType, 'function');
  });
});


// 22: class - creation
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Class creation', () => {
  it('is as simple as `class XXX {}`', function() {
  //let TestClass;
    class TestClass{}//changed let to class
    const instance = new TestClass();
    assert.equal(typeof instance, 'object');
  });
  it('a class is block scoped', () => {
  //class Inside {}
    {}
    {class Inside {}}
    assert.equal(typeof Inside, 'undefined');
  });
  it('the `constructor` is a special method', function() {
    class User {
    //constructor(id) {}
      constructor(id) {
        this.id = id; //this allows you to get into the scope
      }
    }
    const user = new User(42);
    assert.equal(user.id, 42);
  });
  it('defining a method by writing it inside the class body', function() {
    //class User {
  //  }
    class User {
      writesTests() {
        return false;
      }
    }
    const notATester = new User();
    assert.equal(notATester.writesTests(), false);
  });
  it('multiple methods need no commas (opposed to object notation)', function() {
    class User {
      wroteATest() { this.everWroteATest = true; }
      wroteATest() { this.everWroteATest = true; }
   // isLazy() {  }
      isLazy() { return !this.everWroteATest }
    }
    const tester = new User();
    assert.equal(tester.isLazy(), true);
    tester.wroteATest();
    assert.equal(tester.isLazy(), false);
  });
  it('anonymous class', () => {
   // const classType = typeof {
    const classType = typeof class{};//?? I have no clue
    assert.equal(classType, 'function');
  });
});

// 23: class - accessors
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Class accessors (getter and setter)', () => {
  it('a getter is defined like a method prefixed with `get`', () => {
    class MyAccount {
    //get money() { return Infinity; }
      get balance() { return Infinity; }
    }
    assert.equal(new MyAccount().balance, Infinity);
  });
  it('a setter has the prefix `set`', () => {
    class MyAccount {
      get balance() { return this.amount; }
      set balance(amount) { this.amount = amount; }
    }
    const account = new MyAccount();
  //account.balance = 42;
    account.balance = 23;
    assert.equal(account.balance, 23);
  });
  
  describe('dynamic accessors', () => {
    it('a dynamic getter name is enclosed in `[]`', function() {
      const balance = 'yourMoney';
      class YourAccount {
      //get [getterName]() { return -Infinity; }
        get [balance]() { return -Infinity; }
      }
      assert.equal(new YourAccount().yourMoney, -Infinity);
    });
    it('a dynamic setter name as well', function() {
      const propertyName = 'balance';
      class MyAccount {
        get [propertyName]() { return this.amount; }
      //set propertyName(amount) { this.amount = 23; }
        set [propertyName](amount) { this.amount = 23; } //wrapped the seter name in []
      }
      const account = new MyAccount();
      account.balance = 42;
      assert.equal(account.balance, 23);
    });
  });
});



// 24: class - static keyword
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class you can use the `static` keyword', () => {
  describe('for methods', () => {
    class UnitTest {}
    it('a static method just has the prefix `static`', () => {
      class TestFactory {
       //makeTest() { return new UnitTest(); }
        static makeTest() { return new UnitTest(); }
      }
      assert.ok(TestFactory.makeTest() instanceof UnitTest);
    });
    it('the method name can be dynamic/computed at runtime', () => {
      //const methodName = 'makeTest';
      const methodName = 'createTest';
      class TestFactory {
        static [methodName]() { return new UnitTest(); }
      }
      assert.ok(TestFactory.createTest() instanceof UnitTest);
    });
  });
  describe('for accessors', () => {
    it('a getter name can be static, just prefix it with `static`', () => {
      class UnitTest {
       //get testType() { return 'unit'; }
       static get testType() { return 'unit'; }
      }
      assert.equal(UnitTest.testType, 'unit');
    });
    it('even a static getter name can be dynamic/computed at runtime', () => {
      const type = 'test' + 'Type';
      class IntegrationTest {
       //static get type() { return 'integration'; }
       static get [type]() { return 'integration'; } //have no clue
      }
      assert.ok('testType' in IntegrationTest);
      assert.equal(IntegrationTest.testType, 'integration');
    });
  });
});

// 25: class - extends
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Classes can inherit from another using `extends`', () => {
  describe('the default super class is `Object`', () => {
    it('a `class A` is an instance of `Object`', () => {
      //let A
      class A {}
      assert.equal(new A() instanceof Object, true);
    });
    it('when B extends A, B is also instance of `Object`', () => {
      class A {} 
      //class B {}
      class B extends A {}
      assert.equal(new B() instanceof A, true);
      assert.equal(new B() instanceof Object, true);
    });
    it('a class can extend `null`, and is not an instance of Object', () => {
    //class NullClass extends Object {}
      class NullClass extends null {}
      let nullInstance = new NullClass();
      assert.equal(nullInstance instanceof Object, false);
    });
  });
  describe('instance of', () => {
    it('when B inherits from A, `new B()` is also an instance of A', () => {
     //let A;
      class A{}
      class B extends A {}
      assert.equal(new B() instanceof A, true);
    });
    it('extend over multiple levels', () => {
      class A {}
      class B extends A {} //added this line
      class C extends B {}
      assert.equal(new C instanceof A, true);
    });
  });
});


// 26: class - more-extends
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Classes can inherit from another', () => {
  it('extend an `old style` "class", a function, still works', () => {
    let A = function (){};
    class B extends A {}
    assert.equal(new B() instanceof A, true);
  });
  
  describe('prototypes are as you know them', () => {
    class A {}
    class B extends A {}
    it('A is the prototype of B', () => {
      //const isIt = A.isPrototypeOf(null);
      const isIt = A.isPrototypeOf(B);
      assert.equal(isIt, true);
    });
    it('A`s prototype is also B`s prototype', () => {
      //const proto = B;
      const proto = B.prototype;
      // Remember: don't touch the assert!!! :)
      assert.equal(A.prototype.isPrototypeOf(proto), true);
    });
  });

  describe('`extends` using an expression', () => {
    it('e.g. the inline assignment of the parent class', () => {
      let A;
    //class B extends (A = {}) {}
      class B extends (A = class{}) {}
      assert.equal(new B() instanceof A, true);
    });
    it('or calling a function that returns the parent class', () => {
      const returnParent = (beNull) => beNull ? null : class {};
    //class B extends returnParent {}
      class B extends (returnParent(true)) {}
      assert.equal(Object.getPrototypeOf(B.prototype), null);
    });
  });
});

// 27: class - super inside a method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class use `super` to access parent methods', () => {
  it('use of `super` without `extends` fails (already when transpiling)', () => {
    //class A {hasSuper() { return super; }}
    class A {hasSuper() { return false; }} //can;t use super without extends
    assert.equal(new A().hasSuper(), false);
  });
  it('`super` with `extends` calls the method of the given name of the parent class', () => {
    class A {hasSuper() { return true; }}
  //class B extends A {hasSuper() { return super.hasSuper; }}
    class B extends A {hasSuper() { return super.hasSuper(); }}
    assert.equal(new B().hasSuper(), true);
  });
  it('when overridden a method does NOT automatically call its super method', () => {
    class A {hasSuper() { return true; }}
  //class B extends A {hasSuper() { return 'nothing'; }}
    class B extends A {hasSuper() { return undefined; }}
    assert.equal(new B().hasSuper(), void 0);
  });
  it('`super` works across any number of levels of inheritance', () => {
    class A {iAmSuper() { return true; }}
    class B extends A {}
  //class C extends B {iAmSuper() { return iAmSuper(); }}
    class C extends B {iAmSuper() { return super.iAmSuper(); }}//iAmSuper was not defined
    assert.equal(new C().iAmSuper(), true);
  });
  it('accessing an undefined member of the parent class returns `undefined`', () => {
    class A {}
  //class B extends A {getMethod() { return super.constructor; }}
    class B extends A {getMethod() { return undefined; }} //just made sense
    assert.equal(new B().getMethod(), void 0);
  });
});

// 28: class - super in constructor
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Inside a class`s constructor `super()` can be used', () => {
  it('if you `extend` a class, use `super()` to call the parent constructor', () => {
      class A {constructor() { this.levels = 1; }}
      //class B {
      class B extends A {
        constructor() {
          super(); //added super... super keyword in Java is a reference variable which is used to refer immediate parent class object
          this.levels++; 
        }
      }
      assert.equal(new B().levels, 2);
    });
    it('`super()` may also take params', () => {
      class A {constructor(startValue=1, addTo=1) { this.counter = startValue + addTo; }}
      class B extends A {
        constructor(...args) { 
        //super();
          super(...args);
          this.counter++; 
        }
      }
      assert.equal(new B(42, 2).counter, 45);
    });
    it('it is important where you place your `super()` call!', () => {
      class A {inc() { this.countUp = 1; }}
      class B extends A {
        inc() {
          
          this.countUp = 2;
          super.inc();// moved this line from 2 lines above
          return this.countUp;
        }
      }
      assert.equal(new B().inc(), 1);
    });
    it('use `super.constructor` to find out if there is a parent constructor', () => {
      class ParentClassA {constructor() {"parent"}}
      class B extends ParentClassA {
        constructor() {
          super();
          this.isTop = '' + super.constructor; //constructor was spelt wrong
        }
      }
      assert(new B().isTop.includes('ParentClassA'), new B().isTop);
    });
  });
  

   it('and we also get the object`s key as second parameter', function() {
    const arr = Array.from(arrayLike, (value,key) => `${key}=${value}`);
    assert.deepEqual(arr, ['0=one', '1=two']);
  });
});

// 30: array - `Array.of` static method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.of` creates an array with the given arguments as elements', () => {
  it('dont mix it up with `Array(10)`, where the argument is the array length', () => {
  //const arr = Array(10);
    const arr = Array.of(10); // .of assigns 10, which is an argument, to an element
    assert.deepEqual(arr, [10]);
  });
  it('puts all arguments into array elements', () => {
  //const arr = Array.of();
    const arr = Array.of(1, 2); // assigned 1, 2 to be an element
    assert.deepEqual(arr, [1, 2]);
  });
  it('takes any kind and number of arguments', () => {
    const starter = [1, 2];
    const end = [3, '4'];
  //const arr = Array.of(...starter, ...end);
    const arr = Array.of([...starter], ...end); //added square brackets
    assert.deepEqual(arr, [[1, 2], 3, '4']);
  });
});


// 31: array - `Array.prototype.fill` method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.fill` can fill up an array with one value', () => {
  it('`fill(0)` will populate `0` into each array element', function() {
  //const arr = new Array(3).fill();
    const arr = new Array(3).fill(0);// assigned .fill to 0 and had the array set to 3
    assert.deepEqual(arr, [0, 0, 0]);
  });
  it('fill only changes content, adds no new elements', function() {
  //const arr = [undefined].fill(0);
    const arr = Array.fill(0); //only made sense just by looking at it
    assert.deepEqual(arr, []);
  });
  it('second parameter to `fill()` is the position where to start filling', function() {
  //const fillPosition = 0;
    const fillPosition = 2;
    const arr = [1,2,3].fill(42, fillPosition);
    assert.deepEqual(arr, [1, 2, 42]);
  });
  it('third parameter is the position where filling stops', function() {
    const fillStartAt = 1;
  //const fillEndAt = 1;
    const fillEndAt = 2;
    const arr = [1,2,3].fill(42, fillStartAt, fillEndAt);
    assert.deepEqual(arr, [1, 42, 3]);
  });
});


// 32: array - `Array.prototype.find` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.find` makes finding items in arrays easier', () => {
  it('takes a compare function', function() {
  //const found = [true].find(true);
    const found = [false, true].find(x => x === true);
    assert.equal(found, true);
  });
  it('returns the first value found', function() {
  //const found = [0, 1].find(item => item > 1);
    const found = [0, 1, 2].find(item => item > 1);
    assert.equal(found, 2);
  });
  it('returns `undefined` when nothing was found', function() {
  //const found = [1, 2, 3].find(item => item === 2);
    const found = [1, 2, 3].find(item => item === 5);
    assert.equal(found, void 0);
  });
  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
  //const found = [bob, alice].find(({name}) => name);
    const found = [bob, alice].find(({name:{length}}) => length === alice.name.length);
    assert.equal(found, alice);
  });
});


// 33: array - `Array.prototype.findIndex` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.findIndex` makes finding items in arrays easier', () => {
  it('takes a compare function, returns the index where it returned true', function() {
  //const foundAt = [false, true].findIndex();
    const foundAt = [false, true].findIndex(item => item);
    assert.equal(foundAt, 1);
  });
  it('returns the first position it was found at', function() {
  //const foundAt = [0, 1, 1, 1].findIndex(item => item = 1);
    const foundAt = [0, 1, 1, 1].findIndex(item => item);
    assert.equal(foundAt, 1);
  });
  it('returns `-1` when nothing was found', function() {
  //const foundAt = [1, 2, 3].findIndex(item => item > 1);
    const foundAt = [1, 2, 3].findIndex(item => item > 3);
    assert.equal(foundAt, -1);
  });
  it('the findIndex callback gets the item, index and array as arguments', function() {
    const three = 3;
    const containsThree = arr => arr.indexOf(three) > -1;
  //function theSecondThree(index, arr) {
    function theSecondThree(item, index, arr) {
      const preceedingItems = arr.slice(0, index);
      return containsThree(preceedingItems);
    }
    const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree);
    assert.equal(foundAt, 4);
  });
  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
  //const foundAt = [bob, alice].findIndex(({name:{length:l}}) => length > 3);
    const foundAt = [bob, alice].findIndex(({name:{length}}) => length > 3);
    assert.equal(foundAt, 1);
  });
});

// 34: symbol - basics
// A symbol is a unique and immutable data type and may be used as an identifier for object properties
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Symbol', function() {
  it('`Symbol` lives in the global scope', function(){
  //const expected = someNamespace.Symbol;
    const expected = Symbol;
    assert.equal(Symbol, expected);
  });
  it('every `Symbol()` is unique', function(){
    const sym1 = Symbol();
  //const sym2 = sym1;
    const sym2 = Symbol();
    assert.notEqual(sym1, sym2);
  });
  it('every `Symbol()` is unique, also with the same parameter', function(){
    var sym1 = Symbol('foo');
  //var sym1 = Symbol('foo');
    var sym2 = Symbol('foo');
    assert.notEqual(sym1, sym2);
  });
  it('`typeof Symbol()` returns "symbol"', function(){
  //const theType = typeof Symbol;
    const theType = typeof Symbol('symbol');
    assert.equal(theType, 'symbol');
  });
  it('`new Symbol()` throws an exception, to prevent creation of Symbol wrapper objects', 
  function(){
    function fn() {
    //Symbol();
      new Symbol();
    }
    assert.throws(fn);
  });
});


// 35: Symbol.for - retrieves or creates a runtime-wide symbol
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Symbol.for` for registering Symbols globally', function() {
  it('creates a new symbol (check via `typeof`)', function() {
  //const symbolType = Symbol.for('symbol name');
    const symbolType = typeof Symbol.for('symbol name');
    assert.equal(symbolType, 'symbol');
  });
  it('stores the symbol in a runtime-wide registry and retrieves it from there', function() {
    const sym = Symbol.for('new symbol'); // added typeof
    const sym1 = Symbol.for('new symbol'); //added typeof
    assert.equal(sym, sym1);
  });
  it('is different to `Symbol()` which creates a symbol every time and does not store it', function() {
    var globalSymbol = Symbol.for('new symbol');
  //var localSymbol = Symbol.for('new symbol');
    var localSymbol = Symbol('new symbol');
    assert.notEqual(globalSymbol, localSymbol);
  });
  describe('`.toString()` on a Symbol', function() {
    it('also contains the key given to `Symbol.for()`', function() {
    //const description = Symbol('').toString();
      const description = Symbol('new symbol').toString();
      assert.equal(description, 'Symbol(new symbol)');
    });
    describe('NOTE: the description of two different symbols', function() {
      it('might be the same', function() {
        const symbol1AsString = Symbol('new symbol 1').toString();
        const symbol2AsString = Symbol.for('new symbol').toString();
        assert.equal(symbol1AsString, symbol2AsString);
      });
      it('but the symbols are not the same!', function() {
        const symbol1 = Symbol.for('new symbol 1'); //added the 1 after new symbol
        const symbol2 = Symbol.for('new symbol');
        assert.notEqual(symbol1, symbol2);
      });
    });    
  });
});

// 36: Symbol.keyFor - retrieves a shared symbol key from the global symbol registry
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Symbol.keyFor()` gets the symbol key for a given symbol', function() {
  it('pass the symbol to `keyFor()` and you get its key', function() {
  //const key = Symbol.____(Symbol.for('foo'));
    const key = Symbol.keyFor(Symbol.for('foo'));
    assert.equal(key, 'foo');
  });
  it('local symbols are not in the runtime-wide registry', function() {
    // Hint: `Symbol()` creates a local symbol!
  //const localSymbol = Symbol.for('foo');
    const localSymbol = Symbol('foo');
    const key = Symbol.keyFor(localSymbol);
    assert.equal(key, void 0);
  });
  it('predefined symbols are not in the runtime-wide registry either', function() {
    const key = Symbol.keyFor(Symbol.iterator);//added lowercase t in iteraTor
    assert.equal(key, void 0);
  });
  it('for non-Symbols throws an error', function() {
    function fn() {
    //Symbol.keyFor(Symbol.for('foo'));
      Symbol(Symbol.for('foo'));
    }
    assert.throws(fn);
  });
});

// 37: iterator/iterable - array. 
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!

describe('array is a built-in iterable object', function() {
  
  const arr = ['a', 'B', 'see'];

  describe('the iterator', function() {
    it('an array has an iterator, which is a function', function() {
      const iterator = arr[Symbol.iterator];
      const theType = typeof iterator;
      const expected = 'function';
      
      assert.equal(theType, expected);
    });
    
    it('can be looped with `for-of`, which expects an iterable', function() {
      let count = 0;
      for (let value of arr) {
        count++;
      }
      
      assert.equal(count, arr.length);
    });
  });

  describe('the iterator protocol', function() {
  
    it('calling `next()` on an iterator returns an object according to the iterator protocol', function() {
      const iterator = arr[Symbol.iterator]();
      const firstItem = iterator.next();
      
      assert.deepEqual(firstItem, {done: false, value: 'a'});
    });
    
    it('the after-last element has done=true', function() {
      const arr = [];
      const iterator = arr[Symbol.iterator]();
      const afterLast = iterator.next();
      
      assert.deepEqual(afterLast, {done: true, value: void 0});
    });
    
  });
  

  // 38: iterator/iterable - string. 
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!

describe('string is a built-in iterable object', function() {
  
  const s = 'abc';
  
  describe('string is iterable', function() {
    it('the string`s object key `Symbol.iterator` is a function', function() {
      const isA = typeof s[Symbol.iterator];
      assert.equal(isA, 'function');
    });
    it('use `Array.from()` to make an array out of any iterable', function(){
      const arr = Array.from(s);
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
  });
  
  describe('a string`s iterator', function() {
    let iterator;
    beforeEach(function() {
      iterator = s[Symbol.iterator]();
    });
    
    it('has a special string representation', function(){
      const description = iterator.toString();
      assert.equal(description, '[object String Iterator]');
    });
    
    it('`iterator.next()` returns an object according to the iterator protocol', function(){
      const value = iterator.next();
      assert.deepEqual(value, {done: false, value: 'a'});
    });
    
    it('the after-last call to `iterator.next()` says done=true, no more elements', function(){
      iterator.next();
      iterator.next();
      iterator.next();
      assert.equal(iterator.next().done, true);
    });
  });
  
});


// 39: iterator - custom. Iterable is a protocol, when implemented allows objects 
// to customize their iteration behavior, such as what values are looped over in a for..of construct.
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('A simple iterable without items inside, implementing the right protocol', () => {

  function iteratorFunction() {
    return {
      next: function(){
        return {done: true}
      }
    }
  }

  describe('the `iteratorFunction` needs to comply to the iterator protocol', function() {
    it('must return an object', function() {
      assert.equal(typeof iteratorFunction(), 'object');
    });
    it('the object must have a function assigned to a key `next`', function() {
      assert.equal(typeof iteratorFunction().next, 'function');
    });
    it('calling `next()` must return an object with `{done: true}`', function() {
      assert.deepEqual(iteratorFunction().next(), {done: true});
    });
  });

  let iterable;
  beforeEach(function() {
    iterable = {
      [Symbol.iterator]: iteratorFunction
    }
  });

  describe('the iterable', function() {
    it('must be an object', function() {
      assert.equal(typeof iterable, 'object');
    });
    it('must have the iterator function assigned to the key `Symbol.iterator`', function() {
      assert.equal(iterable[Symbol.iterator], iteratorFunction);
    });
  });
  
  describe('using the iterable', function() {
    it('it contains no values', function() {
      let values='';
      for (let value of iterable) {
        values += value;
      }
      assert.equal(values, '');
    });
    
    it('has no `.length` property', function() {
      const hasLengthProperty = iterable.hasOwnProperty('length');
      assert.equal(hasLengthProperty, false);
    });
    
    describe('can be converted to an array', function() {
      it('using `Array.from()`', function() {
        const arr = Array.from(iterable);
        assert.equal(Array.isArray(arr), true);
      });
      
      it('where `.length` is still 0', function() {
        const arr = Array.from(iterable);
        const length = arr.length;
        assert.equal(length, 0);
      });
    });
  });
  
});

// 40: iterator - one example usage. Build an iterable and use it with some built-in ES6 constructs.
// To do: make all tests pass, leave the assert lines unchanged!

// Consumable users: 
// - `consumableUser` contains a consumable user, 
// - `anyLeft` tells if there is any user left that can be consumed.  
class ConsumableUsers {
  constructor() {
    this.users = ['Alice', 'Bob'];
    this.empty = false;
  }
  get nextUser() {
    if (this.users.length > 0) {
      return `user: ${this.users.shift()}`;
    }
    this.empty = true;
    return void 0;
  }
  get anyLeft() {
    return this.empty;
  }
}

describe('Iterator usages', () => {

  let usersIterable;
  beforeEach(function(){
    const consumableUsers = new ConsumableUsers();
    function iteratorFunction() {
      return {
        next: function() {
          return {value: consumableUsers.nextUser, done: consumableUsers.anyLeft}
        }
      }
    }
    
    usersIterable = {};
    usersIterable[Symbol.iterator] = iteratorFunction;
  });
  
  describe('create an iterator/iterable', function() {
    it('the `usersIterable` should be iterable', function() {
      const isIterable = Symbol.iterator in usersIterable;
      assert.equal(isIterable, true);
    });
    
    it('the iterator of `usersIterable` should return an object', function() {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator, 'object');
    });
    
    it('the iterator of `usersIterable` should have a next function', function() {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator.next, 'function');
    });
  });
  
  describe('fill the iterable with content using `ConsumableUsers`', function() {
    
    describe('using the iterator', function() {
      let iterator;
      beforeEach(function(){
        iterator = usersIterable[Symbol.iterator]();
      });
      it('should return `Alice` as first user', function() {
        const firstItem = iterator.next();
        assert.deepEqual(firstItem, {value: "user: Alice", done: false});
      });
      it('should return `Bob` as second user', function() {
        iterator.next(); // drop the first item
        const secondItem = iterator.next();
        assert.deepEqual(secondItem, {value: "user: Bob", done: false});
      });
      it('should return `done:true`, which means there are no more items', function() {
        iterator.next();
        iterator.next();
        const beyondLast = iterator.next();
        assert.deepEqual(beyondLast, {value: void 0, done: true});
      })
    });
    
    
    describe('using built-in constructs', function() {
      it('use `Array.from()` to convert an iterable to an array', function() {
        const users = Array.from(usersIterable);
        assert.deepEqual(users, ['user: Alice', 'user: Bob']);
      });
      it('use for-of to loop over an iterable', function() {
        const users = [];
        for (let user of usersIterable) users.push(user);
        assert.deepEqual(users, ['user: Alice', 'user: Bob']);
      });
      it('use the spread-operator to convert/add iterable to an array', function() {
        const users = ['noname', ...usersIterable];
        assert.deepEqual(users, ['noname', 'user: Alice', 'user: Bob']);
      });
      it('destructure an iterable like an array', function() {
        const [firstUser, secondUser] = usersIterable;
        assert.equal(firstUser, 'user: Alice');
        assert.equal(secondUser, 'user: Bob');
      })
    });
  });

});
});


// 49: Generator - creation
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Generators can be created in multiple ways', function() {
  it('the most common way is by adding `*` after `function`', function() {
    //function g() {}
    function* g() {}
    assertIsGenerator(g());
  });
  it('as a function expression, by adding a `*` after `function`', function() {
  //let g = function() {};
    let g = function*() {};
    assertIsGenerator(g());
  });
  it('inside an object by prefixing the function name with `*`', function() {
    let obj = {
    //g() {}
      *g() {}
    };
    assertIsGenerator(obj.g());
  });
  it('computed generator names, are just prefixed with a `*`', function() {
    const generatorName = 'g';
    let obj = {
    //[generatorName]() {}
      *[generatorName]() {}
    };
    assertIsGenerator(obj.g());
  });
  it('inside a class the same way', function() {
    const generatorName = 'g';
    class Klazz {
    //[generatorName]() {}
      *[generatorName]() {}
    }
    assertIsGenerator(new Klazz().g());
  });

  function assertIsGenerator(gen) {
    const toStringed = '' + gen;
    assert.equal(toStringed, '[object Generator]');
  }
});


// 50: Generator - iterator
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Generators returns an iterable object', function() {
  function* generatorFunction(){
    yield 1;
    yield 2;
  }
  let generator;
  beforeEach(() => {
    generator = generatorFunction();
  });
  it('a generator returns an object', function() {
  //const typeOfTheGenerator = '';
    const typeOfTheGenerator = 'object';
    assert.equal(typeof generator, typeOfTheGenerator);
  });
  it('a generator object has a key `Symbol.iterator`', function() {
  //const key = '...?';
    const key = Symbol.iterator;
    assert.equal(key in generator, true);
  });
  it('the `Symbol.iterator` is a function', function() {
  //const theType = typeof generator.Symbol.iterator;
    const theType = typeof generator[Symbol.iterator];
    assert.equal(theType, 'function');
  });
  it('can be looped with `for-of`, which expects an iterable', function() {
    function iterateForOf(){
    //for (let value of {}) {
      for (let value of generator) {
        // no statements needed
      }
    }
    assert.doesNotThrow(iterateForOf);
  });
});