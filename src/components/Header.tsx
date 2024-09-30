import React from "react";

export default function Header() {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <p>Nihal N</p>

        <div className="flex items-center gap-3">
          {["Home", "Projects", "Posts"].map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
