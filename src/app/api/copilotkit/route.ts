import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@ag-ui/langgraph"
import { NextRequest } from "next/server";
import { agentConfigs } from "@/lib/agent-config";
 
// Use the empty adapter for multi-agent support
const serviceAdapter = new ExperimentalEmptyAdapter();

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

// Handle CopilotKit requests to the API endpoint
export const POST = async (req: NextRequest) => {
  // The endpoint is always the same for all agents since they share one endpoint
  const endpoint = "/api/copilotkit";
  
  // Debug logging: log available agents when handling requests
  try {
    const body = await req.clone().json().catch(() => ({}));
    const agentId = (body as any)?.agent;
    const availableAgents = Object.keys(runtime.agents);
    
    if (agentId) {
      console.log(`[CopilotKit] Handling request for agent: ${agentId}, Available agents: ${availableAgents.join(', ')}`);
    }
  } catch {
    // Silently fail if we can't parse the body
  }
  
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime, 
    serviceAdapter,
    endpoint,
  });
 
  return handleRequest(req);
};