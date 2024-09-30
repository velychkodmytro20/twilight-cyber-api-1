import axios from "axios";
import { Headers } from "@constants/headers";

export class CyberInfectionClientService {
  static getDomainInfections = async ({ domains }: { domains: string[] }) => {
    const result = await axios.post(
      "/api/v1/domain-infections",
      { domains },
      {
        headers: {
          ...Headers.DEFAULT_HEADER,
        },
      }
    );

    return result.data;
  };
}
