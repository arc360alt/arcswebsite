import React from "react";
import LayoutNoLinks from "./LayoutNoLinks";

export default function CustomHTMLPage() {
  return (
    <LayoutNoLinks title="About Me!" gifSrc="https://www.arc360hub.com/bg.gif">
      <div className="bg-slate-900/30 border border-slate-700 rounded p-4">
        <h2 className="text-xl text-cyan-400 mb-4">This is what im currently Doing:</h2>
        <iframe
  src="https://lanyard.cnrad.dev/api/719973177954140210"
  title="iFrame"
  width="100%"
  height="240px"
  scrolling="no"
  frameBorder="0"       // camelCase
  style={{ border: "1px none #FFFFFF" }}  // object
  allowFullScreen       // camelCase boolean
></iframe>

<a href="/" className="text-cyan-400 hover:text-cyan-300">Back To Home</a>
      </div>
    </LayoutNoLinks>
  );
}
