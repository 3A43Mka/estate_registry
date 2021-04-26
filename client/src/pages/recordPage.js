import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Link, useParams} from 'react-router-dom'
import {getFullAddress} from "../http/addressAPI";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {getRecord, toggleRecord} from "../http/recordsAPI";
import {getRecordLogs} from "../http/logsAPI";
import {toJS} from "mobx";

const RecordPage = () => {


  const {user} = useContext(Context)

  const {id} = useParams()
  const [record, setRecord] = useState({});
  const [logs, setLogs] = useState([]);
  const [issuerAddress, setIssuerAddress] = useState({});
  const [estateAddress, setEstateAddress] = useState({});

  const handleToggleRecord = async () => {
    try {
      const reason = prompt("Вкажіть причину деактивації відомості:");
      await toggleRecord(record.id, reason);
      // setRequests(data.rows);
      getRecord(id).then((record) => setRecord(record.record));
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  useEffect(() => {
    if (record.id) {
      getFullAddress(record.request.issuer.buildingId).then((address) => setIssuerAddress(address));
      getFullAddress(record.request.estate.buildingId).then((address) => setEstateAddress(address));
    }
  }, [record])

  useEffect(() => {
    getRecord(id).then((record) => setRecord(record.record));
    getRecordLogs(id).then((logs) => setLogs(logs.logs));
  }, [id]);

  // {value: "LAND_PLOT", label: "Земельна ділянка"},
  // {value: "HOUSE", label: "Будинок"},
  // {value: "BUILDING", label: "Будівля"},
  // {value: "CONSTRUCTION", label: "Споруда"},
  // {value: "APARTMENT", label: "Квартира"},
  // {value: "LIVING_SPACE", label: "Житлове приміщення"},
  // {value: "NON_LIVING_SPACE", label: "Нежитлове приміщення"},
  // {value: "UNFINISHED_BUILDING", label: "Незавершена будівля"},
  // {value: "OTHER", label: "Інше"},

  const logFormatter = (log) => {
    switch (log) {
      case "RECORD_ADDED":
        return "Відомість додано";
      case "RECORD_TOGGLED":
        return "Змінено видимість";
      default:
        return log;
    }
  }

  const buildingTypeFormatter = (type) => {
    switch (type) {
      case "LAND_PLOT":
        return "Земельна ділянка";
      case "HOUSE":
        return "Будинок";
      case "BUILDING":
        return "Будівля";
      case "CONSTRUCTION":
        return "Споруда";
      case "APARTMENT":
        return "Квартира";
      case "LIVING_SPACE":
        return "Житлове приміщення";
      case "NON_LIVING_SPACE":
        return "Нежитлове приміщення";
      case "UNFINISHED_BUILDING":
        return "Незавершена будівля";
      case "OTHER":
        return "Інше";
      default:
        return type;
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              {(record.id && issuerAddress.region && estateAddress.region) ? (
                <>
                  <h2>Деталі відомості №{record.id}</h2>
                  <Link to={`/request/${record.request.id}`}><p><strong>На підставі заяви:</strong> {record.request.id}</p></Link>
                  <p><strong>Дата формування:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
                  <h3>Заявник</h3>
                  <p><strong>ПІБ:</strong> {record.request.issuer.fullname}</p>
                  <p><strong>Дата народження:</strong> {new Date(record.request.issuer.dob).toLocaleDateString()}</p>
                  <p><strong>Унікальний номер в демографічному реєстрі:</strong> {record.request.issuer.unique_number || "немає"}</p>
                  <p><strong>Номер платника податків:</strong> {record.request.issuer.taxpayer_number || "немає"}</p>
                  <p><strong>Документ, що посвідчує особу:</strong> {record.request.issuer.document}</p>
                  <p><strong>Засоби зв'язку із заявником:</strong> {record.request.issuer.contacts}</p>
                  <p><strong>Адреса місця постійного проживання
                    заявника:</strong> {issuerAddress.region.name}, {issuerAddress.district.name}, {issuerAddress.settlement.name}, {issuerAddress.street.name}, {issuerAddress.building.name}
                  </p>
                  <p><strong>Реквізити про справляння адміністративного збору:</strong> {record.request.requisites}</p>
                  <h3>Об'єкт нерухомого майна: {record.request.estate.name}</h3>
                  <p><strong>Тип об'єкта нерухомого майна:</strong> {buildingTypeFormatter(record.request.estate.type)}</p>
                  <p><strong>Реєстраційний номер об'єкта нерухомого майна:</strong> {record.request.estate.registration_number}</p>
                  <p><strong>Кадастровий номер земельної ділянки:</strong> {record.request.estate.cadastral_number}</p>
                  <p><strong>Реєстраційний номер документа, що засвідчує прийняття в експлуатацію закінченого будівництвом об’єкта:</strong> {record.request.estate.document_number}</p>
                  <p><strong>Адреса нерухомого майна
                    заявника:</strong> {estateAddress.region.name}, {estateAddress.district.name}, {estateAddress.settlement.name}, {estateAddress.street.name}, {estateAddress.building.name}
                  </p>
                  {(user.isAuth && user.user.role === "RECORDER" && record.is_active) && (
                    <Button
                      variant={"outline-success"}
                      onClick={handleToggleRecord}
                    >
                      {'Деактивувати відомість'}
                    </Button>
                  )}

                  {(user.isAuth && user.user.role === "RECORDER" && !record.is_active) && (
                    <Button
                      variant={"outline-success"}
                      onClick={handleToggleRecord}
                    >
                      {'Активувати відомість'}
                    </Button>
                  )}
                  <h2>Події, пов'язані з відомістю</h2>
                  {logs.map((log) => {
                    return (
                      <>
                        <p>{ (new Date(log.createdAt)).toLocaleString()} - {logFormatter(log.type)} - {log.reason} - {log.userId}</p>
                      </>
                    )
                  })}

                </>
              ): (
                <>
                <p>Завантаження...</p>
                </>
                )}

            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordPage;