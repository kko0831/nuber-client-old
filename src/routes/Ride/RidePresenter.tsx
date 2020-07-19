import Button from "components/Button";
import React from "react";
import styled from "../../typed-components";
import { getRide } from "../../types/api";

const defaultProfile =
  "https://user-images.githubusercontent.com/11402468/58876263-7ee5fa80-8708-11e9-8eb7-b5ef5f2966d0.jpeg";

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  rideData?: getRide;
}

const RidePresenter: React.SFC<IProps> = ({ rideData }) => {
  if (rideData && rideData.GetRide && rideData.GetRide.ok) {
    const ride = rideData.GetRide.ride;
    return (
      <Container>
        {ride && (
          <React.Fragment>
            <Title>Passenger</Title>
            {ride.passenger && (
              <Passenger>
                <Img src={ride.passenger.profilePhoto || defaultProfile} />
                <Data>{ride.passenger.fullName}</Data>
              </Passenger>
            )}
            {ride.driver && (
              <React.Fragment>
                <Title>Driver</Title>
                <Passenger>
                  <Img src={ride.driver.profilePhoto || defaultProfile} />
                  <Data>{ride.driver.fullName}</Data>
                </Passenger>
              </React.Fragment>
            )}
            <Title>From</Title>
            <Data>{ride.pickUpAddress}</Data>
            <Title>To</Title>
            <Data>{ride.dropOffAddress}</Data>
            <Title>Price</Title>
            <Data>{ride.price}</Data>
            <Title>Distance</Title>
            <Data>{ride.distance}</Data>
            <Title>Duration</Title>
            <Data>{ride.duration}</Data>
            <Title>Status</Title>
            <Data>{ride.status}</Data>
            <Buttons>
              <ExtendedButton value={"Picked Up"} onClick={() => ""} />
            </Buttons>
          </React.Fragment>
        )}
      </Container>
    );
  } else {
    return <div>can't load</div>;
  }
};

export default RidePresenter;
