import React, { createContext, useState, useContext } from 'react';

const ImpersonationContext = createContext(null);

export const ImpersonationProvider = ({ children }) => {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedTenant, setImpersonatedTenant] = useState(null);

  const startImpersonation = (tenant) => {
    setIsImpersonating(true);
    setImpersonatedTenant(tenant);
  };

  const stopImpersonation = () => {
    setIsImpersonating(false);
    setImpersonatedTenant(null);
  };

  return (
    <ImpersonationContext.Provider
      value={{
        isImpersonating,
        impersonatedTenant,
        startImpersonation,
        stopImpersonation,
      }}
    >
      {children}
    </ImpersonationContext.Provider>
  );
};

export const useImpersonation = () => useContext(ImpersonationContext);
