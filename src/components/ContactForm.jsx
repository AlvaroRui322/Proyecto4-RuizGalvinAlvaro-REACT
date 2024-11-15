
const ContactForm = () => {
    return (
        <form id="contactForm">
            <input type="email" name="email" placeholder="Email" id="contactForm" />
            <input type="text" name="Asunto" placeholder="Asunto" id="contactForm" />
            <input type="text" name="Descripcion" placeholder="Descripcion" id="contactForm" />
            <button type="submit">Enviar</button>
        </form>
    )
}

export default ContactForm