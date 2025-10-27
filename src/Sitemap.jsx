import React from "react";
import LayoutNoLinks from "./LayoutNoLinks";

export default function CustomHTMLPage() {
  return (
    <LayoutNoLinks title="Sitemap" gifSrc="bg.gif">
      <div className="bg-slate-900/30 border border-slate-700 rounded p-4">
        <h2 className="text-xl text-cyan-400 mb-4">Unfinished</h2>

<a href="/" className="text-cyan-400 hover:text-cyan-300">Back To Home</a>
      </div>
    </LayoutNoLinks>
  );
}
