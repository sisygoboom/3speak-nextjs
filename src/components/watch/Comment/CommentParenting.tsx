//TODO: Integrate the emoji picker keyboard here
import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Flex,
  Box,
  Text,
  Textarea,
  Avatar,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  InputLeftAddon,
  IconButton,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import { ProfileInterface } from "types";
import { BsEmojiSmile } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineGif } from "react-icons/md";
import { RiText } from "react-icons/ri";

type Props = {
  bgColor: string;
  colorMode: string;
};

const CommentParenting = (props: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <Flex
      bg={props.bgColor}
      py={2}
      px={2}
      borderRadius="md"
      position={"relative"}
      w="95%"
      margin="auto"
    >
      <Box position={"absolute"} top={2} left={-10}>
        <Avatar src={getUserProfile?.images?.avatar} boxSize="2.5rem" />
      </Box>
      <InputGroup size="md">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isExpanded ? "" : "Write a comment"}
          borderRadius={isExpanded ? "10px" : "full"}
          pr="4rem"
          _focus={{ boxShadow: "none" }}
          onClick={handleInputClick}
          minH={isExpanded ? "120px" : "auto"}
          maxH={isExpanded ? "320px" : "auto"}
          resize="none"
          overflow={"hidden"}
          ref={ref}
        />
        <Flex position={"absolute"} bottom={12} right={24}>
          <InputRightElement>
            {" "}
            {isExpanded && (
              <Flex>
                <Button colorScheme="blue" ml={2}>
                  Comment
                </Button>
                <Button ml={2} onClick={handleCancel}>
                  Cancel
                </Button>
              </Flex>
            )}
          </InputRightElement>
        </Flex>
        {isExpanded && (
          <Flex position="absolute" zIndex={1} bottom={4} left={4} gap={4} >
            <Popover>
              <PopoverTrigger>
                <Flex fontSize={"20px"} onClick={handleEmoji} cursor="pointer">
                  <BsEmojiSmile cursor="pointer" />
                </Flex>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody zIndex={9991001} width={500}>
                  <Flex zIndex={1000}>
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Flex></Flex>
            <Flex>
              <LuImagePlus fontSize={"20px"} cursor="pointer" />
            </Flex>
            <Flex>
              <MdOutlineGif fontSize={"20px"} />
            </Flex>
            <Flex>
              <RiText fontSize={"20px"} />
            </Flex>
          </Flex>
        )}
      </InputGroup>
    </Flex>
  );
};

export default CommentParenting;
