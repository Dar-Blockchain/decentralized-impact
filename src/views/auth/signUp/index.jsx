import * as yup from "yup";
import axios from "axios";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import validator from "validator";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useFormik } from "formik";

function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const {
    values,
    handleSubmit,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      linkedin: "",
      email: "",
      password: "",
      confPassword: "",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("Required"),

      lastName: yup.string().required("Required"),

      phone: yup
        .string()
        .min(8, "Must be more than 8 characters")
        .required("Required"),

      linkedin: yup.string().required("Required"),

      email: yup.string().email("Invalid email address").required("Required"),

      password: yup
        .string()
        .min(7, "Must be more than 8 characters")
        .required("Required"),

      confPassword: yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same"),
      }),
    }),
    onSubmit(values) {
      console.log(values);
      testLogin(values);
      setValues({
        ...values,
        username: `@${values.email.split("@")[0]}`,
      });
    },
  });
  const testLogin = () => {
    if (!validator.isEmail(values.email)) {
      errors("Email is not valid");
      return;
    } else {
      axios
        .post("http://localhost:3000/api/signup", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          window.location.href = "horizon-ui-chakra#/auth/sign-in";
        })
        .catch((err) => {
          console.error(err);
          window.location.href = "horizon-ui-chakra#/auth/sign-in";

        });
    }
  };
  useEffect(() => {
    if (values.email === "flaggedemail@mail.com") {
      // It could be a string or any other type
      setFieldValue("isEmailFlagged", { flagged: true, reason: "test" });
    }
  }, [values.email, setFieldValue]);
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
<>
<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Verification Email
            </AlertDialogHeader>
            <AlertDialogBody>
              Please Verify Your email before logging in
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign up
          </Heading>

        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl onSubmit={handleSubmit}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              First Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...getFieldProps("firstName")}
              id="firstName"
              name="firstName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Inter Your First Name"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <span>{touched["firstName"] && errors["firstName"]}</span>

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Last Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...getFieldProps("lastName")}
              id="lastName"
              name="lastName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Inter Your Last Name"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <span>{touched["lastName"] && errors["lastName"]}</span>

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone Number<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...getFieldProps("phone")}
              id="phone"
              name="phone"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="number"
              placeholder="Inter Your Phone Number"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <span>{touched["phone"] && errors["phone"]}</span>

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...getFieldProps("email")}
              id="email"
              name="email"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <span>{touched["email"] && errors["email"]}</span>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                {...getFieldProps("password")}
                id="password"
                name="password"
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <span>{touched["password"] && errors["password"]}</span>

            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                {...getFieldProps("confPassword")}
                id="confPassword"
                name="confPassword"
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <span>{touched["confPassword"] && errors["confPassword"]}</span>

            <Button
              type="submit"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={() => {
                onOpen()
                testLogin()
              }}
            >
              Sign up
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
    </>
  );
}

export default SignUp;
