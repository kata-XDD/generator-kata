import {printer} from "./utils";

describe("utils printer", () => {
   test("should return 'hello'", () => {
       expect(printer()).toBe("hello")
   })
});