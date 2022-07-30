const ticketTest = require('../src/pairtest/TicketService.js');

describe("Test ticket service", () => {

    const ticketService = new ticketTest.TicketService(20,10,0,20,1);
  
    test("defines setRule()", () => {
      expect(typeof ticketService.setRule).toBe("function");
    });
  });