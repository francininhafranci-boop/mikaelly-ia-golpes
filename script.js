document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const botaoAnterior = document.getElementById("anterior");
  const botaoProximo = document.getElementById("proximo");
  const contador = document.getElementById("contador");
  const progresso = document.getElementById("progresso");
  const pontos = document.getElementById("pontos");

  let slideAtual = 0;

  function mostrarSlide(indice) {
    // Mantém o índice dentro dos limites da apresentação.
    slideAtual = Math.max(0, Math.min(indice, slides.length - 1));

    slides.forEach((slide, i) => {
      const ativo = i === slideAtual;

      slide.classList.toggle("ativa", ativo);
      slide.setAttribute("aria-hidden", String(!ativo));
    });

    // Atualiza o contador: 01 / 07, 02 / 07...
    contador.textContent =
      `${String(slideAtual + 1).padStart(2, "0")} / ` +
      `${String(slides.length).padStart(2, "0")}`;

    // Atualiza a barra de progresso.
    const porcentagem = ((slideAtual + 1) / slides.length) * 100;
    progresso.style.width = `${porcentagem}%`;

    // Atualiza os indicadores dos slides.
    pontos.textContent = slides
      .map((_, i) => (i === slideAtual ? "●" : "○"))
      .join(" ");

    // Desativa os botões nos extremos.
    botaoAnterior.disabled = slideAtual === 0;
    botaoProximo.disabled = slideAtual === slides.length - 1;

    // Troca o texto do botão no último slide.
    if (slideAtual === slides.length - 1) {
      botaoProximo.textContent = "Fim ✓";
    } else {
      botaoProximo.textContent = "Próximo →";
    }

    // Volta ao início da página ao mudar de slide.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  botaoAnterior.addEventListener("click", () => {
    mostrarSlide(slideAtual - 1);
  });

  botaoProximo.addEventListener("click", () => {
    mostrarSlide(slideAtual + 1);
  });

  // Permite navegar com as setas do teclado.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowRight" || evento.key === "PageDown") {
      mostrarSlide(slideAtual + 1);
    }

    if (evento.key === "ArrowLeft" || evento.key === "PageUp") {
      mostrarSlide(slideAtual - 1);
    }

    if (evento.key === "Home") {
      mostrarSlide(0);
    }

    if (evento.key === "End") {
      mostrarSlide(slides.length - 1);
    }
  });

  // Mostra o primeiro slide quando a página abre.
  mostrarSlide(0);
});