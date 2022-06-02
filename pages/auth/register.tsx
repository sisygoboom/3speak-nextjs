/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";
import { Formik } from "formik";
import { Box } from "components/Box";
import { Flex } from "components/Flex";
import { useTranslation } from "next-export-i18n";
import { Typography } from "components/Typography";
import { getPost } from "utils/hive";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const { t } = useTranslation();
  const user = useUser();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getPost("something", "something").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Flex
      justifyContent="center"
      px="1rem"
      alignItems={{ _: "flex-start", tablet: "center" }}
      backgroundColor="#F5F5F5"
      minHeight="100vh"
      minWidth="100vw"
    >
      <Box width="100%" maxWidth="18.75rem">
        <Box mx="auto" maxWidth="9rem">
          <img
            src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
            alt="3speak logo"
            width="100%"
          />
        </Box>
        <Box
          width="100%"
          borderRadius="0.25rem"
          mt="1.5rem"
          py="0.75rem"
          px="1.25rem"
          backgroundColor="#f8d7da"
          border="1px solid #f5c6cb"
        >
          <Typography textAlign="center" color="#721c24">
            {t("register.disclaimer.1")}
          </Typography>
        </Box>
        <Box
          width="100%"
          borderRadius="0.25rem"
          mt="0.5rem"
          py="0.75rem"
          px="1.25rem"
          backgroundColor="#f8d7da"
          border="1px solid #f5c6cb"
        >
          <Typography textAlign="center" color="#721c24">
            {t("register.disclaimer.2")}
          </Typography>
        </Box>
        <Typography textAlign="center" fontSize="2rem" mt="1rem">
          {t("register.title")}
        </Typography>
        <Formik
          initialValues={{ password: "", email: "", hiveUsername: "" }}
          validate={({ password, email }) => {
            const errors: any = {};

            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
              errors.email = t("login.notValidEmail");
            }

            if (!password) errors.password = t("required");
            if (!email) errors.email = t("required");

            return errors;
          }}
          onSubmit={(values) => {
            console.log(values, "submit");
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="0.125rem" mt="1.5rem" width="100%">
                <StyledInput
                  type="string"
                  placeholder={t("register.email")}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email}
                />
                {!!errors.email && (
                  <Typography color="#FF3333" mt="0.25rem">
                    {errors.email}
                  </Typography>
                )}
              </Box>
              <Box width="100%">
                <StyledInput
                  type="string"
                  placeholder={t("register.hiveUsername")}
                  value={values.hiveUsername}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.hiveUsername}
                />
                {!!errors.hiveUsername && (
                  <Typography mt="0.25rem" color="#FF3333">
                    {errors.hiveUsername}
                  </Typography>
                )}
              </Box>
              <Box width="100%">
                <StyledInput
                  type="string"
                  placeholder={t("register.password")}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                />
                {!!errors.password && (
                  <Typography mt="0.25rem" color="#FF3333">
                    {errors.password}
                  </Typography>
                )}
                <Box
                  width="100%"
                  borderRadius="0.25rem"
                  mt="0.5rem"
                  px="1rem"
                  backgroundColor="#d1ecf1"
                  border="2px solid #bee5eb"
                >
                  <Typography fontSize="0.75rem" color="#0c5460">
                    <StyledList>
                      {(t("register.passwordRules") as string[]).map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </StyledList>
                  </Typography>
                </Box>
                <Box>
                  <ReactJWPlayer />
                </Box>
              </Box>
              <Flex width="100%" justifyContent="center" mt="1rem">
                <StyledButton type="submit">Sign up</StyledButton>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

const StyledList = styled.ul`
  padding-left: 0.5rem;
`;

const StyledButton = styled.button<{
  colors?: { init: string; hover: string; active: string };
}>`
  align-items: center;
  appearance: button;
  width: 100%;
  justify-content: center;
  background-color: ${({ colors }) => colors?.init ?? "#0276ff"};
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  padding: 10px 21px;
  text-align: center;
  text-transform: none;
  transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
    opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    background-color: ${({ colors }) => colors?.active ?? "#006ae8"};
  }

  &:hover {
    background-color: ${({ colors }) => colors?.hover ?? "#1c84ff"};
  }
`;

const StyledInput = styled.input<{ error: boolean }>`
  min-width: 100%;
  padding: 1rem 0.5rem;
  margin: 0.5rem 0 0rem;
  border-radius: 0.45rem;
  outline: none;
  border: none;
  border: 1px solid ${({ error }) => (error ? "#FF3333" : "#2f2d2d")};
`;

export default RegisterPage;
