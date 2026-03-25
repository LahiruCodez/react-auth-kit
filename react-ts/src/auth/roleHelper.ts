export const hasAllowedRole = (userRole: number | null, allowedRoles: number[]): boolean => {
  // If userRoles not set return false
  if (!userRole) return false;

  return allowedRoles.includes(userRole);
};
