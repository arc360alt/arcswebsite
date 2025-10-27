import React from "react";
import Layout from "./Layout";

export default function Homepage() {
  const leftLinks = [
    { label: "Youtube", href: "https://youtube.com/@arc360" },
    { label: "Github", href: "https://github.com/arc360alt" },
    { label: "TikTok", href: "https://www.tiktok.com/@arc360yt" },
    { label: "Optiark (Minecraft MP)", href: "https://optiark.arc360hub.com/" },
    { label: "Learn about me!", href: "/#/aboutme" },
  ];

  const middleLinks = [
    { label: "Main website", href: "#" },
    { label: "Modrinth page", href: "https://modrinth.com/user/arc360" },
    { label: "Minecraft Server", href: "https://arkmc.arc360hub.com" },
    { label: "SyntaxAI", href: "syntaxai.arc360hub.com" },
    { label: "Active projects", href: "/#/active" },
  ];

  const rightLinks = [
    { label: "Discord Server", href: "https://discord.gg/TRMPdA8acF" },
    { label: "Murder Drones Wallpapers", href: "https://sites.google.com/view/murderdroneswallpapers" },
    { label: "Bluesky (Inactive)", href: "https://bsky.app/profile/arc360.xyz" },
    { label: "ark@arc360hub.com", href: "#" },
    { label: "More stuff", href: "/#/more-links" },
  ];

  return (
    <Layout
      title="Hi I am a programmer and tech enthusiast"
      gifSrc="bg.gif"
      leftLinks={leftLinks}
      middleLinks={middleLinks}
      rightLinks={rightLinks}
    />
  );
}
