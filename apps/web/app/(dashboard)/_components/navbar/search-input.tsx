"use client";

import { Input } from "@repo/ui";
import { SearchIcon } from "@repo/ui/icons";
import qs from "query-string";
import { useDebounce } from "@repo/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <SearchIcon
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-secondary-text"
        strokeColor="var(--color-primary-text)"
      />
      <Input
        type="text"
        placeholder="Search"
        className="w-full max-w-[516px] pl-10"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
