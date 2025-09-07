import { OrganizationProfile } from "@clerk/nextjs";
import { Modal, ModalContent, ModalTrigger } from "@repo/ui";
import { PlusIcon } from "@repo/ui/icons";

export const InviteButton = () => {
  return (
    <Modal>
      <ModalTrigger>
        <div className="py-2 px-3 flex justify-center items-center font-medium hover:bg-unit-bg2 rounded-md text-primary-text cursor-pointer">
          <PlusIcon className="mr-2" /> Invite Members
        </div>
      </ModalTrigger>
      <ModalContent>
        <OrganizationProfile routing="hash" />
      </ModalContent>
    </Modal>
  );
};
