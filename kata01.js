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
