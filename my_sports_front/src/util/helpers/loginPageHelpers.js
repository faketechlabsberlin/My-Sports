export const showPassword = () => {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    const eye = document.getElementById('eye');
    let view = eye.innerHTML === 'visibility' ? 'visibility_off' : 'visibility';
    eye.innerHTML = view;
}