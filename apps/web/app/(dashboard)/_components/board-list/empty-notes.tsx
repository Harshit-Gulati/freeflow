import { useOrganization } from "@clerk/nextjs";
import { IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const EmptyNotes = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState(false);

  const createClickHandler = useCallback(async () => {
    if (!organization) return;

    setLoading(true);

    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled",
          orgId: organization.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to create");

      toast.success("Board created successfully");
      router.push(`/board/${data.id}`);
    } catch (err) {
      toast.error("Failed to create board");
    } finally {
      setLoading(false);
    }
  }, [organization, toast, router]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-2 animate-fadeIn">
      <div>
        <IconPencil size={100} stroke="var(--color-primary-text)" />
      </div>
      <div className="text-primary-text text-4xl font-semibold">
        Create your first board!
      </div>
      <div className="text-secondary-text font-medium text-lg">
        Start by creating a board for your organization
      </div>
      <button
        className="p-2 flex justify-start items-center bg-gray-dash hover:bg-unit-bg dark:bg-unit-bg2 rounded-md text-primary-text cursor-pointer transition-colors duration-300 border-2 font-semibold mt-2"
        onClick={createClickHandler}
      >
        Create Board
      </button>
    </div>
  );
};
