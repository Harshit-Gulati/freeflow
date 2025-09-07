"use client";

import { useEffect, useRef } from "react";
import { useTextContext } from "../context";

export const Text = () => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const { textInput, setTextInput, onInputBlur } = useTextContext();

  useEffect(() => {
    if (textInput.visible) {
      const timer = setTimeout(() => {
        textRef.current?.focus();
        resizeTextarea();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [textInput.visible]);

  const resizeTextarea = () => {
    const el = textRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.width = "auto";

    el.style.height = `${el.scrollHeight}px`;
    el.style.width = `${el.scrollWidth}px`;
  };

  if (!textInput.visible) return null;

  return (
    <div
      className="absolute bg-transparent"
      style={{
        top: textInput.y,
        left: textInput.x,
        zIndex: 100,
      }}
    >
      <textarea
        ref={textRef}
        value={textInput.value}
        onChange={(e) => {
          setTextInput((prev) => ({ ...prev, value: e.target.value }));
          resizeTextarea();
        }}
        onBlur={onInputBlur}
        className="outline-none text-primary-text resize-none overflow-hidden"
        style={{
          fontFamily: "Arial",
          fontSize: 16,
        }}
      />
    </div>
  );
};
