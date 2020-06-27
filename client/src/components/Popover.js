import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";

const Popover = ({ isOpen, toggle }) => {
  const data = useSelector(state => state.person);

  return (
    isOpen && (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Person Information</ModalHeader>
        <ModalBody>
          <ListGroup>
            <ListGroupItem>
              Name
              <Badge className="ml-1" pill>
                {data.name} {data.lastName}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              Affordability range from
              <Badge className="mx-1" pill>
                {data.affordabilityRange.min}
              </Badge>
              to
              <Badge className="ml-1" pill>
                {data.affordabilityRange.max}
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              Calculated ratio
              <Badge className="ml-1" pill>
                {data.ratio.toFixed(2)}
              </Badge>
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  );
};

export default Popover;
