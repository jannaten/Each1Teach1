import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { PrimaryButton } from '../styles';

export default function TermsEnglishDialog() {
  const [open, setOpen] = useState(false);
  const { primary } = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Button
          variant=''
          className='px-4 py-2'
          onClick={handleClickOpen}
          style={{ color: primary, borderColor: primary, borderRadius: '0%' }}>
          Terms and Privacy
        </Button>
      </div>
      <Modal
        centered
        size='lg'
        show={open}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'>
        <Modal.Header closeButton>
          <Modal.Title className='py-2 text-center w-100'>
            UNITANDEM PRIVACY POLICY
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ borderColor: primary, borderRadius: '0%' }}>
            <Card.Body>
              <Card.Title style={{ color: primary }}>
                Name of the Service
              </Card.Title>
              <Card.Subtitle className='mb-3 text-muted'>
                UniTandem Website
              </Card.Subtitle>
              <Card.Text>
                <strong>Description of the Service:</strong>
                <br />A website for tandem language and culture learning aimed
                at Finnish university students.
              </Card.Text>
              <Card.Text>
                <strong>Data Controllers and Contact Persons:</strong>
              </Card.Text>
              <ListGroup className='mb-3' style={{ borderRadius: '0%' }}>
                <ListGroup.Item>
                  <strong>Tampere Universities:</strong>Emmanuel
                  Abruquah
                </ListGroup.Item>
                <ListGroup.Item>Email: info (at) unitandem.fi</ListGroup.Item>
                <ListGroup.Item>
                  Website:{' '}
                  <a href='http://www.tuni.fi/en' target='_blank'>
                    http://www.tuni.fi/en
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  Tampere University of Applied Sciences, Kuntokatu 3, 33520
                  Tampere, Finland,
                  <br />
                  Phone: +358 294 5222
                </ListGroup.Item>
              </ListGroup>
              <hr />
              <Card.Text>
                <strong>Jurisdiction:</strong>
                <br />
                FI – Finland
              </Card.Text>
              <Card.Text>
                <strong>Personal Data Processed:</strong>
              </Card.Text>
              <ListGroup className='mb-3' style={{ borderRadius: '0%' }}>
                <ListGroup.Item>
                  Data in the log files of the server is used for technical
                  maintenance, service security, and collecting general
                  statistics.
                </ListGroup.Item>
                <ListGroup.Item>
                  The website stores and processes the following personal data:
                  <ul>
                    <li>Name</li>
                    <li>Municipality of residence and study</li>
                    <li>Email address</li>
                    <li>University</li>
                    <li>Photo of the user</li>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
              <Card.Text>
                <strong>
                  Third Parties to Whom Personal Data Is Disclosed:
                </strong>
                <br />
                Personal data is not disclosed to third parties.
              </Card.Text>
              <Card.Text>
                <strong>
                  How to Access, Rectify, or Delete Personal Data:
                </strong>
                <br />
                Contact the data controller.
              </Card.Text>
              <Card.Text>
                <strong>Data Retention:</strong>
                <br />
                Logged data is removed after the user has not logged in to the
                service for a year.
              </Card.Text>
              <Card.Text>
                <strong>Data Protection Code of Conduct:</strong>
                <br />
                Personal data is protected according to the Code of Conduct for
                Service Providers{' '}
                <a
                  href='http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx'
                  target='_blank'>
                  (http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx),
                </a>
                a common standard for the research and higher education sector
                to protect privacy.
              </Card.Text>
              <Card.Text>
                <strong>Statistics</strong>
                <br />
                UniTandem uses first-party cookies for collecting usage data of
                its website. The data is used for improving the functionality of
                services and it is not disclosed to third parties.
              </Card.Text>
              <Card.Text>
                <strong>Statistics</strong>
                <br />
                UniTandem uses first-party cookies for collecting usage data of
                its website. The data is used for improving the functionality of
                services and it is not disclosed to third parties.
              </Card.Text>
              <hr />
              <Card.Title className='mt-4' style={{ color: primary }}>
                TERMS OF USE OF UNITANDEM
              </Card.Title>
              <Card.Text>
                <strong>1 Scope</strong>
                <br />
                <strong>1.1 To whom do these Terms of Use apply?</strong>
                <br />
                The Terms of Use apply to and bind all users of the UniTandem
                website (hereinafter “Service”). Any use of the Service by means
                of a Finnish university or university of applied sciences email
                address also signifies the user’s acceptance of the Terms of Use
                and the user’s agreement to be bound by them.
              </Card.Text>
              <Card.Text>
                <strong>1.2 Other norms applied to usage</strong>
                <br />
                In addition to these Terms of Use, the following norms must be
                complied with:
                <ul>
                  <li>Legislation in force in Finland at each time</li>
                  <li>
                    The Privacy Policy of UniTandem and any other policies that
                    are applied to the use of the services
                  </li>
                  <li>
                    Any general and service-specific terms and conditions and
                    rules that complement these Terms of Use
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                <strong>2 Authorisation</strong>
                <br />
                <strong>2.1 What is an authorisation?</strong>
                <br />
                If a service is public and available for use on the Internet,
                all Internet users are authorised to use it. Other services are
                intended for a limited user group, and a duly granted user
                identification and authorisation is required in order to use
                them. Authorisation means in this case the right to use the
                Service. The term “user right” is often used when talking about
                authorisation.
                <br />
                The period of authorisation is the same as the user’s period of
                study right. An authorisation is personal.
              </Card.Text>
              <Card.Text>
                <strong>2.2 On which grounds is authorisation granted?</strong>
                <br />
                An authorisation is automatically granted if the user has a
                Finnish university user id. <br />
              </Card.Text>
              <Card.Text>
                <strong>2.3 Restricted authorisation </strong>
                <br />
                It is possible to restrict a user’s authorisation if there is a
                good reason to suspect that compromised information security or
                abuse is taking place. <br />
              </Card.Text>

              <Card.Text>
                <br />
                <strong>2.4 Beginning of authorisation:</strong>
                <br />
                Authorisation begins when the user receives a Finnish university
                user ID.
                <br />
                <strong>2.5 Expiry of authorisation:</strong>
                <br />
                The authorisation ends when the users’ studies at a Finnish
                university end.
                <br />
                <strong>
                  2.6 The responsibilities of a user in the event of the expiry
                  of an authorisation:
                </strong>
                <br />
                The user must store any personal information they will need
                (e.g., chat history) before their username for the service
                expires.
              </Card.Text>
              <Card.Text>
                <strong>3 Username</strong>
                <br />
                <strong>3.1 What is a username and why is one needed?</strong>
                <br />
                The username is used to identify and authenticate a user. In
                order to carry out authorisation, each user must have an
                identifier with which they can be identified.
                <br />
                <strong>3.2 User responsibility:</strong>
                <br />
                A user bears liability for damages and criminal responsibility
                for any harm or damage resulting from the use of the username.
                The responsibility also applies to situations where the username
                is used by a party that received the necessary information and
                tools from the user, whether on purpose or by negligence.
                <br />
                <strong>3.3 Prohibition of disclosure and usage:</strong>
                <br />
                It is prohibited to disclose one’s username to another person or
                to use someone else’s username.
              </Card.Text>
              <Card.Text>
                <strong>4 Rights and Responsibilities of Service Users</strong>
                <br />
                <strong>4.1 Primary purposes of use:</strong>
                <br />
                The Service is aimed at studying languages and cultures through
                the joint UniTandem course of all Finnish universities. The
                Service is used for finding a study partner and for contacting
                him/her. The course is completed according to the instructions
                in DigiCampus Moodle.
              </Card.Text>
              <Card.Text>
                <strong>4.2 Prohibited purposes of use:</strong>
                <ul>
                  <li>
                    Users must be respectful towards other users. The Service is
                    not for dating purposes. Spamming is prohibited.
                  </li>
                  <li>
                    It is not allowed to use the Service for non-study purposes
                    (i.e., not completing the UniTandem course).
                  </li>
                  <li>
                    Storing, publishing, transmitting, or distributing material
                    that is unlawful or against good practice is prohibited.
                  </li>
                  <li>Use for agitation of all types is prohibited.</li>
                  <li>
                    Usage authorisations must never be used for any illegal or
                    forbidden activities, such as:
                    <ul>
                      <li>
                        Searching for vulnerabilities in information security
                      </li>
                      <li>Unauthorised decryption of data</li>
                      <li>Copying or modifying network communications</li>
                      <li>
                        Unauthorised access to the Service or preparations
                        thereof
                      </li>
                    </ul>
                  </li>
                  <li>
                    Parts and features of the Service that are not clearly made
                    available for public use must not be used. These include:
                    <ul>
                      <li>Tools intended for administration</li>
                      <li>
                        Functions that have been disabled in the system settings
                      </li>
                    </ul>
                  </li>
                  <li>
                    Unnecessary usage and loading of resources are prohibited.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                <strong>4.3 Reporting duty:</strong>
                <br />A report must be made immediately if a breach of
                information security or data protection is detected or
                suspected. The report must be submitted to: info (at)
                unitandem.fi.
              </Card.Text>
              <Card.Text>
                <strong>4.4 Prohibition of phishing:</strong>
                <br />
                Phishing, abuse, copying, and distribution of other users'
                private information is forbidden.
              </Card.Text>
              <Card.Text>
                <strong>4.5 Safe storage and use of passwords:</strong>
                <ul>
                  <li>
                    Each user is under an obligation to keep their username and
                    the connected password safe and use it in such a manner that
                    they do not come to anyone else’s knowledge. You must never
                    disclose your password to anyone.
                  </li>
                  <li>
                    It is prohibited to use the password used in the Service for
                    any other service.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                <strong>4.6 Restrictions on the use of the Service:</strong>
                <br />
                The service administrators are entitled to restrict or revoke
                the right to use the Service as a precaution.
              </Card.Text>
              <Card.Text>
                <strong>4.7 Availability of the Service:</strong>
                <br />
                The Service administrators disclaim all responsibility and
                liability for the availability, timeliness, security, or
                reliability of the Service or the content provided through the
                Service. The Service administrators reserve the right to modify,
                suspend, or discontinue the Service or access to the Service
                without any notice at any time and without any liability to the
                user.
              </Card.Text>
            </Card.Body>
          </Card>
          {/* </Container> */}
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <PrimaryButton onClick={handleClose}>Ok</PrimaryButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
