import { SearchPage } from "@components/search-page/search-page";
import { UsersServerService } from "@services/server/users-server.service";

export default async function Home() {
  const currentUser = await UsersServerService.getCurrentUser();

  return (
    <main className="h-screen w-full overflow-y-auto">
      <SearchPage user={currentUser.data} />
    </main>
  );
}
