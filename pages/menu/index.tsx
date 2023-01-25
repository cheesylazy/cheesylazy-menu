import type { NextPage } from "next";
import Image from "next/image";
//import eating from '../resources/img/eating_v2.gif'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MenuProps {
  vh: number;
  vw: number;
  isMobile: boolean;
}

const Menu: NextPage<MenuProps> = ({ vh, vw, isMobile }) => {
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(50);
  const velocity = 300;
  const command: {
    [index: number]: string;
  } = {
    0: `translate(0px, ${vh - height * 1.5}px)`,
    1: `translate(${vw - width}px , ${vh - height * 1.5}px)`,
    2: `translate(${vw - width}px , ${height / 2}px)`,
    3: `translate(0px , ${height / 2}px)`,
  };
  const commandRotate: {
    [index: number]: string;
  } = {
    0: `rotate(0deg)`,
    1: `rotate(-90deg)`,
    2: `rotate(180deg)`,
    3: `rotate(90deg)`,
  };
  const commandSecond: {
    [index: number]: number;
  } = {
    0: vh / velocity,
    1: vw / velocity,
    2: vh / velocity,
    3: vw / velocity,
  };
  const [index, setIndex] = useState<number>(1);

  useEffect(() => {
    let second = commandSecond[index % 4];

    setTimeout(() => {
      setIndex((i) => i + 1);
    }, second * 1000);
  }, [index]);

  return (
    <div
      className="relative w-full bg-white"
      style={{
        height: vh + "px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `0`,
          transition: `all linear ${commandSecond[index % 4]}s`,
          transform: command[index % 4],
        }}
      >
        <div
          style={{
            transform: commandRotate[index % 4],
          }}
        >
          <Image src={"/eating_v2_rotate.gif"} width={width} height={height} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
