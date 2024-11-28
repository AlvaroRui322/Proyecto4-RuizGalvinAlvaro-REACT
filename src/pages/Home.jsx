import { useState, useEffect } from "react";
import "../styles/Pokemon.css";

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [filters, setFilters] = useState({ name: "", type: "", minWeight: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const [types, setTypes] = useState([]);
    const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

    useEffect(() => {
        fetchPokemons();
        fetchTypes();

        const handleScroll = () => {
            const bottomReached = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            setShowScrollTopBtn(bottomReached);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchPokemons = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
            const data = await response.json();
            console.log("Datos generales de Pokémon:", data);  // Log de datos generales

            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon) => {
                    const detailResponse = await fetch(pokemon.url);
                    const detailData = await detailResponse.json();
                    console.log(`Detalles de ${pokemon.name}:`, detailData);  // Log de detalles individuales
                    return detailData;
                })
            );
            setPokemonList(detailedPokemons);
            setFilteredPokemons(detailedPokemons);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const data = await response.json();
            // Filtro tipos no oficiales que metieron en la pokeapi
            const validTypes = data.results.filter((type) =>
                type.name !== "stellar" && type.name !== "unknown"
            );
            setTypes(validTypes.map((type) => type.name));
        } catch (error) {
            console.error("Error fetching Pokémon types:", error);
        }
    };


    const applyFilters = () => {
        const filtered = pokemonList.filter((pokemon) => {
            const matchesName = filters.name === "" || pokemon.name.includes(filters.name.toLowerCase());
            const matchesType = filters.type === "" || pokemon.types.some((t) => t.type.name === filters.type);
            const matchesWeight = filters.minWeight === "" || pokemon.weight >= parseInt(filters.minWeight);
            return matchesName && matchesType && matchesWeight;
        });
        console.log("Pokémon filtrados:", filtered);  // Log de los resultados filtrados
        setFilteredPokemons(filtered);
        setCurrentPage(1);
    };

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="pokemon-container">
            <h1>POKEMON TEAM BUILDER</h1>

            {/* Filtros */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
                <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="">Todos los tipos</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
                <select
                    value={filters.minWeight}
                    onChange={(e) => setFilters({ ...filters, minWeight: e.target.value })}
                >
                    <option value="">Cualquier peso</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                </select>
                <button onClick={applyFilters}>Aplicar Filtros</button>
            </div>

            {/* Lista de Pokémon */}
            <div className="pokemon-list">
                {currentPokemons.map((pokemon, index) => (
                    <div key={pokemon.id} className={`pokemon-card ${index % 2 === 0 ? "even" : "odd"}`}>
                        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>Tipo: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
                        <button>Añadir al equipo</button> {/* Botón sin funcionalidad */}
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Botón para volver arriba */}
            {showScrollTopBtn && (
                <button onClick={scrollToTop} className="scroll-top-btn">
                    ↑
                </button>
            )}
        </div>
    );
};

export default Home;




