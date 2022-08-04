"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TicketTypeRequest = _interopRequireDefault(require("./lib/TicketTypeRequest.js"));

var _InvalidPurchaseException = _interopRequireDefault(require("./lib/InvalidPurchaseException.js"));

var _TicketPaymentService = _interopRequireDefault(require("../thirdparty/paymentgateway/TicketPaymentService.js"));

var _SeatReservationService = _interopRequireDefault(require("../thirdparty/seatbooking/SeatReservationService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _adultTicketCost = /*#__PURE__*/new WeakMap();

var _childTicketCost = /*#__PURE__*/new WeakMap();

var _infantTicketCost = /*#__PURE__*/new WeakMap();

var _maxTickets = /*#__PURE__*/new WeakMap();

var _noAdults = /*#__PURE__*/new WeakMap();

var _splitTickets = /*#__PURE__*/new WeakSet();

var _ticketCost = /*#__PURE__*/new WeakSet();

var _calculateSeats = /*#__PURE__*/new WeakSet();

var TicketService = /*#__PURE__*/function () {
  function TicketService(adultTicketCost, childTicketCost, infantTicketCost, maxTickets, noAdults) {
    _classCallCheck(this, TicketService);

    _classPrivateMethodInitSpec(this, _calculateSeats);

    _classPrivateMethodInitSpec(this, _ticketCost);

    _classPrivateMethodInitSpec(this, _splitTickets);

    _classPrivateFieldInitSpec(this, _adultTicketCost, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _childTicketCost, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _infantTicketCost, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maxTickets, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _noAdults, {
      writable: true,
      value: void 0
    });

    var error = 0;
    var errorMessage = "";

    if (!Number.isInteger(adultTicketCost)) {
      error = 1;

      if (errorMessage === "") {
        errorMessage = "Please enter a valid ticket cost for an adult";
      }
    }

    if (!Number.isInteger(childTicketCost)) {
      if (errorMessage === "") {
        errorMessage = "Please enter a valid ticket cost for a child";
      } else {
        errorMessage = errorMessage + ", for a child";
      }
    }

    if (!Number.isInteger(infantTicketCost)) {
      if (errorMessage === "") {
        errorMessage = "Please enter a valid ticket cost for infants";
      } else {
        errorMessage = errorMessage + ", for infants";
      }
    }

    if (!Number.isInteger(maxTickets)) {
      if (errorMessage === "") {
        errorMessage = "Please enter the maximum number of tickets to purchase";
      } else {
        errorMessage = errorMessage + ", maximum number of tickets to purchase";
      }
    }

    if (!Number.isInteger(noAdults)) {
      if (errorMessage === "") {
        errorMessage = "Please enter the minimum number of adults";
      } else {
        errorMessage = errorMessage + ", minimum number of adults to purchase tickets";
      }
    }

    if (error === 1) {
      throw new TypeError(errorMessage + ".");
    }

    _classPrivateFieldSet(this, _adultTicketCost, adultTicketCost);

    _classPrivateFieldSet(this, _childTicketCost, childTicketCost);

    _classPrivateFieldSet(this, _infantTicketCost, infantTicketCost);

    _classPrivateFieldSet(this, _maxTickets, maxTickets);

    _classPrivateFieldSet(this, _noAdults, noAdults);
  }

  _createClass(TicketService, [{
    key: "purchaseTickets",
    value:
    /**
     * Should only have private methods other than the one below.
     */
    function purchaseTickets(accountId, ticketTypeRequests) {
      if (accountId === 0 || ticketTypeRequests === null || ticketTypeRequests === "" || ticketTypeRequests.length === 0) {
        if (accountId === 0) {
          throw new _InvalidPurchaseException["default"]('Please enter a valid account');
        } else if (ticketTypeRequests === null || ticketTypeRequests === "" || ticketTypeRequests.length === 0) {
          throw new _InvalidPurchaseException["default"]('Please purchase tickets');
        }
      }

      var splitAdultTickets = _classPrivateMethodGet(this, _splitTickets, _splitTickets2).call(this, ticketTypeRequests, "ADULT");

      var splitChildTickets = _classPrivateMethodGet(this, _splitTickets, _splitTickets2).call(this, ticketTypeRequests, "CHILD");

      var splitInfantTickets = _classPrivateMethodGet(this, _splitTickets, _splitTickets2).call(this, ticketTypeRequests, "INFANT");

      var adultTickets = new _TicketTypeRequest["default"]("ADULT", splitAdultTickets.length);
      var childTickets = new _TicketTypeRequest["default"]("CHILD", splitChildTickets.length);
      var infantTickets = new _TicketTypeRequest["default"]("INFANT", splitInfantTickets.length);
      var totalTickets = adultTickets.getNoOfTickets() + childTickets.getNoOfTickets() + infantTickets.getNoOfTickets();

      if (adultTickets.length < _classPrivateFieldGet(this, _noAdults) || totalTickets > _classPrivateFieldGet(this, _maxTickets)) {
        if (totalTickets > _classPrivateFieldGet(this, _maxTickets)) {
          throw new _InvalidPurchaseException["default"]('Maximum number of tickets exceeded');
        } else if (adultTickets.length < _classPrivateFieldGet(this, _noAdults)) {
          throw new _InvalidPurchaseException["default"]('You need to purchase at least 1 adult ticket');
        }
      } else {
        var adultTicketCost = _classPrivateMethodGet(this, _ticketCost, _ticketCost2).call(this, "ADULT", adultTickets);

        var childTicketCost = _classPrivateMethodGet(this, _ticketCost, _ticketCost2).call(this, "CHILD", childTickets);

        var infantTicketCost = _classPrivateMethodGet(this, _ticketCost, _ticketCost2).call(this, "INFANT", infantTickets);

        var totalTicketCost = adultTicketCost + childTicketCost + infantTicketCost;

        var seatsRequestNo = _classPrivateMethodGet(this, _calculateSeats, _calculateSeats2).call(this, adultTickets, childTickets, infantTickets, "no");

        var paymentService = new _TicketPaymentService["default"]();
        var seatReservationService = new _SeatReservationService["default"]();
        var checkPayment = paymentService.makePayment(accountId, totalTicketCost);

        if (checkPayment) {
          seatReservationService.reserveSeat(accountId, seatsRequestNo);
          return "Thank you for your booking, the total cost is \xA3".concat(totalTicketCost, " , we have reserved ").concat(seatsRequestNo, " seats for the show.");
        } else {
          throw new _InvalidPurchaseException["default"]('Payment issue seats not booked');
        }
      }
    }
  }]);

  return TicketService;
}();

exports["default"] = TicketService;

function _splitTickets2(ticketTypeRequests, filterType) {
  return ticketTypeRequests.filter(function (item) {
    return item.toUpperCase() === filterType;
  });
}

function _ticketCost2(type, tickets) {
  if (type === "ADULT") {
    return tickets.getNoOfTickets() * _classPrivateFieldGet(this, _adultTicketCost);
  } else if (type === "CHILD") {
    return tickets.getNoOfTickets() * _classPrivateFieldGet(this, _childTicketCost);
  } else {
    return tickets.getNoOfTickets() * _classPrivateFieldGet(this, _infantTicketCost);
  }
}

function _calculateSeats2(adults, children, infants, allocatInfant) {
  var infantSeat;

  if (allocatInfant == "no") {
    infantSeat = 0;
  } else {
    infantSeat = infants.getNoOfTickets();
  }

  return adults.getNoOfTickets() + children.getNoOfTickets() + infantSeat;
}

var ticketsService = new TicketService(20, 10, 0, 20, 1);

try {
  var testTicketPurchase = ticketsService.purchaseTickets(1, ["Adult", "ADULT", "CHILD", "INFANT"]);
  console.log(testTicketPurchase);
} catch (e) {
  console.log(e);
}
