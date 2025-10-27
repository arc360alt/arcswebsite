import React from "react";
import LayoutNoLinks from "./LayoutNoLinks";

export default function CustomHTMLPage() {
  return (
    <LayoutNoLinks title="Renders" gifSrc="bg.gif">
      <div className="bg-slate-900/30 border border-slate-700 rounded p-4">
        <h2 className="text-xl text-cyan-400 mb-4">Some cool renders I made in blender</h2>
        <img src="/renders/choice1.png" alt="Render 1" className="mb-4 rounded" />
        <img src="/renders/choice2.png" alt="Render 2" className="mb-4 rounded" />
        <img src="/renders/kitty.png" alt="Render 3" className="mb-4 rounded" />
        <img src="/renders/kittydarkandmistirious.png" alt="Render 3" className="mb-4 rounded" />
        <img src="/renders/mc char.png" alt="Render 3" className="mb-4 rounded" />
        <img src="/renders/Untitled.png" alt="Render 3" className="mb-4 rounded" />

<a href="/" className="text-cyan-400 hover:text-cyan-300">Back To Home</a>
      </div>
    </LayoutNoLinks>
  );
}
