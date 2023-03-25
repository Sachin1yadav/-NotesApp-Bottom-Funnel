import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import "./style.css";
 
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../Redux/notes/note.actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { useRef, useState } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  // const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTitle] = useState(title);
  const [tempdescription, setDescription] = useState(description);

  const updateNote = () => {
    dispatch(
      updateNotes(_id, { title: tempTitle, description: tempdescription })
    );
    onClose();
  };
  return (
    <div>
      <Flex gap={2} bottom={0}>
        <Button color={"green"} onClick={onOpen}>
          <AiTwotoneEdit />
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={tempTitle}
                placeholder="Please enter title"
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <Textarea
                mt={8}
                value={tempdescription}
                placeholder={"Please enter description"}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updateNote()}>
                <AiTwotoneEdit />
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button
          color={"red"}
          onClick={() => {
            dispatch(deleteNotes(_id));
          }}
        >
          <AiFillDelete />
        </Button>
      </Flex>
    </div>
  );
};

export default Modal;
