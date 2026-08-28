export default function Pagina() {
  return (
    <main className="seccion contenedor">
      <p className="etiqueta">Verificación de build</p>
      <h1 className="titular-1 mt-4 text-navy">Andamio</h1>
      <p className="bajada mt-4 max-w-xl">
        Página temporal para verificar tipografías, tokens y compilación.
      </p>
      <div className="mt-8 flex gap-3">
        <span className="boton boton-primario">Primario</span>
        <span className="boton boton-secundario">Secundario</span>
      </div>
    </main>
  )
}
