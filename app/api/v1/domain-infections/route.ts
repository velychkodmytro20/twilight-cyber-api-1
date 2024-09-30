import { CyberInfectionServerService } from "@services/server/cyber-server.service";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const result = await CyberInfectionServerService.getDomainInfections(data);

  return NextResponse.json(result);
};
