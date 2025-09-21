import { EnumNavIconClass } from "./enum/navIcons";
import { EnumNavLabel } from "./enum/navLabels";
import { EnumRoutes } from "./enum/routes";

export const navigations = [
    { nav: EnumNavLabel.Home, routerLink: EnumRoutes.Home, iconClass: EnumNavIconClass.Home },
    { nav: EnumNavLabel.Playlists, routerLink: EnumRoutes.PlayLists, iconClass: EnumNavIconClass.Playlists },
    { nav: EnumNavLabel.Favorites, routerLink: EnumRoutes.Favorites, iconClass: EnumNavIconClass.Favorites },
    { nav: EnumNavLabel.Analytics, routerLink: EnumRoutes.Analytics, iconClass: EnumNavIconClass.Analytics },
  ];