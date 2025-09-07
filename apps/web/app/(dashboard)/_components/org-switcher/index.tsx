import "./switcher.css";
import { OrganizationSwitcher } from "@clerk/nextjs";

export const ClerkOrganisationSwitcher = () => {
  return (
    <OrganizationSwitcher
      hidePersonal
      appearance={{
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "8px",
            paddingRight: "8px",
            width: "100%",
            maxWidth: "300px",
            backgroundColor: "var(--color-unit-bg)",
          },
          organizationSwitcherTrigger: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            width: "100%",
            border: "2px solid var(--color-purpure)",
            backgroundColor: "var(--color-unit-bg)",
            color: "var(--color-primary-text) !important",
            "&:hover": {
              color: "var(--color-primary-text)",
              backgroundColor: "var(--color-unit-bg2)",
            },
          },
        },
      }}
    />
  );
};
