const form = document.getElementById('intake-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.consent = formData.get('consent') === 'on';

    console.log('Submitting patient data:', data);

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';

    try {
        const response = await fetch('/api/register-patient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) 
        });

        const result = await response.json();

        if (response.ok) {
            alert(`${result.message}`);
            form.reset();
        } else {
            alert(`Error: ${result.message || 'Something went wrong.'}`);
        }

    } catch (error) {
        console.error('Fetch error:', error);
        alert('Could not connect to the server. Please try again.');
    } finally {

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = 'Create Patient Account';
    }
});