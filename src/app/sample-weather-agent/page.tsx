"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { getAgentRuntimeUrl } from "@/lib/agent-config";
import SampleAgentPage from "./sample-agent";

export default function SampleRoute() {
  return (
    <CopilotKit runtimeUrl={getAgentRuntimeUrl("sample_weather_agent")} agent="sample_weather_agent">
      <SampleAgentPage />
    </CopilotKit>
  );
}
