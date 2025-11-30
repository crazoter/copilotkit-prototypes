"use client";

import Body from "./body";

export default function Route() {
  return (
    <><Body params={Promise.resolve({ integrationId: "langgraph" })} /></>
  );
}
