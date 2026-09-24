export function useUser() {
  const user = {
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    avatarUrl: "https://ui.shadcn.com/avatars/shadcn.jpg",
    roles: ["user"],
  }

  return user
}

export function useRoles() {
  const user = useUser()

  return user.roles
}
