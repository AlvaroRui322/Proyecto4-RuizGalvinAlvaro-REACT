import {useState} from "react"
import Swal from "sweetalert2"
import "../styles/Form.css"

const ContactForm = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        subject: "",
        description: "",
    });
    const [errors, setErrors] = useState({});

    // Validación de cada campo
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
        return "";
    };

    // Manejar cambios en los inputs y validar en tiempo real
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormValues = { ...formValues, [name]: value };
        setFormValues(updatedFormValues);

        // Validamos el campo que se ha modificado
        setErrors({
            ...errors,
            [name]: validate(name, value),
        });
    };

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            email: validate("email", formValues.email),
            subject: validate("subject", formValues.subject),
            description: validate("description", formValues.description),
        };
        setErrors(newErrors);

        // Si no hay errores, mostrar éxito, sino error
        if (!Object.values(newErrors).some((err) => err)) {
            Swal.fire("Formulario Enviado!", "Gracias por tu mensaje.", "success");
            setFormValues({ email: "", subject: "", description: "" });
        } else {
            Swal.fire("Error", "Por favor, corrige los errores antes de enviar.", "error");
        }
    };

    return (
        <form className="contact-form-container" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Asunto */}
            <div>
                <label htmlFor="subject">Asunto:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    placeholder="Escribe el asunto"
                />
                {errors.subject && <p className="error">{errors.subject}</p>}
            </div>

            {/* Descripción */}
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    placeholder="Escribe una descripción detallada"
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            {/* Botón de enviar */}
            <button type="submit">Enviar</button>
        </form>
    );
};

export default ContactForm;