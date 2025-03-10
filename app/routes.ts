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
    route("huizen/detail/:stad/:straat/:objectcode", "routes/huizenDetail.tsx"),
    route("makelaardij", "routes/makelaardij.tsx"),
    route("mediation", "routes/mediation.tsx"),
    route("over-joost-van-os", "routes/over-joost-van-os.tsx"),
    route("vastgoed-mediation", "routes/vastgoed-mediation.tsx"),
    route("beoordelingen", "routes/beoordelingen.tsx"),
    route("admin", "routes/admin.tsx"),
    route("ip", "routes/ip.tsx"),
  ]),
] satisfies RouteConfig;
