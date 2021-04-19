import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {getRequest} from "../http/requestsAPI";
import {getFullAddress} from "../http/addressAPI";

const RequestPage = () => {

  const {id} = useParams()
  const [request, setRequest] = useState({});
  const [issuerAddress, setIssuerAddress] = useState({});
  const [estateAddress, setEstateAddress] = useState({});

  useEffect(() => {
    if (request.id) {
      getFullAddress(request.issuer.buildingId).then((address) => setIssuerAddress(address));
      getFullAddress(request.estate.buildingId).then((address) => setEstateAddress(address));
    }
  }, [request])

  useEffect(() => {
    getRequest(id).then((request) => setRequest(request.request));
  }, []);

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
                  <p><strong>Унікальний номер в демографічному реєстрі:</strong> {request.issuer.unique_number}</p>
                  <p><strong>Номер платника податків:</strong> {request.issuer.taxpayer_number}</p>
                  <p><strong>Документ, що посвідчує особу:</strong> {request.issuer.document}</p>
                  <p><strong>Засоби зв'язку із заявником:</strong> {request.issuer.contacts}</p>
                  <p><strong>Адреса місця постійного проживання
                    заявника:</strong> {issuerAddress.region.name}, {issuerAddress.district.name}, {issuerAddress.settlement.name}, {issuerAddress.street.name}, {issuerAddress.building.name}
                  </p>
                  <p><strong>Реквізити про справляння адміністративного збору:</strong> {request.requisites}</p>
                  <h3>Об'єкт нерухомого майна: {request.estate.name}</h3>
                  <p><strong>Тип об'єкта нерухомого майна:</strong> {request.estate.type}</p>
                  <p><strong>Реєстраційний номер об'єкта нерухомого майна:</strong> {request.estate.registration_number}</p>
                  <p><strong>Кадастровий номер земельної ділянки:</strong> {request.estate.cadastral_number}</p>
                  <p><strong>Реєстраційний номер документа, що засвідчує прийняття в експлуатацію закінченого будівництвом об’єкта:</strong> {request.estate.document_number}</p>
                  <p><strong>Адреса нерухомого майна
                    заявника:</strong> {estateAddress.region.name}, {estateAddress.district.name}, {estateAddress.settlement.name}, {estateAddress.street.name}, {estateAddress.building.name}
                  </p>
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