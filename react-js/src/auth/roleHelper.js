export const hasAllowedRole = (userRole, allowedRoles) => {
  // If userRoles not set return false
  if (!userRole) return false;

  return allowedRoles.includes(userRole);
};
