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
          <Col md="3">
            <h5 className={cx("title", Styles.Col)}>Clothing</h5>
            <p>T shirts, Vests & Polos</p>
            <p>Coats, Jackets & Gilets</p>
            <p>Underwears and Baselayers</p>
          </Col>
          <Col md="3">
            <h5 className={cx("title", Styles.Col)}>Contact Us</h5>
            <p>Questions</p>
            <p>Enquiries</p>
            <p>Partner with us</p>
          </Col>
          <Col md="3">
            <h5 className={cx("title", Styles.Col)}>Follow Us</h5>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </Col>
          <Col md="3">
            <div className="footer-copyright text-center py-3">
              <Container fluid>
                &copy; {new Date().getFullYear()} SHOPMATE Ltd. <br /> &#8729;
                Contact &#8729; Privacy policy
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterPage;
