import React from "react";

const TableSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto animate-pulse">
      <div className="min-w-[900px] bg-baby rounded-lg border border-khaki">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-khaki"
          >
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
            <div className="h-4 bg-khaki rounded col-span-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
