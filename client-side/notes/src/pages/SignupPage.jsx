import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 import { getUser } from "../Redux/users/user.actions";
import Loadingpage from "./Loadingpage";

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, seTLoading] = useState(false);

  const toast = useToast()
  const handleSignup = async () => {
    const payload = {
      name,
      email,
      password,
    };
     
    seTLoading(true)
    let res = await axios.post(
      "https://lively-bear-galoshes.cyclic.app/users/register",
      payload
    );
    seTLoading(false)
    let userData = res.data;
    console.log("sing", userData);
    if (userData) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      nav("/login");
    
      
    } else {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  console.log("loading",loading)
  if(loading){
    return <Loadingpage/>
  }else{
    return (
      <Flex padding={4} w="100%">
        <Image
           wi={"50%"}
          src={
            "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1676630553~exp=1676631153~hmac=6cbdb020ef439ca463660edbc265da0d05f487d529f69f814ee3f5de6e0f54cc"
          }
        ></Image>
        <VStack w={"50%"}>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"white"}
          >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign up with Notes App</Heading>
              </Stack>
              <Box
                rounded={"lg"}
              
                boxShadow={"lg"}
                p={8}
                bg={"white"}
              >
                <Stack spacing={4}>
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Name..."
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="email..."
  
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="password..."
  
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    ></Stack>
                    <Button
                      onClick={handleSignup}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </VStack>
      </Flex>
    );
  }
  
}
