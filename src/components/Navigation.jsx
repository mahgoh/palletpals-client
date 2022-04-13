import NavigationLink from "./NavigationLink";

const routes = [
  {
    to: "/first",
    label: "First",
  },
  {
    to: "/second",
    label: "Second",
  },
];

export default function Navigation() {
  return (
    <nav className="flex h-full justify-end">
      {routes.map((route) => (
        <NavigationLink
          to={route.to}
          key={route.to}
          label={route.label}
        ></NavigationLink>
      ))}
    </nav>
  );
}
