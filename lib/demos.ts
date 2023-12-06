export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: "User Section",
    items: [
      {
        name: "My Profile",
        slug: "profile",
        description: "User profile page",
      },
      {
        name: "My Reservations",
        slug: "reservations",
        description: "User own reservations",
      },
      {
        name: "Rooms",
        slug: "rooms",
        description: "List of rooms",
      },
    ],
  },
  {
    name: "Admin Section",
    items: [
      {
        name: "Manage Permissions",
        slug: "permissions",
        description: "Manage user permissions on rooms",
      },
      {
        name: "Manage Reservations",
        slug: "reservations",
        description: "Manage all reservations",
      },
    ],
  },
];
