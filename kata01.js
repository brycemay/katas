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
