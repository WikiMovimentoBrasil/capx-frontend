export interface WikimediaImage {
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
