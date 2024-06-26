
import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";
import { useMemo } from "react";
import {
  Box,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { InfinitySpin } from "react-loader-spinner";
import MainLayout from "@/components/Layouts/main_layout";

import { useQuery } from "@apollo/client";
import { GET_TRENDING_FEED } from "../graphql/queries";
import FeedGrid from "../components/feedgrid/FeedGrid";

const IndexPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const getTrendingFeed = useQuery(GET_TRENDING_FEED, { ssr: true });

  return (
    <MainLayout>
      <Box bg={bgColor}>
        <Flex
          marginRight={"30px"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box padding="20px">
            <Text as="h1" fontWeight={"300 !important"}>
              &nbsp;
            </Text>
          </Box>
        </Flex>
        {getTrendingFeed.loading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h="70vh">
            <InfinitySpin width="200" color="#6DC5D7" />
          </Flex>
        ) : (
          <FeedGrid
            videos={getTrendingFeed.data.trendingFeed.items}
            bgColor={bgColor}
            colorMode={colorMode}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default IndexPage;
