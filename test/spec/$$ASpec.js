describe("$$A", function() {

  describe("Test isArray", function() {
    it("Input [] should be true ", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray([])).toBeTruthy();
    });

    it("Input new Array() should be true", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray(new Array())).toBeTruthy();
    });

    it("Input new Object() should be false", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray(new Object())).toBeFalsy();
    });

    it("Input null should be true", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray(null)).toBeFalsy();
    });

    it("Input number should be true", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray(1)).toBeFalsy();
    });

    it("Input undefined should be true", function() {
      //demonstrates use of custom matcher
      expect($$A.isArray(undefined)).toBeFalsy();
    });

  })

  describe("The unique", function(){
    it("Input number array", function(){
      var arr = [1, 2, 6, 0, 0, 3, 4, 5,];
      // var afArr = [1, 2, 3, 4, 5, 6, 0];
      expect($$A.unique(arr).length).toBe(7);
      expect($$A.unique(arr)[4]).toBe(3);
    })

    it("Input string array", function(){
      var arr = ["aaa", "aaa", "bbb"];
      expect($$A.unique(arr).length).toBe(2);
      expect($$A.unique(arr)[0]).toBe("aaa");
      expect($$A.unique(arr)[1]).toBe("bbb");
    })

    it("Input array include null", function(){
      var arr = ["aaa", "aaa", null];
      expect($$A.unique(arr).length).toBe(2);
      expect($$A.unique(arr)[0]).toBe("aaa");
      expect($$A.unique(arr)[1]).toBe(null);
    })

    xit("Input Double Dimensional Array", function(){
      var arr = [
        {a: "a", b: "b"},
        {a: "a", b: "b"},
        {c: "c", d: "d"}
      ];
      expect($$A.unique(arr).length).toBe(2);
    })
  })

  
  describe('Test random', function(){
    
    xit('Input empty array []', function(){
      var Input = [];
      //random为随机函数顾执行10次
      expect(Input).toContain($$A.random(Input))
    });
    
    it('Input number array', function(){
      var Input = [1,2,3,4,5,0];

      //random为随机函数顾执行10次
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
    });
    
    it('Input string array', function(){
      var Input = ["adsfads","adsfads","qrae","asdfadsf","asdkjf ","", " "];

      //random为随机函数顾执行10次
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
    });
    
    it('Input number mixin string array', function(){
      var Input = ["adsfads","adsfads","qrae","asdfadsf","asdkjf ","", " ", 1,2,3,4,5,0, null];

      //random为随机函数顾执行10次
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
      expect(Input).toContain($$A.random(Input))
    });

  });
  
  //TODO
  xdescribe('Test shuffle', function(){
    
    it('Input number array', function(){
      var Input = [1,2,3,4];
      //测试是否返回为新数组
      expect($$A.shuffle(Input)).not.toBe(Input);
    });
  });
  
  describe('Test contains', function(){

    it("Input number array", function(){
      var Input = [1,2,3,4];
      
      expect($$A.contains(Input, 2)).toBeTruthy();
    })

    it("Input number mixin string array", function(){
      var Input = ["adsfads","adsfads","qrae","asdfadsf","asdkjf ","", " ", 1,2,3,4,5,0, null];

      expect($$A.contains(Input, "adsfads")).toBeTruthy();
    })

    it("Input string array", function(){
      var Input = ["adsfads","adsfads","qrae","asdfadsf","asdkjf ","", " "];

      expect($$A.contains(Input, "")).toBeTruthy();
      expect($$A.contains(Input, " ")).toBeTruthy();
    })
  });

  describe('Test', function(){
    
  });
    
});
