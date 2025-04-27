import { getHulyClient } from './hulyWebSocket';
import {
  Person,
  Project,
  Issue,
  Document,
  Milestone,
  CommunicationChannel
} from '../types';

// Connection settings from environment variables
const HULY_WS_URL = process.env.HULY_WS_URL || 'wss://api.huly.io';

// Get the WebSocket client
const hulyClient = getHulyClient(HULY_WS_URL);

/**
 * Search APIs
 */

export async function findPerson(query?: string): Promise<Person[]> {
  try {
    const response = await hulyClient.send({
      method: 'person.find',
      params: { query }
    });
    
    if (response.error) {
      throw new Error(`Error finding person: ${response.error.message}`);
    }
    
    return response.result;
  } catch (error) {
    console.error('Error in findPerson:', error);
    throw error;
  }
}

export async function findProject(id?: string, name?: string): Promise<Project[]> {
  try {
    const response = await hulyClient.send({
      method: 'project.find',
      params: { id, name }
    });
    
    if (response.error) {
      throw new Error(`Error finding project: ${response.error.message}`);
    }
    
    return response.result;
  } catch (error) {
    console.error('Error in findProject:', error);
    throw error;
  }
}

export async function findIssue(projectId: string): Promise<Issue[]> {
  try {
    const response = await hulyClient.send({
      method: 'issue.find',
      params: { projectId }
    });
    
    if (response.error) {
      throw new Error(`Error finding issues: ${response.error.message}`);
    }
    
    // Sort by last modified date (newest first)
    return response.result.sort((a: Issue, b: Issue) => {
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    });
  } catch (error) {
    console.error('Error in findIssue:', error);
    throw error;
  }
}

export async function findDocument(teamspaceId: string, name?: string): Promise<Document[]> {
  try {
    const response = await hulyClient.send({
      method: 'document.find',
      params: { teamspaceId, name }
    });
    
    if (response.error) {
      throw new Error(`Error finding documents: ${response.error.message}`);
    }
    
    return response.result;
  } catch (error) {
    console.error('Error in findDocument:', error);
    throw error;
  }
}

/**
 * Creation APIs
 */

export async function createPerson(name: string, email: string): Promise<Person> {
  try {
    // First create the person
    const personResponse = await hulyClient.send({
      method: 'person.create',
      params: { name }
    });
    
    if (personResponse.error) {
      throw new Error(`Error creating person: ${personResponse.error.message}`);
    }
    
    const person = personResponse.result;
    
    // Then add email as a communication channel
    const channelResponse = await hulyClient.send({
      method: 'person.addChannel',
      params: {
        personId: person.id,
        channel: {
          type: 'email',
          value: email
        }
      }
    });
    
    if (channelResponse.error) {
      throw new Error(`Error adding channel: ${channelResponse.error.message}`);
    }
    
    // Return the complete person object with channels
    return {
      ...person,
      channels: [{ type: 'email', value: email }]
    };
  } catch (error) {
    console.error('Error in createPerson:', error);
    throw error;
  }
}

export async function createIssue(
  projectId: string,
  title: string,
  description?: string,
  priority?: 'low' | 'medium' | 'high',
  dueDate?: string
): Promise<Issue> {
  try {
    const response = await hulyClient.send({
      method: 'issue.create',
      params: {
        projectId,
        title,
        description,
        priority,
        dueDate
      }
    });
    
    if (response.error) {
      throw new Error(`Error creating issue: ${response.error.message}`);
    }
    
    return response.result;
  } catch (error) {
    console.error('Error in createIssue:', error);
    throw error;
  }
}

export async function createMilestone(
  projectId: string,
  name: string,
  dueDate?: string,
  issueIds?: string[]
): Promise<Milestone> {
  try {
    // First create the milestone
    const milestoneResponse = await hulyClient.send({
      method: 'milestone.create',
      params: {
        projectId,
        name,
        dueDate
      }
    });
    
    if (milestoneResponse.error) {
      throw new Error(`Error creating milestone: ${milestoneResponse.error.message}`);
    }
    
    const milestone = milestoneResponse.result;
    
    // Then assign issues if provided
    if (issueIds && issueIds.length > 0) {
      for (const issueId of issueIds) {
        const assignResponse = await hulyClient.send({
          method: 'milestone.assignIssue',
          params: {
            milestoneId: milestone.id,
            issueId
          }
        });
        
        if (assignResponse.error) {
          console.warn(`Error assigning issue ${issueId} to milestone: ${assignResponse.error.message}`);
        }
      }
    }
    
    return {
      ...milestone,
      issues: issueIds || []
    };
  } catch (error) {
    console.error('Error in createMilestone:', error);
    throw error;
  }
}

export async function createDocument(
  teamspaceId: string,
  name: string,
  content: string,
  projectIds?: string[]
): Promise<Document> {
  try {
    // Create the document
    const documentResponse = await hulyClient.send({
      method: 'document.create',
      params: {
        teamspaceId,
        name,
        content
      }
    });
    
    if (documentResponse.error) {
      throw new Error(`Error creating document: ${documentResponse.error.message}`);
    }
    
    const document = documentResponse.result;
    
    // Link to projects if provided
    if (projectIds && projectIds.length > 0) {
      for (const projectId of projectIds) {
        const linkResponse = await hulyClient.send({
          method: 'document.linkProject',
          params: {
            documentId: document.id,
            projectId
          }
        });
        
        if (linkResponse.error) {
          console.warn(`Error linking document to project ${projectId}: ${linkResponse.error.message}`);
        }
      }
    }
    
    return {
      ...document,
      projectIds: projectIds || []
    };
  } catch (error) {
    console.error('Error in createDocument:', error);
    throw error;
  }
}
