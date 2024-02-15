(function () {

    const ERR_GENERAL = "Some error occured, please try again later.";

    /**
     * example of fetch based on async/await syntax
     * More readable code: The code reads more like synchronous code, improving readability and maintainability.
     * Cleaner error handling: The try...catch block provides a centralized way to handle errors, making the code more concise and less prone to error chains.
     */
    async function fetchAndDisplayContacts() {
        const dataElement = document.getElementById("data")
        try {
            const response = await fetch('./api/contacts');
            if (response.status !== 200)
                throw new Error(response.statusText);

            const data = await response.json();
            dataElement.innerHTML = data.map((item) => `<li> Name: ${item.firstName} ${item.lastName}, Email: ${item.email}, Phone: ${item.phone}</li>`).join('');

        } catch (err) {
            dataElement.innerHTML = `${ERR_GENERAL} ${err.message}`;
        }
    }

    // same function with fetch and then syntax
    function fetchAndDisplayContactsThen() {
        fetch('./api/contacts')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                document.getElementById("data").innerHTML = data.map((item) => `<li> Name: ${item.firstName} ${item.lastName}, Email: ${item.email}, Phone: ${item.phone}</li>`).join('');
            })
            .catch((err) => {
                document.getElementById("data").innerHTML = `${ERR_GENERAL} ${err.message}`;
            });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("getdata").addEventListener("click", fetchAndDisplayContacts)
    });

})();