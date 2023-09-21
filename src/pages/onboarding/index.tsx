import OBWizardSteps from "@/components/onboarding/OBWizardSteps";
import { useAppStore } from "@/lib/store";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
type FilePreview = {
  file: File;
  previewUrl: string;
};
const OnBoarding = () => {
  const {
    getUserHiveDetails,
    userDetails,
    setUserHiveDetails,
  } = useAppStore();
  const [name, setName] = useState<string | null>("");

  useEffect(() => {
    getUserHiveDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.username);
    }
  }, [userDetails]);

  const onchangeName = (e: any) => {
    setName(e.target.value);
    setUserHiveDetails(e.target.value);
    console.log("onchangeName", name);
  };

  const changeCurrentStep = (step: number) => {};
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile({ file, previewUrl });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const router = useRouter();

  return (
    <Box minHeight={"100vh"}>
      <Flex
        flexDirection={"column"}
        padding={"20px"}
        height={"100%"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Card height={"100%"} width="100%">
          <CardBody>
            <Box
              border={"1px solid"}
              borderRadius="10px"
              width={"40%"}
              padding="10px"
              paddingX={"50px"}
              paddingTop={"20px"}
              margin="auto"
              height={"80vh"}
            >
              {/* <Flex justifyContent={'center'} height={'200px'} width='100%' >
                <Box  {...getRootProps()} cursor={'pointer'} borderRadius={'50%'} height={'200px'} width='200px' border={'1px solid'}>
                  <input {...getInputProps()} />
                  <img src={selectedFile?selectedFile.previewUrl:'/images/avatar3.png'} style={{margin:'0', width:'100%', borderRadius:'100px', height:'100%', objectFit:'cover'}} />
                </Box>
              </Flex> */}
              <Flex
                justifyContent={"center"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="h2">Lets start with adding of display name</Text>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems="center"
                marginTop={"1px"}
                width="100%"
              >
                <Text as="h6">
                  Add display name so that your friends know it's you
                </Text>
              </Flex>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="LabelOnboarding" htmlFor="currentPassword">
                    Display name
                  </label>
                  <input
                    value={name}
                    onChange={onchangeName}
                    className="Input3"
                    id="email"
                    type="email"
                    name="email"
                  />
                </fieldset>
              </Box>
              <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/profile")}
                justifyContent={"center"}
                alignItems="center"
                padding={"0"}
                marginTop={"100px"}
                width="100%"
              >
                <Button width={"xl"} colorScheme="blue">
                  Save
                </Button>
              </Flex>
              {/* <Flex cursor={'pointer'} onClick={() => router.push('/onboarding/profile')} justifyContent={'center'} alignItems='center' padding={'10px'} marginTop={'10px'} width='100%' >
                                <Button width={'lg'} colorScheme='blue'>Add display name</Button>
                            </Flex> */}
              <Flex
                cursor={"pointer"}
                onClick={() => router.push("/onboarding/profile")}
                justifyContent={"center"}
                alignItems="center"
                marginTop={"10px"}
                width="100%"
              >
                <Text as="span">Skip</Text>
              </Flex>
            </Box>
          </CardBody>
        </Card>
        <OBWizardSteps changeCurrentStep={changeCurrentStep} steps={0} />
      </Flex>
    </Box>
  );
};

export default OnBoarding;
