
 
import {
  Box,
  Flex,
  Text,
  useColorMode,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@apollo/client";
import { NEW_CONTENT } from "../graphql/queries";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MainLayout from "@/components/Layouts/main_layout";
import { InfinitySpin } from "react-loader-spinner";

import FeedGrid from "../components/feedgrid/FeedGrid";

const NewContentPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const { colorMode, toggleColorMode } = useColorMode();
  const getFeed = useQuery(NEW_CONTENT);

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
              New Content
            </Text>
          </Box>
        </Flex>
        {getFeed.loading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h="70vh">
          <InfinitySpin width="200" color="#6DC5D7" />
        </Flex>
        ) : (
          <FeedGrid videos={(getFeed.data.socialFeed).items} colorMode={colorMode} bgColor={bgColor} />
        )}
      </Box>
    </MainLayout>
  );
};

export default NewContentPage;
