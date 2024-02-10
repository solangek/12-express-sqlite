(function () {

    const ERR_GENERAL = "Som error occured, please try again later.";

    /**
     * example of fetch based on async/await syntax
     * More readable code: The code reads more like synchronous code, improving readability and maintainability.
     * Cleaner error handling: The try...catch block provides a centralized way to handle errors, making the code more concise and less prone to error chains.
     * @returns {Promise<void>}
     */
    async function fetchAndDisplayContacts() {
        const dataElement = document.getElementById("data")
        try {
            const response = await fetch('./api/contacts');

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            const html = data.map((item) => `<li> Name: ${item.firstName} ${item.lastName}, Email: ${item.email}, Phone: ${item.phone}</li>`).join('');
            dataElement.innerHTML = html;

        } catch (err) {
            dataElement.innerHTML = `${ERR_GENERAL} ${err.message}`;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("getdata").addEventListener("click", fetchAndDisplayContacts)
    });

})();