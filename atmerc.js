var apiKey = "d1ad0dd31bbd8f0286adb10b7656953b";
var atms = null // atm array
var counter = 0
var count = 0
var c = 0;
var locations = new Array[];
var names = new Array[];
var merID = new Array[];
function main() {
  // use default values (geolocation too annoying)
  getAtms(38.8960952, -77.1333157)
	for(var i = 0; i < atmData.length; i++) {
    atm = atmData[i]
    createMer(atm.geocode.lat, atm.geocode.lng, i)
  }
	var l1 
	var l2
	Purchase result = null;
	Merchant r = null;
	for(var i = 0; i < merID.length; i++ ) { //get location of each purchase. 
		result = getPurchase(merID[i]);
	
		if(result[0].ID == merID[i])
		{
				transactions ++
				//get location from merID
				r = getMerchant(merID[i]);
				l1 = r[1].lat;
				l2 = r[1].lng;
				location[c] = l1 + ", " + l2;
				c ++ ;
		}
		
	}
}

function updateAtmLocation() {
  var mapppp = map
  var mapCenter = map.getCenter()
  var lat = map.getCenter().lat()
  var lng = map.getCenter().lng()
  getAtms(lat, lng)
}




	
function getMerLocation(id){
 $.ajax({
        url: "http://api.reimaginebanking.com/merchants/1/purchases?key=" + apiKey,
    type: "GET",
    contentType: 'application/json',
	
	
			})
		// this is a required header
    success: function(resultsJson) {
      atms = resultsJson
    }
  })	
  var atmData = atms.data
 
}


function createMer(lat1, lng1, id1) {
	var name = "" + counter;
	names[counter] = name;
	var id = "";
	for(var i = 0; i < 24; i++)
	{
		if(id1 < 10)
		id += id1;
		else
		{
			id += id1;
			i = 12;
		}
		
	}
	merID[counter] = id;
	counter++;
	//geocode
  $.ajax({
    url: "http://api.reimaginebanking.com/merchants?key=" + apiKey,
    type: "POST",
    contentType: 'application/json',  // this is a required header
	data: JSON.stringify({
  "name": name,
  "_id": id,

  },
  "geocode": {
    "lat": lat1,
    "lng": lng1
  }
  )
  })
  
  define('merchant', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Merchant = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/merchants/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getMerchant
		  # @Returns a single merchant for a given ID
		  # @Parameters: MerchantId
		  # @Returns a JSON Object
		**/
		getMerchant: function(id) {
			var merchant;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				merchant = results.responseJSON;
			});
			return merchant;
		}

	};
    return Merchant;
});

define('purchase', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Purchase = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/purchases/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
	
		/**
		  # @Method: getPurchase
		  # @Brief: Returns a purchase for a given ID
		  # @Parameters: PurchaseId
		  # @Returns a JSON Object
		**/
		getPurchase: function(id) {
			var purchase;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			request.complete(function(results) {
				purchase = results.responseJSON;
			});
			return purchase;
		},
		/**
		  # @Method: createPurchase
		  # @Brief: Creates a new purchase for a given account
		  # @Parameters: AccountId, Purchaseobject
		  # @Note: Purchaseobject is formatted as follows:
		  # {
		  # 	"merchant_id": "string",
		  # 	"medium": "balance",
		  # 	"purchase_date": "string",
		  # 	"amount": 0,
		  # 	"status": "pending",
		  # 	"description": "string"
		  # }
		  # @Returns http response code
		**/
		createPurchase: function(accID, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithAccountEntity()+accID+'/purchases?key='+this.apiKey(),
					data: json,
					contentType: 'application/json',
					async: false,
					type: 'POST'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
		
	};
    return Purchase;
};

