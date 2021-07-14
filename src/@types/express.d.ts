declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    campaign: {
      id: string;
    };
  }
}
