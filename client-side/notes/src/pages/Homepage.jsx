import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import note from "../assets/note.png";
import { Link } from "react-router-dom";
export default function Homepage() {
  return (
    <Box padding={8}>
      
      <Heading mt={16} textAlign={"start"} size={"4xl"}>
        Note App
      </Heading>
      <Link to="/notes">
      <Button margin={"30px"}  >Add Notes</Button>
      </Link>
     
      <Image   margin={"auto"} height={400} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/taking-quick-notes-4816305-4016570.png" alt="" />
      
    </Box>
  );
}
