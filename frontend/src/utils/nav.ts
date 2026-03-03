export type NavItem = {
  label: string;
  to: string;
  icon: string;
  end?: boolean;
};

export const dashboardNav: NavItem[] = [
  { label: "Dashboard Overview", to: "/app", icon: "bi-speedometer2", end: true },
  { label: "Emergency Contacts", to: "/app/contacts", icon: "bi-telephone" },
  { label: "Safety Tracker", to: "/app/tracker", icon: "bi-map" },
  { label: "Trip History", to: "/app/history", icon: "bi-clock-history" },
  { label: "Settings", to: "/app/settings", icon: "bi-sliders2", end: true },
];

