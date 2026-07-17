document.getElementById("saveProduct").addEventListener("click", async () => {

    alert("Save started");

    try {

        const name = document.getElementById("name").value.trim();
        const price = Number(document.getElementById("price").value);
        const category = document.getElementById("category").value.trim();
        const stock = Number(document.getElementById("stock").value);
        const description = document.getElementById("description").value.trim();

        const { data, error } = await supabase
            .from("products")
            .insert([{
                name,
                price,
                category,
                stock,
                description,
                featured: false
            }])
            .select();

        if (error) {
            alert("Supabase Error: " + error.message);
            return;
        }

        alert("Product saved!");

    } catch (err) {

        alert("JavaScript Error: " + err.message);

    }

});
