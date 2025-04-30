export type RegisterTokenResponse = {
  success: string;
  data: {
    token: string;
    token_separated: string;
    download_url: string;
  };
  message: string;
};
