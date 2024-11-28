import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';

/**
 * Contexto de autenticación para manejar el estado global del usuario.
 */
export const AuthContext = createContext();

/**
 * Proveedor de autenticación que gestiona el estado del usuario.
 *
 * @param props - Propiedades de React.
 * @param props.children - Componentes hijos que reciben acceso al contexto de autenticación.
 * @returns Proveedor de autenticación que envuelve la aplicación.
 */
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();

    /**
     * Efecto que se ejecuta al montar el componente.
     * Escucha los cambios en el estado de autenticación del usuario.
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Actualiza el usuario actual en el estado
        });
        return () => unsubscribe(); // Cancela la suscripción al desmontar
    }, [auth]);

    /**
     * Cierra la sesión del usuario actual.
     */
    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

