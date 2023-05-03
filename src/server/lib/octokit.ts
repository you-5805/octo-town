import { Octokit } from '@octokit/rest';

export const octokit = (accessToken: string) =>
  new Octokit({ auth: accessToken });
