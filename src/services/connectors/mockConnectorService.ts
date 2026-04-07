import {
  dashboardMetrics,
  responseHeatmap,
  seedIntegrations,
  seedMessages,
  seedTemplates,
} from '@/data/mock/mockData';
import { analyzeMessage } from '@/services/agent/triage';

function wait(ms = 180) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTriagedMessages() {
  await wait();
  return seedMessages.map((message) => ({
    ...message,
    triage: analyzeMessage(message),
  }));
}

export async function fetchTemplates() {
  await wait();
  return seedTemplates;
}

export async function fetchIntegrations() {
  await wait();
  return seedIntegrations;
}

export async function fetchDashboardData() {
  await wait();

  return {
    metrics: dashboardMetrics,
    heatmap: responseHeatmap,
  };
}

