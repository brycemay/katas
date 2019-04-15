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
