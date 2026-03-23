declare namespace Express {
  interface UserDetails {
    username: string;
  }

  interface Request {
    user?: UserDetails;
  }
}

