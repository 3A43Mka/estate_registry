import React, {useContext, useState} from 'react';
import {Col, Container, Dropdown, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {registration} from "../http/userAPI";
import {searchRecords, searchRecordsActive, searchRecordsAll} from "../http/recordsAPI";
import {RECORD_ROUTE, REQUEST_ROUTE, SEARCH_RECORDS_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useHistory} from 'react-router-dom'
import {Context} from "../index";

const SearchRecords = () => {

  const {user} = useContext(Context)

  const history = useHistory()

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [type, setType] = useState({});
  const [requisites, setRequisites] = useState('');
  const [ownershipShare, setOwnershipShare] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [taxpayerNumber, setTaxpayerNumber] = useState('');
  const [contacts, setContacts] = useState('');
  const [name, setName] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [cadastralNumber, setCadastralNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  const [typeOptions, setTypeOptions] = useState([
    {value: "ACQUIRE", label: "Набуття прав"},
    {value: "ALTER", label: "Зміна прав"},
    {value: "TERMINATION", label: "Припинення прав"},
  ])

  // 'LAND_PLOT',
  //   'HOUSE',
  //   'BUILDING',
  //   'CONSTRUCTION',
  //   'APARTMENT',
  //   'LIVING_SPACE',
  //   'NON_LIVING_SPACE',
  //   'UNFINISHED_BUILDING',
  //   'OTHER'

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
  ])

  const handleNextPage = async () => {
    setPage(page + 1);
  }

  const handlePrevPage = async () => {
    setPage(page - 1);
  }

  const mouseDownHandler = (event, id) => {
    if (event.button === 1) {
      window.open('/record/' + id);
    }
  }

  const typeFormatter = (type) => {
    switch (type) {
      case "ACQUIRE":
        return "Набуття прав";
      case "ALTER":
        return "Зміна прав";
      case "TERMINATION":
        return "Припинення прав";
      default:
        return type;
    }
  }

  const renderPages = () => {
    let lastPage = Math.ceil(totalCount / 9);
    if (lastPage === 0) lastPage = 1;
    const isFirstPage = page === 1;
    const isLastPage = page >= lastPage;

    if (isFirstPage && isLastPage) {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block disabled>Попередня</Button>
          <div className="m-2"><p>{page}/{lastPage}</p></div>
          <Button block disabled>Наступна</Button>
        </div>
      )
    } else if (isFirstPage) {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block disabled>Попередня</Button>
          <div className="m-2"><p>{page}/{lastPage}</p></div>
          <Button block onClick={() => handleNextPage()}>Наступна</Button>
        </div>
      )
    } else if (isLastPage) {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block onClick={() => handlePrevPage()}>Попередня</Button>
          <div className="m-2">{page}/{lastPage}</div>
          <Button block disabled>Наступна</Button>
        </div>
      )
    } else {
      return (
        <div className="text-center d-flex align-items-baseline">
          <Button block onClick={() => handlePrevPage()}>Попередня</Button>
          <div className="m-2">{page}/{lastPage}</div>
          <Button block onClick={() => handleNextPage()}>Наступна</Button>
        </div>
      )
    }
  }

  // // parameters for request
  // let {type, requisites, ownership_share, issued_at} = req.query;
  // // parameters for issuer
  // let {fullname, dob, unique_number, taxpayer_number, contacts} = req.query;
  // // parameters for estate
  // let {name, building_type, cadastral_number, registration_number, document_number} = req.query;

  const resetForm = () => {
    // setFullName('');
    // setDob('');
    // setPassportSeries('');
    // setPassportId('');
    // setPassportDate('');
    // setPassportAuthority('');
    // setTaxpayerNumber('');
    // setEmail('');
    // setPassword('');
  }

  const renderRecordsList = (records) => records.map((record) =>
    <tr key={record.id} style={{cursor: "pointer"}}
        onClick={() => history.push(RECORD_ROUTE + "/" + record.id)}
        onMouseDown={(e) => mouseDownHandler(e, record.id)}>
      <td>{record.id}</td>
      <td>{(new Date(record.createdAt)).toLocaleString()}</td>
      <td>{typeFormatter(record.request.type)}</td>
      <td>{record.request.issuer.fullname}</td>
      <td>{record.request.estate.name}</td>

    </tr>
  )

  const click = async () => {
    try {
      if (user.user.role === "RECORDER") {
        const data = await searchRecordsAll(type.value, requisites, ownershipShare,
          issuedAt, fullname, dob, uniqueNumber, taxpayerNumber, contacts, name, buildingType.value, cadastralNumber,
          registrationNumber, documentNumber, page);
        // setRequests(data.rows);
        setRecords(data.records.rows);
        setTotalCount(data.records.count);
      } else {
        const data = await searchRecordsActive(type.value, requisites, ownershipShare,
          issuedAt, fullname, dob, uniqueNumber, taxpayerNumber, contacts, name, buildingType.value, cadastralNumber,
          registrationNumber, documentNumber, page);
        // setRequests(data.rows);
        setRecords(data.records.rows);
        setTotalCount(data.records.count);
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Пошук відомостей</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-5">
            <h2 className="m-auto">Шукати відомості</h2>
            <Form className="d-flex flex-column">
              <h5 className="mt-1">Тип заяви, на основі якої сформовано відомість</h5>
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
                className="mt-1"
                placeholder="Реквізити платежу про справляння адміністративного збору"
                value={requisites}
                onChange={e => setRequisites(e.target.value)}
              />

              <h5 className="mt-1">Частка власності</h5>
              <Form.Control
                className="mt-1"
                placeholder="Частка власності"
                value={ownershipShare}
                onChange={e => setOwnershipShare(e.target.value)}
                type="number"
              />

              <h5 className="mt-1">Дата подання заяви</h5>
              <Form.Control
                className="mt-1"
                placeholder="Дата подання заяви"
                value={issuedAt}
                onChange={e => setIssuedAt(e.target.value)}
                type="date"
              />

              <h5 className="mt-1">ПІБ заявника</h5>
              <Form.Control
                className="mt-1"
                placeholder="ПІБ заявника"
                value={fullname}
                onChange={e => setFullname(e.target.value)}
              />

              <h5 className="mt-1">Дата народження заявника</h5>
              <Form.Control
                className="mt-1"
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

              <h5 className="mt-1">Засоби зв'язку із заявником</h5>
              <Form.Control
                className="mt-1"
                placeholder="Засоби зв'язку із заявником"
                value={contacts}
                onChange={e => setContacts(e.target.value)}
              />

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

              <h5 className="mt-1">Адреса нерухомого майна</h5>
              <Form.Control
                className="mt-1"
                placeholder="Адреса нерухомого майна"
              />

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

              <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <Button
                  variant={"outline-success"}
                  onClick={click}
                >
                  {'Шукати'}
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="mt-3 mb-3 col-5">
          {renderPages()}
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Час внесення заяви</th>
              <th>Дата подання заяви</th>
              <th>Тип заяви</th>
              <th>Заявник</th>
              <th>Нерухомість</th>
            </tr>
            </thead>
            <tbody>
            {renderRecordsList(records)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchRecords;