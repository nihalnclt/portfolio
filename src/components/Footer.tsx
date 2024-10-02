import React from "react";

export default function Footer() {
  return (
    <div className="container">
      <div className="py-6 flex items-center gap-4">
        <span>@ {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4">
          <a href="">
            <span>LinkedIn</span>
          </a>
          <a href="">
            <span>Twitter</span>
          </a>
          <a href="">
            <span>Github</span>
          </a>
          <a href="">
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
