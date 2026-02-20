import { useRef, useContext } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IsLoadingContext } from "@/context/IsLoadingContext";

export default function Loader() {
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const screenRef = useRef(null);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(SplitText);

      const titleSplit = new SplitText(titleRef.current, {
        type: "lines",
        mask: "lines",
      });

      const subtitleSplit = new SplitText(subtitleRef.current, {
        type: "lines",
        mask: "lines",
      });

      // const timeline = gsap.timeline({ defaults: { duration: 2 } });
      const timeline = gsap.timeline();

      timeline
        .to(screenRef.current, { opacity: 0, duration: 0.1 })
        .from(titleSplit.lines, {
          yPercent: 100,
          duration: 1,
          ease: "power4.out",
        })
        // .from(subtitleRef.current, {
        //   opacity: 0,
        //   duration: 0.1,
        // })

        .from(
          subtitleSplit.lines,
          {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.out",
          },
          "0.7",
        )
        .addLabel("titleExit")
        .to(
          titleRef.current,
          {
            yPercent: -200,
            duration: 0.8,
            ease: "power4.out",
          },
          "0.7",
        )
        .to(
          textRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          "1.7",
        );
    });

    // const disapearTimeline = gsap.timeline({ paused: true });
    // disapearTimeline.to(
    //   textRef.current,
    //   {
    //     opacity: 0,
    //     duration: 0.5,
    //   },
    //   "1.7"
    // );

    // if (!isLoading) {
    //   disapearTimeline.play();
    // }
  }, []);

  return (
    <div className={styles.loader} ref={textRef}>
      <div className={styles.title} ref={titleRef}>
        Nicolas Casal
      </div>
      <div className={styles.subtitle} ref={subtitleRef}>
        Portfolio
        <div className={styles.screen} ref={screenRef} />
      </div>
    </div>
  );
}
