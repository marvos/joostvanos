import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/homepage.tsx"),
  layout("layouts/main.tsx", [
    route("styleguide", "routes/styleguide.tsx"),
    route("huizen", "routes/huizen.tsx"),
    route("huizen/detail/:objectcode", "routes/huizenDetail.tsx"),
    route("makelaardij", "routes/makelaardij.tsx"),
    route("mediation", "routes/mediation.tsx"),
    route("admin", "routes/admin.tsx"),
    route("ip", "routes/ip.tsx"),
  ]),
] satisfies RouteConfig;
