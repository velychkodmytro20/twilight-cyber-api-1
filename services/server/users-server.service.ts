import { API_SERVER_URL } from "@constants/index";
import { RequestService } from "@services/request.service";

export class UsersServerService {
  static async getCurrentUser(): Promise<any> {
    try {
      const result = await RequestService.get(
        `${API_SERVER_URL}/users/current`,
        {},
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
