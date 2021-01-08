import React from 'react'

export default function ForgotPasswordPage() {
    const sendEmail = async (e) => {
        e.preventDefault();
        const input = {
            email: e.target.email.value
        }
        const response = await fetch('/api/users/forgotpassword', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const data = response;
        if (response.ok) {
            console.log(data)
        }
    }
    
    return (
        <div>
            <h2>Password Reset Form</h2>
            <form onSubmit={sendEmail}>
                <label htmlFor="email">Enter email:</label>
                <input type="email" id="email" name="email" placeholder="email" required></input>
                <button>Send Email!</button>
            </form>
        </div>
    )
}
