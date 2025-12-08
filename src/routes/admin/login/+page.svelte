<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<div class="login-container">
    <h2>🔒 Admin Access</h2>
    <p>Enter the master password to access the Youth Voices KE Dashboard.</p>

    <form method="POST" class="login-form">
        <label for="password">Password</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter Admin Password" 
            required 
            class:input-error={form?.incorrect}
        />

        {#if form?.incorrect}
            <p class="error-message">Incorrect password. Access denied.</p>
        {/if}

        <button type="submit" class="button-primary login-btn">Log In</button>
    </form>
</div>

<style>
    .login-container {
        max-width: 400px;
        margin: 80px auto;
        padding: 30px;
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    .login-container h2 {
        color: var(--color-primary-accent);
        margin-bottom: 20px;
    }
    .login-form {
        text-align: left;
        margin-top: 20px;
    }
    .login-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
    }
    .login-form input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid var(--color-border-light);
        border-radius: 4px;
        box-sizing: border-box;
    }
    .login-btn {
        width: 100%;
        margin-top: 10px;
    }
    .error-message {
        color: var(--color-secondary-accent);
        font-size: 0.9em;
        margin-bottom: 10px;
    }
    .input-error {
        border-color: var(--color-secondary-accent) !important;
    }
</style>