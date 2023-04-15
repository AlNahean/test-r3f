import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Homepage from "@/Components/Homepage/Homepage";
import Test from "@/Components/Test/Components/Test";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {/* <Homepage /> */}
      <Test />
    </div>
  );
}
