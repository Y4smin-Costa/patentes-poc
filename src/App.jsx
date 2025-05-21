import { useEffect, useState } from "react";

export default function App() {
  const [patentes, setPatentes] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((dados) => {
        setPatentes(dados);
      });
  }, []);

  const autoresUnicos = [...new Set(patentes.map((p) => p.autor))];
  const areasUnicas = [...new Set(patentes.map((p) => p.area))];

  const patentesFiltradas = patentes.filter((p) => {
    return (
      p.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
      (filtroArea === "" || p.area === filtroArea) &&
      (filtroAutor === "" || p.autor === filtroAutor)
    );
  });

  const verdeLimaoSuave = "#a9d86e";

  return (
    <div
    style={{
      width: "100vw",       // largura 100% da viewport
  maxWidth: "100%",     // máximo 100%
  margin: "05px auto",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fff",
  color: "#f0f0f0",
  padding: "20px 30px", // Para não colar na borda
  boxSizing: "border-box", // para o padding contar dentro da largura
  minHeight: "100vh",
    }}
    >
      <h1
        style={{
          textAlign: "center",
          color: verdeLimaoSuave,
          marginBottom: 30,
          fontWeight: "700",
        }}
      >
        Busca de Patentes
      </h1>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
          style={{
            padding: 8,
            flexGrow: 1,
            minWidth: 200,
            borderRadius: 6,
            border: `1.5px solid ${verdeLimaoSuave}`,
            fontSize: 16,
            outlineColor: verdeLimaoSuave,
            backgroundColor: "#fff",  // fundo branco
            color: "#000",            // texto preto
          }}
        />

        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: `1.5px solid ${verdeLimaoSuave}`,
            fontSize: 16,
            minWidth: 180,
            outlineColor: verdeLimaoSuave,
            color: "#000",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Todas as áreas</option>
          {areasUnicas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          value={filtroAutor}
          onChange={(e) => setFiltroAutor(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: `1.5px solid ${verdeLimaoSuave}`,
            fontSize: 16,
            minWidth: 180,
            outlineColor: verdeLimaoSuave,
            color: "#000",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Todos os autores</option>
          {autoresUnicos.map((autor) => (
            <option key={autor} value={autor}>
              {autor}
            </option>
          ))}
        </select>
      </div>

      <div>
        {patentesFiltradas.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
            Nenhuma patente encontrada.
          </p>
        ) : (
          patentesFiltradas.map(({ id, titulo, autor, area, ano }) => (
            <div
              key={id}
              style={{
                border: `1.5px solid ${verdeLimaoSuave}`,
                borderRadius: 10,
                padding: 16,
                marginBottom: 14,
                backgroundColor: "#fefefe",
                boxShadow: `0 3px 6px ${verdeLimaoSuave}33`,
                transition: "box-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 6px 15px ${verdeLimaoSuave}88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 3px 6px ${verdeLimaoSuave}33`;
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{titulo}</h3>
              <p style={{ margin: "4px 0", color: "#222" }}>
                <strong>Autor:</strong> {autor}
              </p>
              <p style={{ margin: "4px 0", color: "#222" }}>
                <strong>Área:</strong> {area}
              </p>
              <p style={{ margin: "4px 0", color: "#555", fontStyle: "italic" }}>
                Ano: {ano}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
