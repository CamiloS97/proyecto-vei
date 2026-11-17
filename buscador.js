document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.querySelector(".results");
  const cards = Array.from(document.querySelectorAll(".card"));
  const filterGroups = Array.from(document.querySelectorAll(".filters .group"));
  const sortButton = document.querySelector(".sort");
  const resultsTitle = document.querySelector(".results-top h2");

  if (!resultsContainer || cards.length === 0) {
    console.warn("No se encontraron las tarjetas del buscador.");
    return;
  }

  // Guardamos el orden original de las tarjetas.
  cards.forEach((card, index) => {
    card.dataset.originalOrder = index;
  });

  // FILTROS
  const activeFilterGroups = filterGroups.slice(0, 2);

  function filterCards() {
    const selectedGroups = activeFilterGroups.map(group => {
      return Array.from(
        group.querySelectorAll('input[type="checkbox"]:checked')
      ).map(checkbox =>
        checkbox.closest("label").textContent.trim().toLowerCase()
      );
    });
    const selectedPrice = document.querySelector("#priceFilter").value;
const selectedDay = document.querySelector("#dayFilter").value;

    let visibleCount = 0;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();

const matchesGroups = selectedGroups.every(options => {
    if (options.length === 0) return true;

    return options.some(option => text.includes(option));
});

const price = Number(card.dataset.price);
const days = card.dataset.days || "";

const matchesPrice =
    selectedPrice === "" ||
    (selectedPrice === "low" && price <= 7500) ||
    (selectedPrice === "medium" && price > 7500 && price <= 8500) ||
    (selectedPrice === "high" && price > 8500);

const matchesDay =
    selectedDay === "" || days.includes(selectedDay);

const matches = matchesGroups && matchesPrice && matchesDay;

     if (matches) {
    card.hidden = false;
    card.style.display = "";
} else {
    card.hidden = true;
    card.style.display = "none";
}

      if (matches) visibleCount++;
    });

    resultsTitle.textContent =
      `${visibleCount} ${visibleCount === 1
        ? "clase particular encontrada"
        : "clases particulares encontradas"}`;

    showEmptyMessage(visibleCount);
  }

  function showEmptyMessage(count) {
    let message = resultsContainer.querySelector(".no-results");

    if (count === 0) {
      if (!message) {
        message = document.createElement("p");
        message.className = "no-results";
        message.textContent =
          "No encontramos clases con esos filtros. Probá modificar tu búsqueda.";

        resultsContainer.appendChild(message);
      }
    } else if (message) {
      message.remove();
    }
  }

  activeFilterGroups.forEach(group => {
    group.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", filterCards);
    });
  });
  document.querySelector("#priceFilter")
    .addEventListener("change", filterCards);

document.querySelector("#dayFilter")
    .addEventListener("change", filterCards);

  // ORDENAMIENTO
  function getPrice(card) {
    const text = card.querySelector(".price").textContent;
    return Number(text.replace(/[^\d]/g, "")) || 0;
  }

 function getRating(card) {
    const text = card.querySelector(".rating").textContent;
    return Number(text.replace(",", ".").match(/\d+(\.\d+)?/)?.[0]) || 0;
}
  const sortModes = [
    {
      name: "Relevancia",
      compare: (a, b) =>
        Number(a.dataset.originalOrder) -
        Number(b.dataset.originalOrder)
    },
    {
      name: "Menor precio",
      compare: (a, b) => getPrice(a) - getPrice(b)
    },
    {
      name: "Mayor precio",
      compare: (a, b) => getPrice(b) - getPrice(a)
    },
    {
      name: "Mejor valoradas",
      compare: (a, b) => getRating(b) - getRating(a)
    }
  ];

  let currentSort = 0;

  sortButton.addEventListener("click", () => {
    currentSort = (currentSort + 1) % sortModes.length;

    const mode = sortModes[currentSort];

    cards
      .slice()
      .sort(mode.compare)
      .forEach(card => {
        resultsContainer.insertBefore(
          card,
          resultsContainer.querySelector(".pagination")
        );
      });

    sortButton.textContent = `Ordenar por: ${mode.name} ↻`;

    filterCards();
  });

  filterCards();

});
