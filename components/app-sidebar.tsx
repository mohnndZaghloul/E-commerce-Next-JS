import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { data, sidebarLinks } from "./dashboard/sidebarData";
import { getCurrentUser, getRole } from "@/actions/customers-actions";
import { NavMain } from "./nav-main";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const role = await getRole();
  const user = await getCurrentUser();
  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(role!),
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={filteredLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
