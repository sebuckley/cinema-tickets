import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';


export default class TicketService {

  #adultTicketCost;
  #childTicketCost;
  #infantTicketCost;
  #maxTickets;
  #noAdults;

  constructor(adultTicketCost, childTicketCost, infantTicketCost, maxTickets, noAdults){

    let error = 0; 
    let errorMessage = "";

    if(!Number.isInteger(adultTicketCost)){

      error = 1;

      if(errorMessage === ""){

        errorMessage = "Please enter a valid ticket cost for an adult";

      }
      
    }

    if(!Number.isInteger(childTicketCost)){

      if(errorMessage === ""){

        errorMessage = "Please enter a valid ticket cost for a child";

      }else{

        errorMessage = errorMessage + ", for a child";

      }
      

    }

    if(!Number.isInteger(infantTicketCost)){

      if(errorMessage === ""){

        errorMessage = "Please enter a valid ticket cost for infants";

      }else{

        errorMessage = errorMessage + ", for infants";

      }

    }

    if (!Number.isInteger(maxTickets)){

      if(errorMessage === ""){

        errorMessage = "Please enter the maximum number of tickets to purchase";

      }else{

        errorMessage = errorMessage + ", maximum number of tickets to purchase";

      }

    }

    if (!Number.isInteger(noAdults)){

      if(errorMessage === ""){

        errorMessage = "Please enter the minimum number of adults";

      }else{

        errorMessage = errorMessage + ", minimum number of adults to purchase tickets";

      }

    }

    if(error === 1){

      throw new TypeError(errorMessage + ".");

    }

    this.#adultTicketCost = adultTicketCost;
    this.#childTicketCost = childTicketCost;
    this.#infantTicketCost = infantTicketCost;
    this.#maxTickets = maxTickets;
    this.#noAdults = noAdults;

  }

  splitTickets(ticketTypeRequests, filterType){


    return ticketTypeRequests.filter(item => item === filterType);


  }

  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ticketTypeRequests) {

    if(accountId === 0 || ticketTypeRequests === null){

      if(accountId === 0){
        
        throw new InvalidPurchaseException('Please enter a valid account');

      }else if(ticketTypeRequest === null){

        throw new InvalidPurchaseException('Please purchase tickets');

      }

    }

    const splitAdultTickets = this.splitTickets(ticketTypeRequests, "ADULT");
    const splitChildTickets = this.splitTickets(ticketTypeRequests, "CHILD");
    const splitInfantTickets = this.splitTickets(ticketTypeRequests, "INFANT");

    const adultTickets = new TicketTypeRequest("ADULT", splitAdultTickets.length);
    const childTickets = new TicketTypeRequest("CHILD", splitChildTickets.length);
    const infantTickets = new TicketTypeRequest("INFANT", splitInfantTickets.length);

    const totalTickets = adultTickets.getNoOfTickets() + childTickets.getNoOfTickets() + infantTickets.getNoOfTickets();

    if(adultTickets.length < this.#noAdults || totalTickets > this.#maxTickets){

      if(totalTickets > this.#maxTickets){
        
        throw new InvalidPurchaseException('Maximum number of tickets exceeded');

      }else if(adultTickets.length < this.#noAdults){

        throw new InvalidPurchaseException('You need to purchase at least 1 adult ticket');

      }

    }else{

      const adultTicketCost = adultTickets.getNoOfTickets() *  this.#adultTicketCost;
      const childTicketCost = childTickets.getNoOfTickets() *  this.#childTicketCost;
      const infantTicketCost = infantTickets.getNoOfTickets() *  this.#infantTicketCost;

      const totalTicketCost = adultTicketCost + childTicketCost + infantTicketCost;

      const seatsRequestNo = adultTickets.getNoOfTickets() + childTickets.getNoOfTickets();

      const paymentService = new TicketPaymentService;
      const seatReservationService = new SeatReservationService;

      let checkPayment = paymentService.makePayment(accountId, totalTicketCost);

      if(checkPayment){

        seatReservationService.reserveSeat(accountId, seatsRequestNo);

        return `Thank you for your booking, the total cost is £${totalTicketCost} , we have reserved ${seatsRequestNo} seats for the show.`;

      }else{

        throw new InvalidPurchaseException('Payment issue seats not booked');

      }

    }

  }

}

const ticketsService = new TicketService(20,10,0,20,1);

try{

  let testTicketPurchase = ticketsService.purchaseTickets(1,["ADULT","ADULT", "INFANT","CHILD","ADULT","ADULT", "INFANT","CHILD"]);

  console.log(testTicketPurchase);

}catch(e){

  console.log(e);

}





