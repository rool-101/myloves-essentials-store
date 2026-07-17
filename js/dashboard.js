alert("NEW DASHBOARD.JS LOADED");

const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const status = document.getElementById("status");

async function loadProducts() {

    const table = document.getElementById("productTable");

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    table.innerHTML = "";

    if (error) {
        table.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
        return;
    }

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="5">No products yet.</td></tr>`;
        return;
    }

    data.forEach(product => {

        table.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>R${product.price}</td>
            <td>${product.stock}</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
        `;

    });

}

document.getElementById("saveProduct").addEventListener("click", async () => {

    status.textContent = "Saving product...";

    const name = document.getElementById("name").value.trim();
    const price = Number(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const stock = Number(document.getElementById("stock").value);
    const description = document.getElementById("description").value.trim();

    const { error } = await supabase
        .from("products")
        .insert([
            {
                name,
                price,
                category,
                stock,
                description,
                featured: false
            }
        ]);

    if (error) {
        alert(error.message);
        status.textContent = error.message;
        return;
    }

    status.textContent = "✅ Product saved successfully!";

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("description").value = "";

    loadProducts();

});

loadProducts();
