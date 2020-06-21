import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLogin.queries";
import SocialLoginPresenter from "./SocialLoginPresenter";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(mutation) => {
          return <SocialLoginPresenter />;
        }}
      </LoginMutation>
    );
  }
}

export default SocialLoginContainer;
