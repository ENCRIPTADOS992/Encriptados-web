export type LoginWithTokenBody = {
  token: string;
};

export type LoginWithTokenResponse = {
  success: string;
  data: {
    token: string;
    type: string;
    name: string;
    expires_at: string;
  };
  message: string;
};
