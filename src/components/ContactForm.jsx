import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/Form.css";

const ContactForm = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        subject: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    /**
     * Esta función se encarga de validar los campos del formulario.
     * Dependiendo del campo, valida cosas como si está vacío o si el formato es el correcto.
     * Si el campo no es válido, devuelve un mensaje de error. Si está bien, retorna una cadena vacía.
     *
     * @param {string} name - El nombre del campo que estamos validando (ej. "email", "subject", "description").
     * @param {string} value - El valor que tiene el campo.
     * @returns {string} Un mensaje de error si algo está mal, o una cadena vacía si todo está correcto.
     */
    const validate = (name, value) => {
        switch (name) {
            case "email":
                if (!value) return "El correo es obligatorio.";
                if (!/\S+@\S+\.\S+/.test(value)) return "Correo no válido.";
                break;
            case "subject":
                if (!value) return "El asunto es obligatorio.";
                if (value.length < 5) return "El asunto debe tener al menos 5 caracteres.";
                break;
            case "description":
                if (!value) return "La descripción es obligatoria.";
                if (value.length < 10) return "La descripción debe tener al menos 10 caracteres.";
                break;
            default:
                break;
        }
        return ""; // Si todo está bien, no hay error
    };

    /**
     * Cada vez que el usuario cambia un valor en el formulario, esta función se llama.
     * Actualiza el estado de los valores del formulario con lo que el usuario escribe.
     *
     * @param {event} e - El evento que contiene el campo modificado y su nuevo valor.
     * @returns {void} No retorna nada, solo actualiza el estado.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    /**
     * Esta función valida el campo cuando el usuario deja de escribir (cuando pierde el foco).
     * Si el campo tiene algún error, lo guarda en el estado `errors` para que pueda mostrarse al usuario.
     *
     * @param {event} e - El evento que ocurre cuando el campo pierde el foco.
     * @returns {void} No retorna nada, solo actualiza el estado de los errores.
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validate(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    /**
     * Esta función se llama cuando el usuario envía el formulario.
     * Primero, valida todos los campos. Si no hay errores, muestra un mensaje de éxito y limpia el formulario.
     * Si hay errores, muestra una alerta pidiendo que se corrijan antes de enviar.
     *
     * @param {event} e - El evento que ocurre cuando el formulario se envía.
     * @returns {void} No retorna nada, maneja el envío del formulario y actualiza los estados de valores y errores.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar todos los campos
        const newErrors = {
            email: validate("email", formValues.email),
            subject: validate("subject", formValues.subject),
            description: validate("description", formValues.description),
        };
        setErrors(newErrors);

        // Verificar si hay errores en algún campo
        if (!Object.values(newErrors).some((err) => err !== "")) {
            Swal.fire("Formulario Enviado!", "Gracias por tu mensaje.", "success");
            setFormValues({ email: "", subject: "", description: "" });
        } else {
            Swal.fire("Error", "Por favor, corrige los errores antes de enviar.", "error");
        }
    };

    return (
        <form className="contact-form-container" onSubmit={handleSubmit} noValidate>
            <div>
                <h1>CONTACTO</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="subject">Asunto:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Asunto"
                />
                {errors.subject && <p className="error">{errors.subject}</p>}
            </div>

            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Descripción"
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default ContactForm;

