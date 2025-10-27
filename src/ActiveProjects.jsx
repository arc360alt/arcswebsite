import React from "react";
import Layout from "./Layout";

export default function MoreLinks() {
  const leftLinks = [
    { label: "Extra 1", href: "#" },
    { label: "Extra 2", href: "#" },
    { label: "Back to Home", href: "/" },
  ];

  const middleLinks = [
    { label: "Extra 3", href: "#" },
    { label: "Extra 4", href: "#" },
  ];

  const rightLinks = [
    { label: "Extra 5", href: "#" },
    { label: "Extra 6", href: "#" },
  ];

  return (
    <Layout
      title="Active Projects"
      gifSrc="https://www.arc360hub.com/bg.gif"
      leftLinks={leftLinks}
      middleLinks={middleLinks}
      rightLinks={rightLinks}
    />
  );
}
