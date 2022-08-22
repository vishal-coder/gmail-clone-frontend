import React from "react";

function LabelList({ labelData }) {
  return (
    <div className={`labellistitem ${labelData.isActive && "listitem-active"}`}>
      <div className="sidebarIcon">
        <labelData.Icon />
      </div>

      <p>{labelData.label}</p>
      <div>{labelData.number}</div>
    </div>
  );
}

export default LabelList;
