window.hbspt = {
    forms: {
        create({target}) {
            const form = document.createElement('form');
            form.setAttribute('aria-label', 'Contact form');
            form.className = 'blog-visual-contact-form';
            form.innerHTML = `
                <style>
                    .blog-visual-contact-form { display: grid; gap: 16px; }
                    .blog-visual-contact-form label { display: grid; gap: 4px; }
                    .blog-visual-contact-form :is(input, textarea) {
                        box-sizing: border-box;
                        padding: 8px;
                        border: 1px solid #b9c5d0;
                        border-radius: 4px;
                        background: #f6f8fa;
                        font: inherit;
                    }
                    .blog-visual-contact-form textarea { min-height: 80px; resize: none; }
                    .blog-visual-contact-form button {
                        justify-self: start;
                        padding: 8px 16px;
                        border: 1px solid #0058c9;
                        border-radius: 4px;
                        background: #0058c9;
                        color: white;
                        font: inherit;
                    }
                </style>
                <label>Email <input name="email" type="email" required></label>
                <label>First name <input name="firstName"></label>
                <label>Last name <input name="lastName"></label>
                <label>Message <textarea name="message"></textarea></label>
                <button type="submit">Submit</button>
            `;
            form.addEventListener('submit', (event) => event.preventDefault());
            document.querySelector(target).append(form);
        },
    },
};
