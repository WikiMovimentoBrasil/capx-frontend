import type { Meta, StoryObj } from "@storybook/react";
import ButtonRedirectToPage from "./ButtonRedirectToPage";

const meta: Meta<typeof ButtonRedirectToPage> = {
  title: "Components/ButtonRedirectToPage",
  component: ButtonRedirectToPage,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", maxWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    to: {
      control: "text",
      description: "Destination URL",
    },
    style: {
      control: "text",
      description: "Custom CSS classes (optional)",
    },
    children: {
      control: "text",
      description: "Button text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonRedirectToPage>;

export const CustomStyle: Story = {
  args: {
    to: "/profile",
    children: "My Profile",
    style:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  },
};
