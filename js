const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        console.error("Error loading products:", error);
        return;
    }

    console.log("Products:", data);
}

loadProducts();
