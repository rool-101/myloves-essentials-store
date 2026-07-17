console.log("ADMIN JS LOADED");

const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document.getElementById("loginBtn").addEventListener("click", async () => {

    alert("LOGIN STARTED");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.textContent = "Signing in...";

    console.log("Email:", email);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    console.log("Supabase response:", data, error);

    if (error) {
        message.textContent = error.message;
        alert(error.message);
        return;
    }

    alert("LOGIN SUCCESS");

    window.location.href = "dashboard.html";

});
