import { NextApiRequest, NextApiResponse } from "next";

export interface ApiRequest extends NextApiRequest {
  userId: number | null;
  userRole: string | null;
}

export interface ApiResponse extends NextApiResponse {
  userId: number | null;
}
