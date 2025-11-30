/**
 * Agent configuration mapping agent IDs to their respective endpoints
 * Each agent can have its own endpoint or share a common one.
 * All agents currently share /api/copilotkit and are distinguished by the agent ID in requests.
 */
export const agentConfigs = {
  sample_weather_agent: { endpoint: "/api/copilotkit" },
  backend_tool_rendering: { endpoint: "/api/copilotkit" },
  basic_chat: { endpoint: "/api/copilotkit" },
  human_in_the_loop: { endpoint: "/api/copilotkit" },
  loading_tasks_sample: { endpoint: "/api/copilotkit" },
  haiku_gen: { endpoint: "/api/copilotkit" },
  shared_state_recipe_maker: { endpoint: "/api/copilotkit" },
  predictive_state_md_editor: { endpoint: "/api/copilotkit" },
  sub_graphs_example: { endpoint: "/api/copilotkit" },
} as const;

export type AgentId = keyof typeof agentConfigs;

/**
 * Get the runtime URL for a specific agent
 */
export function getAgentRuntimeUrl(agentId: AgentId): string {
  return agentConfigs[agentId].endpoint;
}
