import { CreateOrganization } from "@clerk/nextjs";
import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import Image from "next/image";

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center select-none">
      <Image src="./empty.svg" alt="empty" height={400} width={400} />
      <div className="text-primary-text text-4xl font-medium flex justify-center items-center">
        Welcome to
        <div className="text-purpure ml-2 font-bold tracking-tighter">
          freeflow
        </div>
      </div>
      <div className="text-secondary-text mt-2 mb-4 font-semibold">
        Create an organization to get started
      </div>
      <Modal>
        <ModalTrigger>
          <div className="p-2 flex justify-start items-center bg-gray-dash hover:bg-unit-bg dark:bg-unit-bg2 rounded-md text-primary-text cursor-pointer transition-colors duration-300 border-2 font-semibold mt-2">
            Create Organisation
          </div>
        </ModalTrigger>
        <ModalContent>
          <CreateOrganization />
        </ModalContent>
      </Modal>
    </div>
  );
};
