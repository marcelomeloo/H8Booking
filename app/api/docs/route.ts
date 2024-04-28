// /pages/api/docs/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { withSwagger } from 'next-swagger-doc';
import { NextRequest } from "next/server";

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NextJS Swagger',
      version: '0.1.0',
    },
  },
  apiFolder: 'pages/api',
});

export async function GET(
  req: NextRequest,
){  // This will handle the request and generate the Swagger documentation
  if (req.method === 'GET') {
    return swaggerHandler();
  }
}