// Generated by CoffeeScript 1.12.6

/*
	Example 13 - How to list all Customer Payments.
 */

(function() {
  var example, mollie;

  mollie = require("./mollie");

  example = (function() {
    function example(request, response) {

      /*
      			Retrieve the last created customer for this example.
      			If no customers are created yet, run example 11.
       */
      mollie.customers.all((function(_this) {
        return function(customers) {

          /*
          				Retrieve the last created customer for this example.
          				If no customers are created yet, run example 11.
           */
          var customer;
          customer = customers[0];

          /*
          				Get the all payments for this API key ordered by newest.
           */
          return mollie.customers_payments.withParent(customer).all(function(payments) {
            var i, len, payment;
            if (payments.error) {
              console.error(payments.error);
              return response.end();
            }
            response.writeHead(200, {
              "Content-Type": "text/html; charset=utf-8"
            });
            for (i = 0, len = payments.length; i < len; i++) {
              payment = payments[i];
              response.write("€ " + payment.amount + ", status: " + payment.status + " <br>");
            }
            return response.end();
          });
        };
      })(this));
    }

    return example;

  })();

  module.exports = example;

}).call(this);
