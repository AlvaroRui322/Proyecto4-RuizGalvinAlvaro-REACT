import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../config/firebase";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import "../styles/Form.css";

/**
 * Componente que representa el formulario de registro de usuarios.
 * Incluye validación de campos y manejo de la autenticación.
 */
const RegisterForm = () => {
    const { user, setUser } = useContext(UserContext); // Accede al contexto del usuario
    const navigate = useNavigate(); // Hook para la navegación entre rutas

    /**
     * Efecto que redirige a la página de perfil si el usuario ya está autenticado.
     */
    useEffect(() => {
        if (user) navigate("/profile");
    }, [user, navigate]);


    const initialValues = { email: "test@test.com", password: "123456" };

    /**
     * Esquema de validación para los campos del formulario.
     * Valida que el correo sea correcto y que la contraseña tenga al menos 6 caracteres.
     */
    const validationSchema = Yup.object({
        email: Yup.string().email("Correo no válido").required("El correo es obligatorio."),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres.")
            .required("La contraseña es obligatoria."),
    });

    /**
     * Maneja el envío del formulario de registro.
     *
     * @param values - Valores ingresados en el formulario (correo y contraseña).
     * @param formikHelpers - Proporciona funciones auxiliares, como setSubmitting y resetForm.
     *
     */
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const userCredential = await register(values);
            setUser(userCredential.user);
            Swal.fire("Registrado con éxito!", "¡Bienvenido!", "success");
            navigate("/profile");
            resetForm();
        } catch (error) {
            Swal.fire("Error al registrar", error.message, "error");
        }
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form className="auth-form-container">
                    <h1>Regístrate</h1>

                    {/* Campo para el correo electrónico */}
                    <Field name="email">
                        {({ field }) => (
                            <TextField {...field} label="Email" variant="outlined" fullWidth margin="normal" />
                        )}
                    </Field>
                    <ErrorMessage name="email" component="div" className="error" />

                    {/* Campo para la contraseña */}
                    <Field name="password">
                        {({ field }) => (
                            <TextField {...field} type="password" label="Contraseña" variant="outlined" fullWidth margin="normal" />
                        )}
                    </Field>
                    <ErrorMessage name="password" component="div" className="error" />

                    {/* Botón de registro */}
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Registrar
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;


