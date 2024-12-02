const API_PREFIX = "api";

export const versionedPrefix = (versionNumber = 1) =>
  `${API_PREFIX}/v${versionNumber}`;

export const Pages = {
  ADMIN_PAGE: "/admin/",
};

const mainRoutes = {};

export const Routes = {
  MAIN: mainRoutes,
};
