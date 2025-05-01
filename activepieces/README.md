# Huly Activepieces Integration

This directory contains the Activepieces integration for the Huly MCP server, allowing AI assistants to interact with Huly through standardized interfaces.

## Overview

This integration provides a set of actions and triggers that can be used in Activepieces workflows to interact with the Huly project and document management platform.

## Actions

- **Find Person**: Search for people in Huly by name or email
- **Find Project**: Search for projects in Huly by ID or name
- **Find Issues**: List issues in a Huly project sorted by last modified date
- **Find Documents**: List documents in a Huly teamspace by name
- **Create Person**: Create a new person record in Huly with email
- **Create Issue**: Create a new issue in a Huly project
- **Create Milestone**: Create a new milestone in a Huly project
- **Create Document**: Create a document with Markdown content in a Huly teamspace

## Triggers

- **New Document**: Triggers when a new document is created in a Huly teamspace
- **New Issue**: Triggers when a new issue is created in a Huly project

## Authentication

The integration uses a custom authentication method that requires:

- **MCP Server URL**: The URL of your Huly MCP server (e.g., https://your-mcp-server.com)
- **API Key** (optional): Your Huly API key if required for authentication

## Installation

To use this piece in Activepieces:

1. Build the piece:
   ```bash
   cd activepieces
   npm install
   npm run build
   ```

2. Add the piece to your Activepieces instance:
   - Copy the built package to your Activepieces instance pieces directory
   - Add "huly" to the `AP_DEV_PIECES` environment variable in your Activepieces installation
   - Restart the Activepieces backend

## Usage with AI Assistants

To use this integration with AI assistants:

1. Set up workflows in Activepieces that use the Huly actions and triggers
2. Connect your AI assistant to these workflows using the Activepieces AI integration
3. The AI assistant can now interact with your Huly platform through natural language commands

## Development

To modify or extend this integration:

1. Make changes to the source files
2. Run `npm run build` to build the piece
3. Test in your Activepieces instance
4. Once satisfied, commit changes to the repository

## License

MIT
