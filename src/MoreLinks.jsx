import React from "react";
import Layout from "./Layout";

export default function MoreLinks() {
  const leftLinks = [
    { label: "What I'm Currently Doing", href: "/#/what-im-doing" },
    { label: "Minecraft Website Recreation", href: "/mine/index.html" },
    { label: "Custom Search Engine", href: "https://search.arc360hub.com" },
    { label: "Video Destroyer", href: "https://ohgodwhat.arc360hub.com" },
  ];

  const middleLinks = [
    { label: "Blender Renders", href: "/#/renders" },
    { label: "ArkIDE, Penguinmod Fork", href: "https://arkide.site" },
    { label: "Sitemap", href: "/#/sitemap" },
    { label: "WebXash", href: "https://webhl.arc360hub.com/" },
    { label: "Studio Website", href: "https://arc360hub.com/#/studio" },
  ];

  const rightLinks = [
    { label: "Is it down?", href: "/isitdown.html" },
    { label: "Cool Gradient Blobs", href: "/blob/index.html" },
    { label: "Sorting Algorithms", href: "https://sortingapp.arc360hub.com/" },
    { label: "My Portfolio", href: "/#/portfolio" },
    { label: "Back", href: "/" },
  ];

  return (
    <Layout
      title="More Links"
      gifSrc="bg.gif"
      leftLinks={leftLinks}
      middleLinks={middleLinks}
      rightLinks={rightLinks}
    />
  );
}
