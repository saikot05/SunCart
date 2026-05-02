"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { MdFilterAlt } from "react-icons/md";

const SearchFilter = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const hasFilters = q || category;

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      value ? params.set(key, value) : params.delete(key);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => router.replace(pathname);

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8 flex-wrap">

      <label className="input input-bordered flex items-center gap-2 w-full sm:w-80">
        <FiSearch className="text-base-content/50 text-lg shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={q}  
          onChange={(e) => updateParams("q", e.target.value)}
          className="grow"
        />
        {q && (
          <FiX
            className="text-base-content/40 hover:text-error cursor-pointer text-lg shrink-0"
            onClick={() => updateParams("q", "")}
          />
        )}
      </label>

      <label className="flex items-center gap-2 input input-bordered w-full sm:w-56">
        <BiCategory className="text-orange-400 text-lg shrink-0" />
        <select
          className="grow bg-transparent outline-none"
          value={category}  
          onChange={(e) => updateParams("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="btn btn-outline btn-error btn-sm gap-2"
        >
          <MdFilterAlt className="text-base" />
          Clear Filters
        </button>
      )}

    </div>
  );
};

export default SearchFilter;