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

});
