import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {addIssuer} from "../http/issuersAPI";

// fullname, dob, unique_number, taxpayer_number, document, contacts, region,
//   district, settlement, street, building

const AddIssuer = () => {

  const click = async () => {
    try {
      await addIssuer(fullname, dob, uniqueNumber, taxpayerNumber, document, contacts, region,
        district, settlement, street, building);
      // setRequests(data.rows);
      alert('Заявника успішно додано');
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [taxpayerNumber, setTaxpayerNumber] = useState('');
  const [document, setDocument] = useState('');
  const [contacts, setContacts] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [settlement, setSettlement] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="mt-5 mb-5 ">
        <Card className="p-5">
          <h2 className="m-auto">Додати заявника</h2>
          <Form className="d-flex flex-column">
            <h5 className="mt-1">ПІБ заявника</h5>
            <Form.Control
              className="mt-3"
              placeholder="ПІБ заявника"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
            />

            <h5 className="mt-1">Дата народження заявника</h5>
            <Form.Control
              className="mt-3"
              placeholder="Дата народження заявника"
              value={dob}
              onChange={e => setDob(e.target.value)}
              type="date"
            />

            <h5 className="mt-1">Унікальний номер запису заявника в Єдиному державному демографічному реєстрі</h5>
            <Form.Control
              className="mt-1"
              placeholder="Унікальний номер запису заявника в Єдиному державному демографічному реєстрі"
              value={uniqueNumber}
              onChange={e => setUniqueNumber(e.target.value)}
            />

            <h5 className="mt-1">Номер платника податків заявника</h5>
            <Form.Control
              className="mt-1"
              placeholder="Номер платника податків заявника"
              value={taxpayerNumber}
              onChange={e => setTaxpayerNumber(e.target.value)}
            />

            <h5 className="mt-1">Документ, що посвідчує особу заявника</h5>
            <Form.Control
              className="mt-1"
              placeholder="Документ, що посвідчує особу заявника"
              value={document}
              onChange={e => setDocument(e.target.value)}
            />

            <h5 className="mt-1">Засоби зв'язку із заявником</h5>
            <Form.Control
              className="mt-1"
              placeholder="Засоби зв'язку із заявником"
              value={contacts}
              onChange={e => setContacts(e.target.value)}
            />
            <h5 className="mt-1">Адреса місця постійного проживання заявника</h5>
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

export default AddIssuer;