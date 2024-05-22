import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo-light.svg';
import { useAccountLayout } from './hooks';

type AccountLayoutProps = {
    bottomLinks?: React.ReactNode;
    children?: React.ReactNode;
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps) => {
    useAccountLayout();
    return (
        <>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Container className="account-pages-container">
                    <Row className="justify-content-start-container">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                <Card.Header className="pt-3 pb-3 text-center bg-primary-gradient">
                                    <Link to="/">
                                        <span>
                                            <img src={Logo} alt="logo white" height="32" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">{children}</Card.Body>
                            </Card>
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default AccountLayout;
