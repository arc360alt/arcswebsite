import React from "react";
import Layout from "./Layout";

export default function MoreLinks() {
  const leftLinks = [
    { label: "OptiArk (Minecraft Modpack)", href: "https://github.com/arc360alt/OptiArk" },
    { label: "SyntaxAI", href: "https://github.com/arc360alt/syntaxai-app" },
  ];

  const middleLinks = [
    { label: "ArkIDE (Repo Private)", href: "https://github.com/arc360alt/arkide-new" },
    { label: "ArkRinth", href: "https://github.com/arc360alt/ArkRinthTesting" },
    { label: "Back to Home", href: "/" },
  ];

  const rightLinks = [
    { label: "OptiArk (Website)", href: "https://github.com/arc360alt/optiark-website" },
    { label: "ArcsWebsite (This Website)", href: "https://github.com/arc360alt/arcswebsite" },
  ];

  return (
    <Layout
      title="Active Projects"
      gifSrc="bg.gif"
      leftLinks={leftLinks}
      middleLinks={middleLinks}
      rightLinks={rightLinks}
    />
  );
}
