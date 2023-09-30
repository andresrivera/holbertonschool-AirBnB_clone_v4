#!/usr/bin/node
window.onload = function () {
  // Create empty object to store amenities
  const checkedAmenities = {};
  $('input').css('margin-left', '10px');
  // Listen for changes on each input checkbox
  $('input:checkbox').change(function () {
    const myId = ($(this).data('id'));
    const myName = ($(this).data('name'));
    if ($(this).is(':checked')) {
      checkedAmenities[myId] = myName;
    } else {
      if (checkedAmenities[myId]) {
        delete checkedAmenities[myId];
      }
    }
    const amenitiyList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiyList).css({ width: '220px', height: '16px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' });
  });
};
$.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    $('SECTION.places').append(data.map(place => {
      return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`;
    }));
  }
});
