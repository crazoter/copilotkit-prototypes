import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@ag-ui/langgraph"
import { NextRequest } from "next/server";
import { agentConfigs } from "@/lib/agent-config";

// Initialize the CopilotRuntime with LangGraph agents with every POST request to the endpoint
// This ensures that issues with the runtime doesn't arise (e.g. missing agents etc.)
const initRuntime = () => {
  const buildAgentConfig = (graphId: string) => {
    return {
      deploymentUrl: process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123",
      langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
      graphId,
    };
  };
  
  // Create the CopilotRuntime instance with all configured agents
  const runtime = new CopilotRuntime({
    agents: Object.fromEntries(
      Object.keys(agentConfigs).map(id => [
        id,
        new LangGraphAgent(buildAgentConfig(id))
      ])
    )
  });
  return runtime;
};

// Handle CopilotKit requests to the API endpoint
export const POST = async (req: NextRequest) => {
  const runtime = initRuntime();

  // KIV: Explore other adapters
  const serviceAdapter = new ExperimentalEmptyAdapter();

  // Extract the pathname to determine which endpoint is being called
  const pathname = new URL(req.url).pathname;
  const agentId = Object.entries(agentConfigs).find(
    ([_, config]) => config.endpoint === pathname
  )?.[0];

  const endpoint = agentId ? agentConfigs[agentId as keyof typeof agentConfigs].endpoint : "/api/copilotkit";
  
  // Debug logging: log available agents when handling requests
  try {
    console.log("POST handlerequest", endpoint)
    const body = await req.clone().json().catch(() => ({}));
    const availableAgents = Object.keys(runtime.agents);
    console.log(`[CopilotKit] Request Body: ${JSON.stringify(body)}, Available agents: ${availableAgents.join(', ')}`);
  } catch (err) {
    console.log("parse body handlerequest", err)
  }
  
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime, 
    serviceAdapter,
    endpoint,
  });
 
  return handleRequest(req);
};