const getRandomId = require('../../utils/generateUniqueId');
describe("Generate Unique ID", () =>{
   it("Should generate an unique ID", () =>{
    const id = getRandomId();
    expect(id).toBe(4);
   });
});