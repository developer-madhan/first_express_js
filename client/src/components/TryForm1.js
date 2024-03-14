// client/src/components/TryForm1.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';


const initialValues = {
  name: "",
  email: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

function TryForm1() {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/submit-form",
            values
          );
          console.log(response.data.message); // Log the response message
          // Display the response message in a SweetAlert2 dialog
          Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          resetForm();
        } catch (error) {
          console.error("Error:", error);
          // Display an error message in a SweetAlert2 dialog
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while submitting the form.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } finally {
          setSubmitting(false);
        }
      };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mt-4 mb-4 text-center">Try Form 1</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Name:</BootstrapForm.Label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error text-center text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Email:</BootstrapForm.Label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-center text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Message:</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    name="message"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="error text-center text-danger"
                  />
                </BootstrapForm.Group>
                <div className="d-flex justify-content-center my-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default TryForm1;
