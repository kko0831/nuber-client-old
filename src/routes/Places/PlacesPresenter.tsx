import Header from "components/Header";
import Place from "components/Place";
import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { getPlaces } from "../../types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({ data, loading }) => {
  if (
    data &&
    data.GetMyPlaces &&
    data.GetMyPlaces.ok &&
    data.GetMyPlaces.places
  ) {
    const places = data.GetMyPlaces.places;
    return (
      <React.Fragment>
        <Helmet>
          <title>Places | Number</title>
        </Helmet>
        <Header title={"Places"} backTo={"/"} />
        <Container>
          {!loading && places && places.length === 0 && "You have no places"}
          {!loading &&
            places &&
            places.map((place) => (
              <Place
                key={place!.id}
                id={place!.id}
                fav={place!.isFav}
                name={place!.name}
                address={place!.address}
              />
            ))}
        </Container>
        <SLink to={"/add-place"}>Add some places!</SLink>
      </React.Fragment>
    );
  } else {
    return <div>can't load</div>;
  }
};

export default PlacesPresenter;
