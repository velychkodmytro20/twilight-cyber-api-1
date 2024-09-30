import { API_SERVER_URL } from "@constants/index";
import { RequestService } from "@services/request.service";

export class CyberInfectionServerService {
  static async getDomainInfections({
    domains,
  }: {
    domains: string[];
  }): Promise<any> {
    try {
      const result = await RequestService.post(
        `${API_SERVER_URL}/infections/_search`,
        { domains },
        {},
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
