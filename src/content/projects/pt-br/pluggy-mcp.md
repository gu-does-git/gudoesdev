---
name: "Pluggy MCP"
description: "Servidor MCP para a API Pluggy — conecta LLMs (Claude, Cursor, etc.) ao Open Finance Brasil através do Model Context Protocol. Publicado no npm."
url: "https://github.com/gu-does-git/pluggy-mcp"
tags:
  - TypeScript
  - MCP
  - Open Finance
  - LLM
  - npm Package
featured: true
---

Servidor MCP (Model Context Protocol) que conecta LLMs e agentes de IA ao ecossistema Open Finance Brasil através da API Pluggy. Construído como um fork estendido do `@codespar/mcp-pluggy`, adicionando funcionalidades de consulta a investimentos.

O servidor expõe 18 ferramentas MCP cobrindo conectores, contas, transações, dados cadastrais, investimentos e intenções de pagamento — acessíveis de qualquer cliente compatível com MCP (Claude Desktop, Cursor, VS Code, etc.).

Publicado como `@gu-does-packages/pluggy-mcp` no npm e instalável via `npx`.

Principais Recursos:
- 18 ferramentas MCP para toda a superfície da API Pluggy
- Ferramentas estendidas de investimentos (listar, detalhes, transações)
- Pronto para usar com Claude Desktop, Cursor, VS Code
- Publicado no npm — zero configuração com `npx @gu-does-packages/pluggy-mcp`
- TypeScript, totalmente tipado
