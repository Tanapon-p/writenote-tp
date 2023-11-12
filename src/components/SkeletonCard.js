import React from "react";
import Skeleton from "react-loading-skeleton";

export function SkeletonCard() {
  return (
    <div className="card">
      <p className="title">
        <Skeleton />
      </p>
      <p className="description">
        <Skeleton count={3} />
      </p>
      <p className="control">
        <Skeleton width="70px" />
      </p>
    </div>
  );
}
