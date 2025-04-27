import { McpServer } from './mcp/server';

// Load environment variables
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HULY_WS_URL = process.env.HULY_WS_URL || 'wss://api.huly.io';

// Create and start the server
const server = new McpServer(PORT, HULY_WS_URL);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  server.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  server.stop();
  process.exit(0);
});

// Start the server
server.start()
  .then(() => {
    console.log(`Huly MCP Server started successfully. Connected to ${HULY_WS_URL}`);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`API Manifest available at http://localhost:${PORT}/manifest`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
