import { useQuery } from '@tanstack/react-query';

import {
  fetchDashboardData,
  fetchIntegrations,
  fetchTemplates,
  fetchTriagedMessages,
} from '@/services/connectors/mockConnectorService';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });
}

export function useTriagedMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: fetchTriagedMessages,
  });
}

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });
}

export function useIntegrations() {
  return useQuery({
    queryKey: ['integrations'],
    queryFn: fetchIntegrations,
  });
}

