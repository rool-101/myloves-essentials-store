const SUPABASE_URL = "https://akuiyfasztszalelihvi.supabase.co";
const SUPABASE_KEY = "sb_publishable_LNCF4fhHCcJUNW1y_vuoIg_eBBLkkPv";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.textContent = "Signing in...";

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        message.textContent = error.message;
    } else {
        message.textContent = "Login successful!";
        window.location.href = "dashboard.html";
    }
});
