import { state, assertInit } from "./index";

export interface RequestProps {
  query: string;
  variables?: Record<string, unknown>;
}

export const graphqlRequest = async ({ query, variables }: RequestProps) => {
  assertInit("authenticate");

  const { jwt: accessToken, prismaticUrl } = state;

  const response = await fetch(`${prismaticUrl}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
};
