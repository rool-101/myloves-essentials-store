const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const saveButton = document.getElementById("saveProduct");
const status = document.getElementById("status");

saveButton.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    status.textContent = "Saving product...";

    const { error } = await supabase
        .from("products")
        .insert([
            {
                name: name,
                price: price,
                category: category,
                description: description
            }
        ]);

    if (error) {
        status.textContent = error.message;
        return;
    }

    status.textContent = "Product saved successfully!";

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";

});
