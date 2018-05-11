document.addEventListener("turbolinks:load", function() {
  let map = new GMaps({
    div: '#map',
    lat: -12,
    lng: -77
  });
  window.map = map;

  let transactions = JSON.parse(document.querySelector("#map").dataset.transactions);
  window.transactions = transactions;

  let bounds = new google.maps.LatLngBounds();

  transactions.forEach(function(transaction) {
    if (transaction.latitude && transaction.longitude) {
      let marker = map.addMarker({
        lat: transaction.latitude,
        lng: transaction.longitude,
        title: transaction.address,
        infoWindow: {
          content: `<p><a href="/transactions/${transaction.id}">${transaction.address}</a></p>`
        }
      });

    }
  });

  let l = document.querySelector("#map").dataset.l;
  if (l) {
    // use l which is user specified bounding box coordinates to decide
    // so boundings do not change before and after one search
    let latlngs = l.split(",");
    let southWest = new google.maps.LatLng(latlngs[0], latlngs[1]);
    let northEast = new google.maps.LatLng(latlngs[2], latlngs[3]);
    let bounds = new google.maps.LatLngBounds(southWest, northEast);
    map.fitBounds(bounds, 0); // 0 for removing padding
  } else {
    map.fitZoom();
  }

  document.querySelector("#redo-search").addEventListener("click", function(e) {
    e.preventDefault();

    let bounds = map.getBounds();
    let location = bounds.getSouthWest().toUrlValue() + "," + bounds.getNorthEast().toUrlValue();

    Turbolinks.visit(`/transactions?l=${location}`);
  })
});
