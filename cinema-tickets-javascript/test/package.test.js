import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../src/pairtest/TicketService.js';

describe("Test ticket service class", () => {

    const ticketService = new TicketService(20,10,0,20,1);

    test("Test throws error when account id not valid.", () => {

      const testArray = ["Adult", "Adult", "Infant", "Child"];
      const errorMessage = "Please enter a valid account";

      expect(() => { ticketService.purchaseTickets(0, testArray) }).toThrow(errorMessage);

    });


    test("Test throws error when empty array passed in.", () => {

      const testArray = [];
      const errorMessage = "Please purchase tickets";

      expect(() => { ticketService.purchaseTickets(1, testArray) }).toThrow(errorMessage);

    });
  
    test("Test to ensure splitTickets returns array of only Adult tickets when returned.", () => {

      const testArray = ["ADULT", "ADULT", "INFANT", "CHILD"];
      const expectedArray = ["ADULT", "ADULT"];

      expect(ticketService.splitTickets(testArray, "ADULT")).toStrictEqual(expectedArray);

    });

    test("Test to ensure splitTickets returns array of only Child tickets when returned.", () => {

      const testArray = ["ADULT", "ADULT", "INFANT", "CHILD"];
      const expectedArray = ["CHILD"];

      expect(ticketService.splitTickets(testArray, "CHILD")).toStrictEqual(expectedArray);

    });

    test("Test to ensure splitTickets returns array of only Infant tickets when retunred.", () => {

      const testArray = ["ADULT", "ADULT", "INFANT", "v"];
      const expectedArray = ["INFANT"];

      expect(ticketService.splitTickets(testArray, "INFANT")).toStrictEqual(expectedArray);

    });

    test("Test to ensure correct cost returned for adults.", () => {

      const adultArray = ["ADULT", "ADULT"];
      const testObject = new TicketTypeRequest("ADULT", adultArray.length);
      const expectedCost = 40;

      expect(ticketService.ticketCost("ADULT", testObject)).toStrictEqual(expectedCost);

    });

    test("Test to ensure correct cost returned for one child.", () => {

      const childArray = ["CHILD"];
      const testObject = new TicketTypeRequest("CHILD", childArray.length);
      const expectedCost = 10;

      expect(ticketService.ticketCost("CHILD", testObject)).toStrictEqual(expectedCost);

    });

    test("Test to ensure correct cost returned for one infant.", () => {

      const infantArray = ["INFANT"];
      const testObject = new TicketTypeRequest("INFANT", infantArray.length);
      const expectedCost = 0;

      expect(ticketService.ticketCost("INFANT", testObject)).toStrictEqual(expectedCost);

    });
   
    test("Test to ensure correct number of seats returned for 3 adults 1 child and an infant.", () => {

      const adultArray = ["ADULT", "ADULT", "ADULT"];
      const adultObject = new TicketTypeRequest("ADULT", adultArray.length);
      const childArray = ["CHILD"];
      const childObject = new TicketTypeRequest("CHILD", childArray.length);
      const infantArray = ["INFANT"];
      const infantObject = new TicketTypeRequest("INFANT", infantArray.length);
      const expectedSeats = 4;

      expect(ticketService.calculateSeats(adultObject, childObject, infantObject, "no")).toStrictEqual(expectedSeats);

    });
    

  });