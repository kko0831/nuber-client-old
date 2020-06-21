import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
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
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: "",
  };
  public facebookMutation:
    | MutationFn<facebookConnect, facebookConnectVariables>
    | undefined = undefined;
  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutation>
    );
  }
  public loginCallback = (response) => {
    // tslint:disable-next-line
    console.log(response);
    const { name, first_name, last_name, id, accessToken, email } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}`);
      if (accessToken && this.facebookMutation) {
        this.facebookMutation({
          variables: {
            email,
            fbId: id,
            firstName: first_name,
            lastName: last_name,
          },
        });
      }
    } else {
      toast.error("Cound not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
