// Interface básica para o documento da organização
export interface OrganizationDocument {
  id: number;
  url?: string;
}

// Interface para o documento enriquecido com dados da Wikimedia
export interface WikimediaDocument extends OrganizationDocument {
  imageUrl?: string;
  fullUrl?: string;
  title?: string;
  thumburl?: string;
  metadata?: Array<{
    name: string;
    value: string | any;
  }>;
}

// Interface para a resposta da API da Wikimedia
export interface WikimediaDocumentResponse {
  batchcomplete: boolean;
  query: {
    pages: Array<{
      pageid: number;
      ns: number;
      title: string;
      imagerepository: string;
      imageinfo: Array<{
        thumburl: string;
        thumbwidth: number;
        thumbheight: number;
        url: string;
        descriptionurl: string;
        metadata: Array<{
          name: string;
          value: string | any;
        }>;
      }>;
    }>;
  };
}
