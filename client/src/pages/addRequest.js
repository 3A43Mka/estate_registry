import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Container, Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getIssuers} from "../http/issuersAPI";
import {addRequest} from "../http/requestsAPI";
import {getEstates} from "../http/estatesAPI";

// type, requisites, ownership_share, issued_at, issuerId, estateId

const AddRequest = () => {

  const click = async () => {
    try {
      const reason = prompt("Вкажіть причину подання заяви:")
      await addRequest(type.value, requisites, ownershipShare, issuedAt, issuer.id, estate.id, reason);
      alert('Заяву успішно додано');
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const [issuers, setIssuers] = useState([]);
  const [estates, setEstates] = useState([]);

  const [type, setType] = useState({});
  const [requisites, setRequisites] = useState('');
  const [ownershipShare, setOwnershipShare] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [issuer, setIssuer] = useState({});
  const [estate, setEstate] = useState({});

  const [typeOptions] = useState([
    {value: "ACQUIRE", label: "Набуття прав"},
    {value: "ALTER", label: "Зміна прав"},
    {value: "TERMINATION", label: "Припинення прав"},
  ])

  useEffect(() => {
    getIssuers().then((issuers) => setIssuers(issuers.issuers));
    getEstates().then((estates) => setEstates(estates.estates));
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center">
      <Row className="mt-5 mb-5 ">
        <Card className="p-5">
          <h2 className="m-auto">Додати заяву</h2>
          <Form className="d-flex flex-column">
            <h5 className="mt-1">Тип заяви</h5>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{type.label ? type.label : "Виберіть тип заяви"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {typeOptions.map(type =>
                  <Dropdown.Item
                    onClick={() => setType(type)}
                    key={type.value}
                  >
                    {type.label}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <h5 className="mt-1">Реквізити платежу про справляння адміністративного збору</h5>
            <Form.Control
              className="mt-3"
              placeholder="Реквізити платежу про справляння адміністративного збору"
              value={requisites}
              onChange={e => setRequisites(e.target.value)}
            />
            <h5 className="mt-1">Частка власності</h5>
            <Form.Control
              className="mt-3"
              placeholder="Частка власності"
              value={ownershipShare}
              onChange={e => setOwnershipShare(e.target.value)}
              type="number"
            />
            <h5 className="mt-1">Дата подачі заяви</h5>
            <Form.Control
              className="mt-3"
              placeholder="Дата подачі заяви"
              value={issuedAt}
              onChange={e => setIssuedAt(e.target.value)}
              type="date"
            />
            <h5 className="mt-1">Заявник</h5>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{issuer.id ? issuer.id + " : " + issuer.fullname : "Виберіть заявника"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {issuers.map(issuer =>
                  <Dropdown.Item
                    onClick={() => setIssuer(issuer)}
                    key={issuer.id}
                  >
                    {issuer.id} : {issuer.fullname}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <h5 className="mt-1">Нерухомість</h5>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{estate.id ? estate.id + " : " + estate.name : "Виберіть нерухомість"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {estates.map(estate =>
                  <Dropdown.Item
                    onClick={() => setEstate(estate)}
                    key={estate.id}
                  >
                    {estate.id} : {estate.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

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

export default AddRequest;