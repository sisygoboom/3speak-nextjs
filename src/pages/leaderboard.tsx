import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { LeaderTile } from "@/components/LeaderTile";
import { Flex, Text } from "@chakra-ui/react";
import MainLayout from "@/components/Layouts/main_layout";
import MenuComponent from "@/components/MenuComponent";

export default function LeaderboardView() {
  const [first, setFirst] = useState<any>();
  const [second, setSecond] = useState<any>();
  const [third, setThird] = useState<any>();
  const [bronze, setBronze] = useState<any[]>([]);

  useEffect(() => {
    let data = [
      { rank: 1, score: 519, username: "rairfoundation" },
      { rank: 2, score: 505, username: "rair2" },
      { rank: 3, score: 400, username: "pouch22" },
      { rank: 4, score: 399, username: "vladtepesblog" },
      { rank: 5, score: 398, username: "maxigan" },
      { rank: 6, score: 398, username: "vldasarchiv" },
      { rank: 7, score: 398, username: "theouterlight" },
      { rank: 8, score: 398, username: "lunaticanto" },
      { rank: 9, score: 398, username: "cryptoalvirin" },
      { rank: 10, score: 398, username: "taskmaster4450" },
      { rank: 11, score: 398, username: "khaleesii" },
      { rank: 12, score: 398, username: "yisusth" },
      { rank: 13, score: 398, username: "eddiespino" },
      { rank: 14, score: 398, username: "rtonline" },
      { rank: 15, score: 398, username: "boeltermc" },
      { rank: 16, score: 398, username: "soyjosecc" },
      { rank: 17, score: 398, username: "bananasfallers" },
      { rank: 18, score: 398, username: "luizeba" },
      { rank: 19, score: 398, username: "nophoneman" },
      { rank: 20, score: 398, username: "musicandreview" },
      { rank: 21, score: 398, username: "zullyscott" },
      { rank: 22, score: 398, username: "davedickeyyall" },
      { rank: 23, score: 398, username: "carminasalazarte" },
      { rank: 24, score: 398, username: "lsnt" },
      { rank: 25, score: 398, username: "ksam" },
      { rank: 26, score: 398, username: "cahlen" },
      { rank: 27, score: 398, username: "uchihanagato" },
      { rank: 28, score: 398, username: "samgiset" },
      { rank: 29, score: 398, username: "daltono" },
      { rank: 30, score: 398, username: "anthony2019" },
      { rank: 31, score: 398, username: "palabras1" },
      { rank: 32, score: 398, username: "iamsaray" },
      { rank: 33, score: 398, username: "taskmaster4450le" },
    ];
    console.log(data);
    let step = 1;
    let bronzeToSet = [];
    for (const ex of data) {
      if (step >= 30) {
        break;
      }
      if (step === 1) {
        console.log("FIRST");
        console.log(ex);

        setFirst(ex);
      } else if (step === 2) {
        console.log("SECOND");
        console.log(ex);
        setSecond(ex);
      } else if (step === 3) {
        console.log("THIRD");
        console.log(ex);
        setThird(ex);
      } else {
        bronzeToSet.push(ex);
      }
      step++;
    }
    setBronze(bronzeToSet);

    document.title = "3Speak - Tokenised video communities";
    void load();
    async function load() {
      let step = 1;
    }
  }, []);

  useEffect(() => {
    console.log(`first is now `, first);
  }, [first]);

  return (
    <MainLayout>
    <Flex w="full" h="96vh" justifyContent={"center"} alignItems="center">
      <Text fontSize={"4xl"}>
        Coming Soon!
      </Text>
      </Flex>
    </MainLayout>
  );
}
