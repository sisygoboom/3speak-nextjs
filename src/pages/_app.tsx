

import "../styles/globals.scss";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useRouter } from "next/router";
import { Sidebar } from "src/components";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { MagicLinkPopupProvider } from "magic-link-popup-react";
import { useAppStore } from "../lib/store";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { BiEnvelope, BiGlobe } from "react-icons/bi";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import AccountsList from "@/components/Modal/AccountsList";
config.autoAddCss = false;

const FOOTER_TITLE = [{ name: "About us" }, { name: "FAQ" }, { name: "Terms" }];

// Configure your theme with color mode options
const theme = extendTheme({
  config: {
    initialColorMode: "light", // Default mode
    useSystemColorMode: false, // If true, will use the system color mode
  },
});

const initOptions = {
  width: "100px", //this need to be function
  height: "100px",
  top: "50px",
  left: "35px",
};

if (typeof window !== "undefined") {
  import("magic-link-popup-react").then(
    ({ useMagicLinkPopup, MagicLinkPopupActions }) => {
      if (process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY === undefined) {
        throw new Error("the apikey is undefined");
      }
      MagicLinkPopupActions.init(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
        "/auth/loader"
      );
    }
  );
}
function MyApp({ Component, pageProps }: AppProps) {
  //init function for the magic link
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("magic-link-popup-react")
  //       .then(({ useMagicLinkPopup, MagicLinkPopupActions }) => {
  //         MagicLinkPopupActions.init(
  //           process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!,
  //           "/auth/loader"
  //         );
  //       })
  //       .catch((err) => {

  //       });
  //   }
  // }, []);

  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useRouter();
  const router = useRouter();
  const isAuth = pathname.includes("/auth");
  const isOtp = pathname.includes("/otp");
  const isStudio = pathname.includes("/studio");
  const { checkAuth, allowAccess, getUserDetails, setAccounts, listAccounts } =
    useAppStore();
  const { colorMode, toggleColorMode } = useColorMode();

  const addAccounts = () => {
    console.log("addAccounts");
    // show modal list of accounts available
    onCloseModal1();
    onOpenModal2();
  };

  useEffect(() => {
    if (allowAccess == true) {
      getUserDetails();
    }
  }, [allowAccess, getUserDetails]);
  useEffect(() => {
    checkAuth();
    setAccounts();
  }, [checkAuth, setAccounts]);

  return (
    <MagicLinkPopupProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <AccountsList
            isOpenModal1={isOpenModal1}
            onCloseModal1={onCloseModal1}
            listAccounts={listAccounts}
            addAccounts={addAccounts}
          />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ChakraProvider>
      </Provider>
    </MagicLinkPopupProvider>
    //     {/* {isOtp && (
    //         <>
    //           <Flex
    //             margin='auto'
    //             marginTop='30px'
    //             width={"40%"}
    //             css={css`
    //               @media (max-width: 768px) {
    //                 flex-direction: column;
    //               }

    //               @media (min-width: 769px) {
    //                 flex-direction: column;
    //               }
    //             `}
    //           >
    //             <main>
    //               <Box width={"100%"} backgroundColor="#EFF4F6">

    //                 <ChakraProvider theme={theme}>
    //                   <ApolloProvider client={client}>
    //                     <Component tab={currentAuthPage} {...pageProps} />
    //                   </ApolloProvider>
    //                 </ChakraProvider>
    //               </Box>
    //             </main>
    //           </Flex>
    //         </>
    //       )} */}
    // {/* {isAuth && (
    //         <>
    //           <Flex
    //             margin='auto'
    //             marginTop='30px'
    //             css={css`
    //               @media (max-width: 820px) {
    //                 flex-direction: column;
    //                 width:100%;
    //               }

    //               @media (min-width: 821px) {
    //                 flex-direction: column;
    //                 width:35%;
    //               }
    //             `}
    //           >
    //             <main>
    //               <Box width={"100%"} backgroundColor="#EFF4F6" boxShadow={'10px 10px 5px lightblue'}>
    //                 <Tabs.Root className="TabsRoot" defaultValue={router.pathname == '/auth/signup' ? "tab3" : router.pathname == '/auth/hive_signin' ? 'tab2' : 'tab1'}>
    //                   <Tabs.List
    //                     className="TabsList"
    //                     aria-label="Manage your account"
    //                   >
    //                     <Tabs.Trigger
    //                       onClick={() => updateAuthCurrentPage("tab1")}
    //                       className="TabsTrigger"
    //                       value="tab1"
    //                     >
    //                       Sign In
    //                     </Tabs.Trigger>
    //                     <Tabs.Trigger
    //                       onClick={() => updateAuthCurrentPage("tab2")}
    //                       className="TabsTrigger text-center"
    //                       value="tab2"
    //                     >
    //                       Sign In with Hive
    //                     </Tabs.Trigger>
    //                     <Tabs.Trigger
    //                       onClick={() => updateAuthCurrentPage("tab3")}
    //                       className="TabsTrigger"
    //                       value="tab3"
    //                     >
    //                       Sign Up
    //                     </Tabs.Trigger>
    //                     <Tabs.Trigger
    //                       onClick={() => updateAuthCurrentPage("tab4")}
    //                       className="TabsTrigger"
    //                       value="tab4"
    //                     >
    //                       Sign Up - Hive Referral
    //                     </Tabs.Trigger>
    //                   </Tabs.List>
    //                   <ChakraProvider theme={theme}>
    //                     <ApolloProvider client={client}>
    //                       <Component tab={currentAuthPage} {...pageProps} />
    //                     </ApolloProvider>
    //                   </ChakraProvider>
    //                 </Tabs.Root>
    //               </Box>
    //             </main>
    //           </Flex>
    //         </>
    //       )} */}
  );
}

export default MyApp;
