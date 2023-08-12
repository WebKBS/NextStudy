import Image from "next/image";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/my.jpeg"
          alt=""
          width={300}
          height={300}
          objectFit="cover"
        />
      </div>
      <h1>안녕하세요 강범수의 블로그입니다.</h1>
      <p>2년차 프론트엔드 개발자</p>
    </section>
  );
}

export default Hero;
