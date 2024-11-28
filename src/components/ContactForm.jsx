import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

/**
 * Esquema de validación del formulario de contacto.
 * Valida que los campos de correo, asunto, descripción y términos estén correctamente llenados.
 */
const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    subject: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
    terms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

/**
 * Formulario de contacto que permite a los usuarios enviar mensajes.
 * @returns ContactForm - Componente de formulario de contacto.
 */
const ContactForm = () => {
    return (
        <Formik
            initialValues={{ email: '', subject: '', description: '', terms: false }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                Swal.fire('¡Formulario enviado!', 'Gracias por tu mensaje', 'success');
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="email" name="email" placeholder="Correo electrónico" />
                    <ErrorMessage name="email" component="div" />

                    <Field type="text" name="subject" placeholder="Asunto" />
                    <ErrorMessage name="subject" component="div" />

                    <Field as="textarea" name="description" placeholder="Descripción" />
                    <ErrorMessage name="description" component="div" />

                    <Field type="checkbox" name="terms" />
                    <label htmlFor="terms">Aceptar términos y condiciones</label>
                    <ErrorMessage name="terms" component="div" />

                    <button type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;



