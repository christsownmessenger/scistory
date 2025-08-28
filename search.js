document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const searchBtn = document.getElementById("searchBtn");

  if (searchBox && searchBtn) {
    // Homepage: redirect to search page with query
    function doSearch() {
      const query = searchBox.value.trim();
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    }

    searchBtn.addEventListener("click", doSearch);
    searchBox.addEventListener("keyup", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }

  // On search.html, fetch JSON and show results
  const resultsContainer = document.getElementById("results");
  if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.toLowerCase();

    fetch("articles.json")
      .then(res => res.json())
      .then(articles => {
        const filtered = articles.filter(article =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
          resultsContainer.innerHTML = filtered.map(article => `
            <article class="article">
              <div class="meta">
                <a href="${article.url}"><strong>${article.title}</strong></a>
                <small>${article.category} • ${article.date}</small>
                <p>${article.description}</p>
              </div>
            </article>
          `).join("");
        } else {
          resultsContainer.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
        }
      });
  }
});
