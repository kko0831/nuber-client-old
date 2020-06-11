import React from "react";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <span>{isLoggedIn ? "you are in" : "you are out"}</span>
);

export default AppPresenter;
