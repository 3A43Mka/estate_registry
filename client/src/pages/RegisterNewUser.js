import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import {Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {registration} from "../http/userAPI";

// fullname,
//   dob,
//   passport_series,
//   passport_id,
//   passport_date,
//   passport_authority,
//   taxpayer_number,
//   email,
//   password


const RegisterNewUser = () => {

  const [fullname, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [passportSeries, setPassportSeries] = useState('');
  const [passportId, setPassportId] = useState('');
  const [passportDate, setPassportDate] = useState('');
  const [passportAuthority, setPassportAuthority] = useState('');
  const [taxpayerNumber, setTaxpayerNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setFullName('');
    setDob('');
    setPassportSeries('');
    setPassportId('');
    setPassportDate('');
    setPassportAuthority('');
    setTaxpayerNumber('');
    setEmail('');
    setPassword('');
  }

  const click = async () => {
    try {
      await registration(fullname, dob, passportSeries,
        passportId, passportDate, passportAuthority, taxpayerNumber, email, password);
      alert("Користувача зареєстровано");
      resetForm();
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="mt-5 mb-5 ">
        <Card style={{width: 600}} className="p-5">
          <h2 className="m-auto">Зареєструвати користувача</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="ПІБ"
              value={fullname}
              onChange={e => setFullName(e.target.value)}
            />
            <h5 className="mt-1">Дата народження</h5>
            <Form.Control
              className="mt-1"
              placeholder="Дата народження"
              value={dob}
              onChange={e => setDob(e.target.value)}
              type="date"
            />
            <Form.Control
              className="mt-3"
              placeholder="Серія паспорта"
              value={passportSeries}
              onChange={e => setPassportSeries(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Номер паспорта"
              value={passportId}
              onChange={e => setPassportId(e.target.value)}
            />
            <h5 className="mt-1">Дата видачі паспорта</h5>
            <Form.Control
              className="mt-1"
              placeholder="Дата видачі паспорта"
              value={passportDate}
              onChange={e => setPassportDate(e.target.value)}
              type="date"
            />
            <Form.Control
              className="mt-3"
              placeholder="Орган що видав"
              value={passportAuthority}
              onChange={e => setPassportAuthority(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Номер платника податків"
              value={taxpayerNumber}
              onChange={e => setTaxpayerNumber(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Електронна пошта"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
            <Form.Control
              className="mt-3"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              <Button
                variant={"outline-success"}
                onClick={click}
              >
                {'Зареєструвати'}
              </Button>
            </Row>

          </Form>
        </Card>
      </Row>
    </Container>
  );
};

export default RegisterNewUser;