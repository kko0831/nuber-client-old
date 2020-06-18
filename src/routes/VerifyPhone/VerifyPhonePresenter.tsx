import Button from "components/Button";
import Header from "components/Header";
import Input from "components/Input";
import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationCode: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationCode,
  onChange,
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={verificationCode}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name="verificationCode"
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
