export const FORM_FIELDS_SPACING = 3;

export const FORCE_MOBILE = false;

export const PATH_NAMES = {
  home: "home",
  auth: {
    login: "login",
    signUp: "signup",
    logOut: "logout"
  },
  workspace: {
    create: "create-workspace"
  },
  team: {
    create: "create-team",
    addMembers: "add-members"
  },
  driver: {
    create: "create-driver",
    preview: "driver/preview"
  },
  okr: {
    create: "create-okr",
    edit: "okr/edit"
  },
  customer: {
    create: "create-customer"
  },
  product: {
    create: "create-product",
    preview: "preview-product",
    welcome: "welcome-product",
    edit: "edit-product"
  },
  profile: {
    create: "create-profile"
  },
  homeTabs: {
    backlog: "backlog",
    roadmap: "roadmap",
    settings: "settings",
    userActivity: "user-activity"
  },
  settingsTabs: {
    general: "general",
    product: "product",
    okr: "okr",
    teams: "teams",
    profile: "profile",
    drivers: "drivers",
    users: "users"
  },
  general: {
    root: "root",
    myAccount: "myAccount"
  },
  entity: {
    problematic: {
      summary: "problematic-summary"
    }
  }
};

export enum HOME_TABS {
  SETTINGS = "settings",
  ROADMAP = "roadmap", // TODO: remove this
  MY_FOCUS = "myFocus",
  SEARCH = "search",
  VIEWS = "views"
}

export enum SETTING_TABS {
  GENERAL = "general",
  DRIVERS = "drivers",
  PRODUCTS = "products",
  OKR = "okr",
  TEAMS = "teams",
  PROFILES = "profiles",
  USERS = "users"
}

export const RESPONSIVE_BREAKPOINT = "lg";
export const LAYOUT_CONTENT_PADDING = 24;
export const HOME_BOTTOM_TABS_HEIGHT = 78;
