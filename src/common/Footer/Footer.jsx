/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import Styles from './footer.module.css';

const FooterPage = () => {
  return (
    <footer className={cx(Styles.footer, "font-small pt-4 mt-4")}>
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="4">
            <h5 className={cx("title", Styles.Col)}>Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
          <Col md="4">
            <h5 className={cx("title", Styles.Col)}>Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
          <Col md="4">
            <h5 className={cx("title", Styles.Col)}>Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col><i className="fab fa-instagram" />
            <i className="fab fa-pinterest-square" />
            <i className="fab fa-twitter" />
            <i className="fab fa-facebook-f" />
          </Col>
          <Col />
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()}{" "}
            SHOPMATE Ltd. &#8729; Contact &#8729; Privacy policy
        </Container>
      </div>
    </footer>
  );
};

export default FooterPage;
