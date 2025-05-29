

export const cookieOptRefresh = {
    httpOnly: true,
    secure   : process.env.NODE_ENV === 'production',
    sameSite : 'lax' as const,
    maxAge: 7*24*60*60*1000,
  };
export const cookieOptAccess = {
    httpOnly: true,
    secure   : process.env.NODE_ENV === 'production',
    sameSite : 'lax' as const,
    maxAge: 5*60*1000,
  };