import React, { useContext } from "react";
import { GlobalLoadingContext } from "../global/progressBar/global-loading";

export default function About() {
  const { setLoadingState } = useContext(GlobalLoadingContext);
  setLoadingState("loading");
  return <div>about</div>;
}
