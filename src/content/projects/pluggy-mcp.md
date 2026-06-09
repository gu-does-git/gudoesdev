---
name: "Pluggy MCP"
description: "MCP server for the Pluggy API — connects LLMs (Claude, Cursor, etc.) to Brazil's Open Finance ecosystem via the Model Context Protocol. Published on npm."
url: "https://github.com/gu-does-git/pluggy-mcp"
tags:
  - TypeScript
  - MCP
  - Open Finance
  - LLM
  - npm Package
featured: true
---

MCP (Model Context Protocol) server that bridges LLMs and AI agents with Brazil's Open Finance ecosystem through the Pluggy API. Built as an extended fork of `@codespar/mcp-pluggy`, adding investment tracking capabilities.

The server exposes 18 MCP tools covering connectors, accounts, transactions, identity data, investments, and payment intents — all accessible from any MCP-compatible client (Claude Desktop, Cursor, VS Code, etc.).

Published as `@gu-does-packages/pluggy-mcp` on npm and installable via `npx`.

Key Features:
- 18 MCP tools for the full Pluggy API surface
- Extended investment tools (list investments, get investment details, investment transactions)
- Plug-and-play with Claude Desktop, Cursor, VS Code
- Published on npm — zero setup with `npx @gu-does-packages/pluggy-mcp`
- TypeScript, fully typed
