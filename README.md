# CopilotKit <> LangGraph Starter

This is a toy project that uses the starter template for building AI agents using [LangGraph](https://www.langchain.com/langgraph) and [CopilotKit](https://copilotkit.ai). It provides a modern Next.js application with an integrated LangGraph agent to be built on top of.

It also combines all the features presented on copilotkit's feature-viewer.

For now this uses the dev server which spins up both the front-end and agent together. In the future can probably consider shifting to FastAPI etc. Also need to look into auth (https://docs.copilotkit.ai/langgraph/auth)

- References:
  - https://docs.copilotkit.ai/
  - https://docs.copilotkit.ai/langgraph/quickstart
  - https://feature-viewer.copilotkit.ai/langgraph/feature/backend_tool_rendering?file=agent.ts&view=code
    - Adding a new agent:
      - Add py file to agent dir
      - Add relevant page files and styling to their own dir in on the frontend side
      - Add agent name to langgraph.json
      - Add agent to route.ts
      - Some code is hot-reloadable but some are not so just refresh every time
    - Website code seems to be based on: https://github.com/CopilotKit/ag2-feature-viewer

- Notes:
  - SEED users: Remember that Cloudflare self-signed cert can interfere with operations if you've not configured your computer to deal with it already
  - Some of the examples use additional modules e.g. TipTap etc. The ones that are not so straightforward are:
    - Haiku-gen: Used shadcn for the carousel component as it was the closest fit to the codebase it was ported from (could not find the full original src code). Installation was done by npm per the instructions in https://ui.shadcn.com/docs/installation/next

- Potentially useful references (beware that they may not be up to date and just don't work ootb e.g. the coagents-starter):
  - https://www.copilotkit.ai/examples
  - https://github.com/CopilotKit/CopilotKit/tree/main/examples
  - There's some interesting repos on like canvases https://github.com/orgs/CopilotKit/repositories
    - https://github.com/CopilotKit/open-research-ANA for example

## Prerequisites

- Node.js 18+ 
- Python 3.8+
- Any of the following package managers:
  - [pnpm](https://pnpm.io/installation) (recommended)
  - npm
  - [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
  - [bun](https://bun.sh/)
- OpenAI API Key (for the LangGraph agent)

> **Note:** This repository ignores lock files (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb) to avoid conflicts between different package managers. Each developer should generate their own lock file using their preferred package manager. After that, make sure to delete it from the .gitignore.

## Getting Started

1. Install dependencies using your preferred package manager:
```bash
# Using pnpm (recommended)
pnpm install

# Using npm (I used this one)
npm install

# Using yarn
yarn install

# Using bun
bun install
```

> **Note:** Installing the package dependencies will also install the agent's python dependencies via the `install:agent` script.


2. Set up your OpenAI API key:
```bash
echo 'OPENAI_API_KEY=your-openai-api-key-here' > agent/.env
# echo 'OPENAI_API_BASE=your-openai-api-url-here' > agent/.env # If using LLMaaS
```

3. Start the development server:
```bash
# Using pnpm
pnpm dev

# Using npm (I used this one)
npm run dev

# Using yarn
yarn dev

# Using bun
bun run dev
```

This will start both the UI and agent servers concurrently.

## Available Scripts
The following scripts can also be run using your preferred package manager:
- `dev` - Starts both UI and agent servers in development mode
- `dev:debug` - Starts development servers with debug logging enabled
- `dev:ui` - Starts only the Next.js UI server
- `dev:agent` - Starts only the LangGraph agent server
- `build` - Builds the Next.js application for production
- `start` - Starts the production server
- `lint` - Runs ESLint for code linting
- `install:agent` - Installs Python dependencies for the agent

## Documentation

The main UI component is in `src/app/page.tsx`. You can:
- Modify the theme colors and styling
- Add new frontend actions
- Customize the CopilotKit sidebar appearance

## 📚 Documentation

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/) - Learn more about LangGraph and its features
- [CopilotKit Documentation](https://docs.copilotkit.ai) - Explore CopilotKit's capabilities
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [YFinance Documentation](https://pypi.org/project/yfinance/) - Financial data tools

## Contributing

Feel free to submit issues and enhancement requests! This starter is designed to be easily extensible.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Agent Connection Issues
If you see "I'm having trouble connecting to my tools", make sure:
1. The LangGraph agent is running on port 8000
2. Your OpenAI API key is set correctly
3. Both servers started successfully

### Python Dependencies
If you encounter Python import errors:
```bash
npm install:agent
```