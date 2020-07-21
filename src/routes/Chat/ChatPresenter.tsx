import Header from "components/Header";
import React from "react";
import styled from "../../typed-components";

const Container = styled.div``;

const ChatPresenter: React.SFC = () => (
  <Container>
    <Header title="Chat" />
  </Container>
);

export default ChatPresenter;
