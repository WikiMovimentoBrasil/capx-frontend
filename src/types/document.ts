// Interface básica para o documento da organização
export interface OrganizationDocument {
  id: number | null;
  url?: string | null;
}

// Interface para o documento enriquecido com dados da Wikimedia
export interface WikimediaDocument extends OrganizationDocument {
  id: number;
  imageUrl?: string;
  fullUrl?: string;
  title?: string;
  thumburl?: string;
  metadata?: Array<{
    name: string;
    value: string | any;
  }>;
}
