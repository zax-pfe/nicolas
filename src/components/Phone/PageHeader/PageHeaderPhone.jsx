import styles from "./style.module.scss";
import Link from "next/link";
import SplitWords from "@/components/AnimatedText/SplitWords";

export default function PageHeaderPhone() {
  return (
    <div className={styles.pageHeaderPhone}>
      <Link href={"/"} scroll={false}>
        <SplitWords duration={1} staggerAmount={0.4}>
          <p>← Back to home</p>
        </SplitWords>
      </Link>
    </div>
  );
}
