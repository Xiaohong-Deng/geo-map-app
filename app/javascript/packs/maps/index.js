document.addEventListener("turbolinks:load", function() {
  new GMaps({
    div: '#map',
    lat: -12,
    lng: -77
  });
  window.map = map;

  var transactions = JSON.parse(document.querySelector("#map").dataset.transactions);
  window.transactions = transactions;

  var bounds = new google.maps.LatLngBounds();

  transactions.forEach(function(transaction) {
    if (transaction.latitude && transaction.longitude) {
      let markder = map.addMarker({
        lat: transaction.latitude,
        lng: transaction.longitude,
        title: transaction.address,
        infoWindow: {
          content: `<p><a href="/transactions/${transaction.id}">${transaction.address}</a></p>`
        }
      });

      bounds.extend(markder.position);
    }
  });

  map.fitBounds(bounds);
});
