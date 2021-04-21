import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Container, Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {addIssuer} from "../http/issuersAPI";
import {addEstate} from "../http/estatesAPI";

// name, type, cadastral_number, registration_number, document_number, region,
// district, settlement, street, building

const AddEstate = () => {

  const [name, setName] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [cadastralNumber, setCadastralNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [settlement, setSettlement] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');

  const [buildingOptions, setBuildingOptions] = useState([
    {value: "LAND_PLOT", label: "Земельна ділянка"},
    {value: "HOUSE", label: "Будинок"},
    {value: "BUILDING", label: "Будівля"},
    {value: "CONSTRUCTION", label: "Споруда"},
    {value: "APARTMENT", label: "Квартира"},
    {value: "LIVING_SPACE", label: "Житлове приміщення"},
    {value: "NON_LIVING_SPACE", label: "Нежитлове приміщення"},
    {value: "UNFINISHED_BUILDING", label: "Незавершена будівля"},
    {value: "OTHER", label: "Інше"},
  ]);

  const click = async () => {
    try {
      const data = await addEstate(name, buildingType.value, cadastralNumber, registrationNumber, documentNumber, region,
        district, settlement, street, building);
      // setRequests(data.rows);
      alert('Нерухомість успішно додано');
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="mt-5 mb-5 ">
        <Card className="p-5">
          <h2 className="m-auto">Додати нерухомість</h2>
          <Form className="d-flex flex-column">
            <h5 className="mt-1">Назва нерухомого майна</h5>
            <Form.Control
              className="mt-1"
              placeholder="Назва нерухомого майна"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <h5 className="mt-1">Тип нерухомого майна</h5>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{buildingType.label ? buildingType.label : "Виберіть тип нерухомого майна"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {buildingOptions.map(type =>
                  <Dropdown.Item
                    onClick={() => setBuildingType(type)}
                    key={type.value}
                  >
                    {type.label}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <h5 className="mt-1">Кадастровий номер земельної ділянки</h5>
            <Form.Control
              className="mt-1"
              placeholder="Кадастровий номер земельної ділянки"
              value={cadastralNumber}
              onChange={e => setCadastralNumber(e.target.value)}
            />
            <h5 className="mt-1">Реєстраційний номер об’єкта нерухомого майна</h5>
            <Form.Control
              className="mt-1"
              placeholder="Реєстраційний номер об’єкта нерухомого майна"
              value={registrationNumber}
              onChange={e => setRegistrationNumber(e.target.value)}
            />

            <h5 className="mt-1">Реєстраційний номер документа, що засвідчує прийняття в експлуатацію закінченого
              будівництвом об’єкта</h5>
            <Form.Control
              className="mt-1"
              placeholder="Реєстраційний номер документа, що засвідчує прийняття в експлуатацію закінченого будівництвом об’єкта"
              value={documentNumber}
              onChange={e => setDocumentNumber(e.target.value)}
            />
            <h5 className="mt-1">Адреса нерухомого майна</h5>
            <Form.Control
              className="mt-1"
              placeholder="Область"
              value={region}
              onChange={e => setRegion(e.target.value)}
            />
            <Form.Control
              className="mt-1"
              placeholder="Район"
              value={district}
              onChange={e => setDistrict(e.target.value)}
            />
            <Form.Control
              className="mt-1"
              placeholder="Населений пункт"
              value={settlement}
              onChange={e => setSettlement(e.target.value)}
            />
            <Form.Control
              className="mt-1"
              placeholder="Вулиця"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
            <Form.Control
              className="mt-1"
              placeholder="Будинок"
              value={building}
              onChange={e => setBuilding(e.target.value)}
            />
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                variant={"outline-success"}
                onClick={click}
              >
                {'Додати'}
              </Button>
            </Row>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};

export default AddEstate;