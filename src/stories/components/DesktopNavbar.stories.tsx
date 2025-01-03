import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import DesktopNavbar from "./DesktopNavbar";
import { DesktopNavbarProps } from "./DesktopNavbar";

export default {
  title: "Components/DesktopNavbar",
  component: DesktopNavbar,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        push: () => {},
      },
    },
  },
} as Meta;

const Template: StoryFn<DesktopNavbarProps> = (args) => (
  <DesktopNavbar {...args} />
);

export const Navbar = Template.bind({});
Navbar.args = {
  pageContent: {
    "navbar-link-profile": "My Profile",
    "navbar-link-capacities": "Capacities",
    "navbar-link-reports": "Reports",
    "navbar-link-events": "Events",
    "sign-out-button": "Sign Out",
    "sign-in-button": "Sign In",
  },
  language: "en",
  setLanguage: () => {},
  setPageContent: () => {},
  darkMode: false,
  setDarkMode: () => {},
  session: true,
};
