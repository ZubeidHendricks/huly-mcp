import { createPiece } from '@activepieces/pieces-framework';

// Import auth
import { hulyAuth } from './lib/auth';

// Import actions
import { findPersonAction } from './lib/actions/find-person';
import { findProjectAction } from './lib/actions/find-project';
import { findIssuesAction } from './lib/actions/find-issues';
import { findDocumentsAction } from './lib/actions/find-documents';
import { createPersonAction } from './lib/actions/create-person';
import { createIssueAction } from './lib/actions/create-issue';
import { createMilestoneAction } from './lib/actions/create-milestone';
import { createDocumentAction } from './lib/actions/create-document';

// Import triggers
import { newDocumentTrigger } from './lib/triggers/new-document';
import { newIssueTrigger } from './lib/triggers/new-issue';

export const huly = createPiece({
  name: 'huly',
  displayName: 'Huly',
  logoUrl: 'https://raw.githubusercontent.com/ZubeidHendricks/huly-mcp/main/assets/logo.png', // Update with your actual logo URL
  authors: [
    'Zubeid Hendricks'
  ],
  auth: hulyAuth,
  actions: [
    findPersonAction,
    findProjectAction,
    findIssuesAction,
    findDocumentsAction,
    createPersonAction,
    createIssueAction,
    createMilestoneAction,
    createDocumentAction
  ],
  triggers: [
    newDocumentTrigger,
    newIssueTrigger
  ]
});

// Export auth for use in triggers and actions
export { hulyAuth } from './lib/auth';
