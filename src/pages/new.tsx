import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { Box, Flex, Grid, GridItem, Image, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VideoInterface } from "types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MainLayout from "@/components/Layouts/main_layout";
import { useQuery } from "@apollo/client";
import { NEW_CONTENT } from "@/graphql/queries";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/router";

const New2 = () => {
  const router = useRouter();
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const { colorMode, toggleColorMode } = useColorMode();
  const { loading, error, data } = useQuery(NEW_CONTENT);
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  const { setVideo, video: videoSelected } = useAppStore();

  useEffect(() => {


    if (!loading && !error && data) {
      console.log("setVideos data NEW_CONTENT",data);

      setVideos(
        data.socialFeed.items
          .filter((e: any) => !!e.spkvideo)
          .map((e: any) => {
            console.log(e);
            return {
              title: e.title,
              username: e.author.username,
              thumbnail: e.spkvideo.thumbnail_url,
              spkvideo: e.spkvideo,
              author: e.author,
              permlink: e.permlink,
              tags: e.tags,
              stats: e.stats,

            };
          })
      );
    }
  }, [loading, data, error]);
  const setVideoDetails = (video:any) => {
    console.log("video",video)
    setVideo(video)
    router.push("/watch?username="+video.author.username+"&v="+video.permlink)
  }

  useEffect(() => {
    console.log("videoSelected",videoSelected)

  },[videoSelected])
  
  return (
    <MainLayout>
      <Box bg={bgColor} >

        <Flex marginRight={'30px'} justifyContent={'space-between'} alignItems='center'>
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              NEW VIDEOS
            </Text>
          </Box>
          <Text>
            <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} /> {colorMode === 'dark' && (<MoonIcon />)} {colorMode !== 'dark' && (<SunIcon />)}
          </Text>

        </Flex>
        <Grid padding={"20px"} templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(5, 1fr)",
        }} gap={10}>
         
         {!loading &&
            !error &&
            videos.map((video: VideoInterface, index: number) => (
              <GridItem onClick={() => setVideoDetails(video)} w="100%" h="100%" key={index}>
                <Box height="13em !important"
                  width="100% !important">

                  <Image
                    height="13em !important"
                    width="100% !important"
                    borderRadius={'10px'}
                    objectFit="cover"
                    alt="test"
                    src={`${video.thumbnail}`}
                  />
                </Box>

                <VideosTitle title={`${video.title}`} />
                <Name username={`${video.username}`} />
                <Text as="p" margin={"1px"}>
                  a day ago
                </Text>
                <Text fontWeight={"bold"} as="p">
                  $ 10.10
                </Text>
              </GridItem>
            ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default New2;
