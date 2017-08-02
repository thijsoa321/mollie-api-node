// Generated by CoffeeScript 1.12.6

/*
	Example 07 - How to refund a Payment.
 */

(function() {
  var example, fs, mollie;

  mollie = require("./mollie");

  fs = require("fs");

  example = (function() {
    function example(request, response) {
      mollie.payments.all((function(_this) {
        return function(payments) {
          var payment;
          payment = payments[0];

          /*
          				Refund creation parameters.
          				See: https://www.mollie.com/en/docs/reference/refunds/create
           */
          return mollie.payments_refunds.withParent(payment).create({}, function(refund) {
            if (refund.error) {
              console.error(refund.error);
              return response.end();
            }
            response.write("<p>New refund created " + refund.id + " (" + refund.amount + ").</p>");
            return response.end();
          });
        };
      })(this));
    }


    /*
    		NOTE: This example uses a text file as a database. Please use a real database like MySQL in production code.
     */

    example.prototype.databaseWrite = function(orderId, customerStatus) {
      orderId = parseInt(orderId);
      return fs.writeFile(__dirname + ("/orders/order-" + orderId + ".txt"), customerStatus);
    };

    return example;

  })();

  module.exports = example;

}).call(this);
