import React from "react";
import Layout from "./Layout";

export default function MoreLinks() {
  const leftLinks = [
    { label: "What I'm Currently Doing", href: "/#/what-im-doing" },
    { label: "Minecraft Website Recreation", href: "/mine/minecraft.html" },
    { label: "Custom Search Engine", href: "/search.html" },
  ];

  const middleLinks = [
    { label: "Blender Renders", href: "/#/renders" },
    { label: "ArkIDE, Penguinmod Fork", href: "https://arkide.site" },
    { label: "Sitemap", href: "/#/sitemap" },
  ];

  const rightLinks = [
    { label: "Is it down?", href: "/isitdown.html" },
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
