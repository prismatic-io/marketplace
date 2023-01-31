import urlJoin from "url-join";
import { state, assertInit } from "./index";

export interface AuthenticateProps {
  token: string;
  prismaticUrl?: string;
}

const errorMessage =
  "The authenticate method expects an object containing a token and additional optional configuration.";

const expectedKeys = ["token"];

const authenticate = async (props: AuthenticateProps) => {
  assertInit("authenticate");

  if (!props) {
    throw new Error(errorMessage);
  }

  const givenProps = new Set(Object.keys(props));

  if (!expectedKeys.every((key) => givenProps.has(key))) {
    throw new Error(errorMessage);
  }

  const { token } = props;

  state.jwt = token;

  const prismaticUrl = props.prismaticUrl ?? state.prismaticUrl;

  const authResponse = await fetch(
    urlJoin(prismaticUrl, "embedded", "authenticate"),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "post",
    }
  );

  if (!authResponse.ok) {
    const responseText = await authResponse.text();
    if (responseText) {
      throw new Error(
        `Authentication failed. Server sent back: ${responseText}`
      );
    } else {
      throw new Error(
        `Authentication failed. Please check that your customer and organization information are correct, and that the token you provided is not expired.`
      );
    }
  }
};

export default authenticate;
