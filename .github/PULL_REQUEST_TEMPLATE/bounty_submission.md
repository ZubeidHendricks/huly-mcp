/claim #7491

## Huly MCP Server Implementation

This PR implements a Model Context Protocol (MCP) server for Huly project and document management platform. It allows AI assistants to interact with Huly's WebSocket APIs through Activepieces.

### Features Implemented

- ✅ Full MCP server implementation with JSON-RPC 2.0 compliant API
- ✅ Connection to Huly's WebSocket APIs
- ✅ Search operations (Find Person, Project, Issue, Document)
- ✅ Write operations (Create Person, Issue, Milestone, Document)
- ✅ Comprehensive error handling and validation
- ✅ API manifest with function descriptions
- ✅ Tests for key functionality

### Demo Video

[Link to demo video showing the MCP server in action]

### Screenshots

[Screenshots of the MCP server working]

### Testing Instructions

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The server will be available at http://localhost:3000
5. Use the `/manifest` endpoint to see the available functions
6. Send JSON-RPC 2.0 requests to the `/mcp` endpoint

### Additional Notes

The server is designed to be deployed as a standalone service that can be integrated with Activepieces' MCP client. It handles connection management, request validation, and error handling automatically.

Let me know if you need any additional information or have any questions!
