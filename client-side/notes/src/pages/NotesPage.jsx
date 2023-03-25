import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/Notespage/NoteCard/NoteCard";
import { createNotes, getNotes } from "../Redux/notes/note.actions";
import { BsPlusLg } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Loadingpage from "./Loadingpage";

export default function NotesPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);

  console.log(data);
const {token}=useSelector((state)=>state.userReducer)
console.log("token",token)
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createNote = () => {
    dispatch(createNotes({ title, description }));
    onClose();
  };

  useEffect(() => {
    dispatch(getNotes());
    
  }, [ ]);

  if (loading) {
    return <Loadingpage />;
  } else {
    return (
      <Box mt={20} padding={8}>
        <Grid
          gap={10}
          w={"90%"}
          margin={"auto"}
          gridTemplateColumns="repeat(4 ,1fr)"
        >
          {data?.map((el, i) => (
            <NoteCard key={i} {...el} />
          ))}
        </Grid>

        <>
          <IconButton
            boxShadow={
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
            }
            position={"fixed"}
            w={"80px"}
            h={"80px"}
            borderRadius={20}
            bg={"red"}
            bottom={0}
            left={0}
            onClick={onOpen}
            margin={10}
            icon={<BsPlusLg />}
          ></IconButton>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Input
                  value={title}
                  m
                  placeholder="Please enter title"
                  onChange={(e) => setTitle(e.target.value)}
                ></Input>
                <Textarea
                  mt={8}
                  value={description}
                  placeholder={"Please enter description"}
                  onChange={(e) => setDescription(e.target.value)}
                ></Textarea>
              </ModalBody>

              <ModalFooter>
                <Button
               
                  colorScheme="blue"
                  mr={3}
                  onClick={createNote}
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Box>
    );
  }
}
