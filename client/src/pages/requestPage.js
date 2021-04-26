import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {getRequest} from "../http/requestsAPI";
import {getFullAddress} from "../http/addressAPI";
import {getRequestLogs} from "../http/logsAPI";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {addRecord} from "../http/recordsAPI";

const RequestPage = () => {

  const {user} = useContext(Context)

  const {id} = useParams()
  const [request, setRequest] = useState({});
  const [logs, setLogs] = useState([]);
  const [issuerAddress, setIssuerAddress] = useState({});
  const [estateAddress, setEstateAddress] = useState({});

  const createRecord = async () => {
    try {
      const reason = prompt("Вкажіть причину:")
      await addRecord(request.id, reason);
      // setRequests(data.rows);
      alert("Відомість успішно сформована");
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  useEffect(() => {
    if (request.id) {
      getFullAddress(request.issuer.buildingId).then((address) => setIssuerAddress(address));
      getFullAddress(request.estate.buildingId).then((address) => setEstateAddress(address));
    }
  }, [request])

  useEffect(() => {
    getRequest(id).then((request) => setRequest(request.request));
    getRequestLogs(id).then((logs) => setLogs(logs.logs));
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
      case "REQUEST_ADDED":
        return "Заяву додано";
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
              {(request.id && issuerAddress.region && estateAddress.region) ? (
                <>
                  <h2>Деталі заяви №{request.id}</h2>
                  <p><strong>Дата подання:</strong> {new Date(request.issued_at).toLocaleDateString()}</p>
                  <h3>Заявник</h3>
                  <p><strong>ПІБ:</strong> {request.issuer.fullname}</p>
                  <p><strong>Дата народження:</strong> {new Date(request.issuer.dob).toLocaleDateString()}</p>
                  <p><strong>Унікальний номер в демографічному реєстрі:</strong> {request.issuer.unique_number || "немає"}</p>
                  <p><strong>Номер платника податків:</strong> {request.issuer.taxpayer_number || "немає"}</p>
                  <p><strong>Документ, що посвідчує особу:</strong> {request.issuer.document}</p>
                  <p><strong>Засоби зв'язку із заявником:</strong> {request.issuer.contacts}</p>
                  <p><strong>Адреса місця постійного проживання
                    заявника:</strong> {issuerAddress.region.name}, {issuerAddress.district.name}, {issuerAddress.settlement.name}, {issuerAddress.street.name}, {issuerAddress.building.name}
                  </p>
                  <p><strong>Реквізити про справляння адміністративного збору:</strong> {request.requisites}</p>
                  <h3>Об'єкт нерухомого майна: {request.estate.name}</h3>
                  <p><strong>Тип об'єкта нерухомого майна:</strong> {buildingTypeFormatter(request.estate.type)}</p>
                  <p><strong>Реєстраційний номер об'єкта нерухомого майна:</strong> {request.estate.registration_number}</p>
                  <p><strong>Кадастровий номер земельної ділянки:</strong> {request.estate.cadastral_number}</p>
                  <p><strong>Реєстраційний номер документа, що засвідчує прийняття в експлуатацію закінченого будівництвом об’єкта:</strong> {request.estate.document_number}</p>
                  <p><strong>Адреса нерухомого майна
                    заявника:</strong> {estateAddress.region.name}, {estateAddress.district.name}, {estateAddress.settlement.name}, {estateAddress.street.name}, {estateAddress.building.name}
                  </p>
                  { ( user.isAuth && user.user.role === "RECORDER") && (
                    <Button
                      variant={"outline-success"}
                      onClick={createRecord}
                    >
                      {'Сформувати відомість на основі заяви'}
                    </Button>
                  )}
                  <h2>Події, пов'язані з заявою</h2>
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

export default RequestPage;