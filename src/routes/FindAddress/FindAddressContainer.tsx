import React from "react";
import ReactDOM from "react-dom";
import { getCode, reverseGeoCode } from "../../lib/mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FIndAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map | null;
  public state = {
    address: "",
    lat: 0,
    lng: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
      />
    );
  }

  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };

  public handleGeoError: PositionErrorCallback = () => {
    // tslint:disable-next-line
    console.error("No Position");
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    // tslint:disable-next-line
    console.log(google);
    // tslint:disable-next-line
    console.log(this.mapRef.current);
    // tslint:disable-next-line
    console.log(mapNode);
    // tslint:disable-next-line
    console.log(mapNode === this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      zoom: 11,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map!.addListener("dragend", this.handleDragEnd);
  };

  public handleDragEnd = () => {
    if (!this.map) {
      return;
    }
    const newCenter = this.map!.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    // tslint:disable-next-line
    console.log(lat, lng);
    this.setState({
      lat,
      lng,
    });
    this.reverseGeocodeAddress(lat, lng);
  };

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public onInputBlur = () => {
    // tslint:disable-next-line
    console.log("Address update!");
    const { address } = this.state;
    getCode(address);
  };

  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress,
      });
    }
  };
}

export default FIndAddressContainer;
