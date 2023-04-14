import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Homepage from "@/Components/Homepage/Homepage";
import Test from "@/Components/Test/Components/Test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <Homepage /> */}
      <Test />
    </>
  );
}
