import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";

class FIndAddressContainer extends React.Component<any> {
  public mapRef: any;
  public map: google.maps.Map | null;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
  }

  public componentDidMount() {
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
        lat: 37.4898,
        lng: 127.113,
      },
      disableDefaultUI: true,
      zoom: 11,
    };
    this.map = new maps.Map(mapNode, mapConfig);
  }

  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
}

export default FIndAddressContainer;
