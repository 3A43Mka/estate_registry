import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mt-3">Ласкаво просимо до Реєстру речових прав на нерухоме майно!</h2>
          <p className="mt-3">Тут ви можете шукати інформацію про заяви та відомості в сфері речових прав на нерухоме майно.
            Скористайтеся навігаційним меню для пошуку заяв чи відомостей</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;