import Header from "components/Header";
import Place from "components/Place";
import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { getPlaces, getPlaces_GetMyPlaces_places, userProfile } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  cursor: pointer;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: MutationFn;
  userData?: userProfile;
  placesData?: getPlaces;
  userDataLoading: boolean;
  placesLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  logUserOut,
  userData,
  placesData,
  userDataLoading,
  placesLoading,
}) => {
  if (userData && userData.GetMyProfile && userData.GetMyProfile.ok) {
    const user = userData.GetMyProfile.user;
    return (
      <React.Fragment>
        <Helmet>
          <title>Settings | Nuber</title>
        </Helmet>
        <Header title={"Account Settings"} backTo={"/"} />
        <Container>
          <GridLink to={"/edit-account"}>
            {!userDataLoading &&
              user &&
              user.profilePhoto &&
              user.email &&
              user.fullName && (
                <React.Fragment>
                  <Image src={user.profilePhoto} />
                  <Keys>
                    <Key>{user.fullName}</Key>
                    <Key>{user.email}</Key>
                  </Keys>
                </React.Fragment>
              )}
          </GridLink>
          {!placesLoading &&
            placesData &&
            placesData.GetMyPlaces &&
            placesData.GetMyPlaces.ok &&
            placesData.GetMyPlaces.places &&
            placesData.GetMyPlaces.places.sort(
              (a: getPlaces_GetMyPlaces_places | null, b: getPlaces_GetMyPlaces_places | null) =>( a!.id - b!.id )).map((place) => (
              <Place
                key={place!.id}
                id={place!.id}
                fav={place!.isFav}
                name={place!.name}
                address={place!.address}
              />
            ))
            }
          <SLink to={"/places"}>Go to Places</SLink>
          <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
        </Container>
      </React.Fragment>
    );
  } else {
    return <div>can't load</div>;
  }
};
export default SettingsPresenter;
