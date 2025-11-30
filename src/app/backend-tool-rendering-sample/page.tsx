"use client";

import { CopilotKit } from "@copilotkit/react-core";
import AgenticChat from "./backend-tool-rendering";

export default function Route() {
  return (
    <><AgenticChat params={Promise.resolve({ integrationId: "langgraph" })} /></>
  );
}
