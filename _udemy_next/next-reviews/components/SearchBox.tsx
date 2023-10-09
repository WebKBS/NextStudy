"use client";
import { Combobox } from "@headlessui/react";

export default function SearchBox() {
  return (
    <Combobox>
      <Combobox.Input type="text" placeholder="search.." />
    </Combobox>
  );
}
