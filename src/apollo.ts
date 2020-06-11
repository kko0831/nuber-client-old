import ApolloClient, { Operation } from "apollo-boost";

const apolloClient = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt")),
      },
    },
    resolvers: {
      Mutation: {
        // 인자는 순서대로, parent, args, contexg 다. 서버와 동일하다.
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true,
              },
            },
          });
          return null;
        },
        // 인자는 순서대로, parent, args, contexg 다. 서버와 동일하다.
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: false,
              },
            },
          });
          return null;
        },
      },
    },
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt"),
      },
    });
  },
  uri: "http://localhost:4000/graphql",
});

export default apolloClient;
