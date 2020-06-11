import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer: any = (props) => <div>{JSON.stringify(props.data)}</div>;

export default graphql(IS_LOGGED_IN)(AppContainer);
