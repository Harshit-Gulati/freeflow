import { CreateOrganization } from "@clerk/nextjs";
import { Modal, ModalContent, ModalTrigger } from "@repo/ui";
import { PlusIcon } from "@repo/ui/icons";

export const AddOrganizationButton = () => {
  return (
    <Modal>
      <ModalTrigger>
        <div className="aspect-square bg-white/25 p-1 h-full w-full rounded-md flex justify-center items-center opacity-80 hover:opacity-100 transition cursor-pointer">
          <PlusIcon />
        </div>
      </ModalTrigger>
      <ModalContent>
        <CreateOrganization />
      </ModalContent>
    </Modal>
  );
};
