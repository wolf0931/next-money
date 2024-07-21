"use client";

import React from "react";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { PeekabooLink } from "@/components/links/PeekabooLink";
import {
  PortableTextBlocksBlockquote,
  PortableTextBlocksH1,
  PortableTextBlocksH2,
  PortableTextBlocksH3,
  PortableTextBlocksH4,
  PortableTextBlocksListItem,
  PortableTextBlocksNormal,
} from "@/components/portable-text/PortableTextBlocks";
import { PortableTextCodeBlock } from "@/components/portable-text/PortableTextCodeBlock";
import { PortableTextImage } from "@/components/portable-text/PortableTextImage";
import { PortableTextTable } from "@/components/portable-text/PortableTextTable";
import { PortableTextTweet } from "@/components/portable-text/PortableTextTweet";

const components: PortableTextComponents = {
  block: {
    normal: PortableTextBlocksNormal,
    h1: PortableTextBlocksH1,
    h2: PortableTextBlocksH2,
    h3: PortableTextBlocksH3,
    h4: PortableTextBlocksH4,
    blockquote: PortableTextBlocksBlockquote,
  },
  listItem: PortableTextBlocksListItem,
  types: {
    image: PortableTextImage,
    tweet: PortableTextTweet,
    codeBlock: PortableTextCodeBlock,
    table: PortableTextTable,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <PeekabooLink href={value.href} rel={rel}>
          {children}
        </PeekabooLink>
      );
    },
  },
};

export function PostPortableText(props: {
  value: any;
  components?: PortableTextComponents;
}) {
  return (
    <PortableText
      value={props.value}
      components={props.components ?? components}
    />
  );
}
