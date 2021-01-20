const DG = require('2gis-maps')

/// map 2gis

DG.then(function () {
  const map = DG.map('map-contacts', {
    center: [52.283436, 104.296835],
    zoom: 17,
    fullscreenControl: false,
    zoomControl: false,
  })

  DG.marker([52.283436, 104.296835]).addTo(map)
})

/// end map
