import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/UserContext';
import Swal from 'sweetalert2';

/**
 * Esquema de validación para los campos del formulario.
 * Valida el correo electrónico y la contraseña.
 */
const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
});

/**
 * Componente que representa el formulario de inicio de sesión.
 * Muestra campos para el correo electrónico y la contraseña, con validación incluida.
 */
const LoginForm = () => {
    const { login } = useContext(AuthContext); // Función de inicio de sesión del contexto

    /**
     * Maneja el envío del formulario.
     *
     * @param values - Contiene los valores ingresados en el formulario.
     * @param FormikHelpers - Proporciona funciones auxiliares como setSubmitting.
     */
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password);
            Swal.fire('¡Bienvenido!', 'Inicio de sesión exitoso', 'success');
        } catch (error) {
            console.error("Error de autenticación:", error);
            Swal.fire('Error', error.message || 'Credenciales incorrectas', 'error');
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {/* Campo para el correo electrónico */}
                    <Field type="email" name="email" placeholder="Correo electrónico" />
                    <ErrorMessage name="email" component="div" />

                    {/* Campo para la contraseña */}
                    <Field type="password" name="password" placeholder="Contraseña" />
                    <ErrorMessage name="password" component="div" />

                    {/* Botón de envío */}
                    <button type="submit" disabled={isSubmitting}>
                        Iniciar sesión
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;



