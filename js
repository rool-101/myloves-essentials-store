const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadProducts() {
    const grid = document.getElementById("product-grid");

    try {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("id", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            grid.innerHTML = "<p>No products available.</p>";
            return;
        }

        grid.innerHTML = "";

        data.forEach(product => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${product.image || 'https://placehold.co/400x400?text=MyLove%27s+Essentials'}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p><strong>R${product.price}</strong></p>
                    <p>${product.description || ""}</p>
                    <a href="#" class="btn">Add to Cart</a>
                </div>
            `;
        });

    } catch (err) {
        console.error(err);
        grid.innerHTML = "<p>Unable to load products.</p>";
    }
}

loadProducts();
