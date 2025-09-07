"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

interface OrganisationContextType {
  organization: any;
}

const OrganisationContext = createContext<OrganisationContextType | undefined>(
  undefined
);

export const OrganisationContextProvider = ({
  children,
  organization,
}: {
  children: React.ReactElement;
  organization: any;
}) => {
  return (
    <OrganisationContext.Provider value={{ organization }}>
      {children}
    </OrganisationContext.Provider>
  );
};

export const useOrganisationContext = () => {
  const context = useContext(OrganisationContext);

  if (!context)
    throw new Error(
      "useOrganisationContext must be used within a OrganisationContextProvider"
    );

  return context;
};
