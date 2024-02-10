(function () {

    const ERR_GENERAL = "Som error occured, please try again later.";

    async function fetchAndDisplayContacts() {
        const dataElement = document.getElementById("data")
        try {
            const response = await fetch('./api/contacts');

            if (response.status !== 200) {
                throw new Error(`ERR_GENERAL ${response.status}`);
            }

            const data = await response.json();

            const html = data.map((item) => `<li> Name: ${item.firstName} ${item.lastName}, Phone: ${item.phone}</li>`).join('');
            dataElement.innerHTML = html;

        } catch (err) {
            dataElement.innerHTML = `${ERR_GENERAL} ${err.message}`;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("getdata").addEventListener("click", fetchAndDisplayContacts)
    });

})();