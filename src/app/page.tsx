import List from "@/components/dashboard/listing-table/fetchList";
import Logout from "@/components/dashboard/logout";
import { ModeToggle } from "@/components/toggle";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <div>
      <div className="w-full py-3 px-2 border ">
        <Container>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Logout />
          </div>
          <List />
        </Container>
      </div>
    </div>
  );
}
