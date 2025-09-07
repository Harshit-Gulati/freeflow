"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul>
      {userMemberships.data.map((member) => (
        <Item
          key={member.organization.id}
          id={member.organization.id}
          name={member.organization.name}
          imageUrl={member.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClickHandler = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };
  return (
    <div className="aspect-square mb-1">
      <Image
        src={imageUrl}
        alt={name}
        height="32"
        width="32"
        onClick={onClickHandler}
        className={`rounded-md cursor-pointer ${isActive ? `opacity-100` : `opacity-80`} hover:opacity-100 transition`}
      />
    </div>
  );
};
