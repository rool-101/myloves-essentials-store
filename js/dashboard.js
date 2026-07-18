const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const saveButton = document.getElementById("saveProduct");
const status = document.getElementById("status");
const table = document.getElementById("productTable");

async function loadProducts() {

    table.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        table.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
        return;
    }

    if (!data || data.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>No products found.</td></tr>";
        return;
    }

    table.innerHTML = "";

    data.forEach(product => {

        table.innerHTML += `
        <tr>
            <td>${product.name || ""}</td>
            <td>R ${product.price || 0}</td>
            <td>${product.stock || 0}</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
        `;

    });

}

saveButton.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();
    const stock = parseInt(document.getElementById("stock").value) || 0;
    const description = document.getElementById("description").value.trim();

    if (!name) {
        status.textContent = "Please enter a product name.";
        return;
    }

    status.textContent = "Saving product...";

    const { error } = await supabase
        .from("products")
        .insert([
            {
                name: name,
                price: price,
                category: category,
                stock: stock,
                description: description,
                featured: false
            }
        ]);

    if (error) {
        status.textContent = error.message;
        alert(error.message);
        return;
    }

    status.textContent = "✅ Product saved successfully.";

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("description").value = "";

    loadProducts();

});

loadProducts();
