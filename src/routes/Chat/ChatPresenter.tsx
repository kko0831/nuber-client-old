import Form from "components/Form";
import Header from "components/Header";
import Input from "components/Input";
import Message from "components/Message";
import React from "react";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";

const Container = styled.div``;

interface IProps {
  userData?: userProfile;
  chatData?: getChat;
  loading: boolean;
  messageText: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
}

const MessageList = styled.ol`
  height: 80vh;
  overflow: scroll;
  padding: 0 0.12rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  li + li {
    margin-top: 0.3rem;
  }
`;

const InputBar = styled.div`
  padding: 0 20px;
`;

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  userData,
  chatData,
  messageText,
  onInputChange,
  onSubmit,
}) => {
  if (
    chatData &&
    chatData.GetChat &&
    chatData.GetChat.ok &&
    userData &&
    userData.GetMyProfile &&
    userData.GetMyProfile.ok
  ) {
    const chat = chatData.GetChat.chat;
    const user = userData.GetMyProfile.user;
    return (
      <Container>
        <Header title={"Chat"} />
        {!loading && chat && user && (
          <React.Fragment>
            <MessageList>
              {chat.messages &&
                chat.messages!.map((message) => {
                  if (message) {
                    return (
                      <Message
                        key={message.id}
                        text={message.text}
                        mine={user.id === message.userId}
                      />
                    );
                  }
                  return false;
                })}
            </MessageList>
            <InputBar>
              <Form submitFn={onSubmit}>
                <Input
                  value={messageText}
                  placeholder="Type your message"
                  onChange={onInputChange}
                  name="message"
                />
              </Form>
            </InputBar>
          </React.Fragment>
        )}
      </Container>
    );
  } else {
    return <div>cant'see</div>;
  }
};

export default ChatPresenter;
