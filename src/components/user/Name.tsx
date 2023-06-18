import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Name = (props: {username:string}) => {
  return (
    <div>
      <Text margin={'1px'} fontWeight={"bold"} >
        {props.username}
      </Text>
    </div>
  );
};

export default Name;
