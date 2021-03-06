import React from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";

import { Hotels } from "./data/Hotels";
import HotelList from "./HotelList";
import FilterContext from '../contexts/FilterContext';

const mapStyles = {
  width: "40%",
  height: "90%",
};

class MapContainer extends React.Component {
  static contextType = FilterContext;
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    hotels: Hotels, // Imported from ./data
  };

  // Show searchbar
  componentDidMount() {
    this.context.handleShowSearchBar(true);
  }

  // Show infoWindow
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  // Hide InfoWindow on Map click
  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({ showingInfoWindow: false });
    }
  };

  // Display Map Markers
  displayMarkers = () => {
    return this.state.hotels.map((hotel, index) => (
      <Marker
        icon={"./img/png/Group 1.png"}
        key={index}
        id={index}
        title={hotel.adr}
        position={{
          lat: hotel.lat,
          lng: hotel.lng,
        }}
        onClick={this.onMarkerClick}
        label={"€" + hotel.price.toString()}
        infoWindow={
          <div>
            <div className="img">
              <img alt={hotel.adr} src={"." + hotel.images[0]}></img>
            </div>
            <div className="display-flex-marker">
              <div>€{hotel.price} / night</div>
              <div className="flex">
                <span className="star">&#9733;</span>
                <p>{hotel.rating}</p>
                <span className="txt-sm">({hotel.reviews})</span>
              </div>
            </div>

            <h5>{hotel.adr}</h5>
            <h6>{hotel.title}</h6>
          </div>
        }
      />
    ));
  };

  render() {
    return (
      <div className="map-container">
        <Map
          className="map-google"
          style={mapStyles}
          onClick={this.onMapClicked}
          google={this.props.google}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControlOptions={{ position: this.props.google.maps.ControlPosition.TOP_LEFT }}
          zoom={13}
          initialCenter={{ lat: 59.437, lng: 24.753 }}
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.infoWindow}</h1>
            </div>
          </InfoWindow>
        </Map>
        <HotelList Hotels={this.state.hotels} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBHdU__81BSA5DomC3pSQ2ruurRy7pIkfk",
})(MapContainer);
