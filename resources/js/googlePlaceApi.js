window.initAutocomplete = initAutocomplete;

// function initAutocomplete() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -33.8688, lng: 151.2195 },
//       zoom: 13,
//       mapTypeId: "roadmap",
//     });
//     // Create the search box and link it to the UI element.
//     const input = document.getElementById("address");
//     const searchBox = new google.maps.places.SearchBox(input);
  
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener("bounds_changed", () => {
//       searchBox.setBounds(map.getBounds());
//     });
  
//     let markers = [];
  
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener("places_changed", () => {
//       const places = searchBox.getPlaces();
  
//       if (places.length == 0) {
//         return;
//       }
  
//       // Clear out the old markers.
//       markers.forEach((marker) => {
//         marker.setMap(null);
//       });
//       markers = [];
  
//       // For each place, get the icon, name and location.
//       const bounds = new google.maps.LatLngBounds();
  
//       places.forEach((place) => {
//         if (!place.geometry || !place.geometry.location) {
//           console.log("Returned place contains no geometry");
//           return;
//         }
  
//         const icon = {
//           url: place.icon,
//           size: new google.maps.Size(71, 71),
//           origin: new google.maps.Point(0, 0),
//           anchor: new google.maps.Point(17, 34),
//           scaledSize: new google.maps.Size(25, 25),
//         };
  
//         // Create a marker for each place.
//         markers.push(
//           new google.maps.Marker({
//             map,
//             icon,
//             title: place.name,
//             position: place.geometry.location,
//           }),
//         );
//         if (place.geometry.viewport) {
//           // Only geocodes have viewport.
//           bounds.union(place.geometry.viewport);
//         } else {
//           bounds.extend(place.geometry.location);
//         }
//       });
//       map.fitBounds(bounds);
//     });
//   }
let autocomplete;
let searchAddressField;
let unitNumberField;
let streetNumberField;
let streetNameField;
let postalField;
let cityField;
let countryField;
let stateField;

function initAutocomplete() {
  searchAddressField = document.querySelector("#search_address");
  unitNumberField = document.querySelector("#unit");
  streetNumberField = document.querySelector("#street_number");
  streetNameField = document.querySelector("#street_name");
  cityField = document.querySelector("#city");
  postalField = document.querySelector("#postal_code");
  countryField = document.querySelector("#country");
  stateField = document.querySelector("#state");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(searchAddressField, {
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  unitNumberField.focus();
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  unitNumberField.value = "";
  streetNumberField.value = "";
  streetNameField.value = "";
  postalField.value = "";
  countryField.value = "";
  stateField.value = "";
//   let streetNumber = "";
//   let streetName = "";
//   let postCode = "";
//   let route =  "";
  cityField.value = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];
//    console.log(componentType.getDetails())
    switch (componentType) {
    case "subpremise": {
        console.log("****************************")
        unitNumberField.value = `${component.short_name}`;
        console.log("This is subpremise: ", unitNumberField.value);
    }
      case "street_number": {
        streetNumberField.value = `${component.short_name}`;
        console.log("This is street_number: ", streetNumberField.value)
        break;
      }

      case "route": {
        streetNameField.value = component.short_name;
        // address1 += component.short_name;
        console.log("This is route: ", streetNameField.value)
        break;
      }

      case "postal_code": {
        postalField.value = `${component.long_name}${postalField.value}`;
        console.log("This is postal_code: ", postalField.value)
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        console.log("This is postcode_code_suffix: ", postcode);
        break;
      }
      case "locality":
        cityField.value = component.long_name ? component.long_name : "";
        console.log("This is locality: ", cityField.value)
        break;
      case "administrative_area_level_1": {
        state.value = component.short_name;
        console.log("This is administrative_area_level_1: ", state.value)
        break;
      }
      case "country":
        countryField.value = component.long_name;
        break;
    }
  }
//   streetNumberField.value = streetNumber;
//   streetNameField.value = streetName;
//   postalField.value = postCode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  unitNumberField.focus();
}
window.initAutocomplete = initAutocomplete;

  