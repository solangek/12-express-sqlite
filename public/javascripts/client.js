(function () {

    // the function that triggers an Ajax call
    function fetchAllData() {
        fetch('./api/contacts')
            .then(
                function (response) {
                    // handle the error
                    if (response.status !== 200) {
                        document.querySelector("#data").innerHTML = 'Looks like there was a problem. Status Code: ' +
                            response.status;
                        return;
                    }

                    // Examine the response and generate the HTML
                    response.json().then(function (data) {
                        if (data.error)
                            document.querySelector("#data").innerHTML = "Some error occured, is the database initialized?";
                        else {
                            let html = '';
                            data.forEach ( (item) => {
                                html += `<li> Name: ${item.firstName} ${item.lastName}, Phone: ${item.phone}`
                            })
                            // display the HTML
                            document.querySelector("#data").innerHTML = html;
                        }

                    });
                }
            )
            .catch(function (err) {
                // need to display error message!
                document.querySelector("#data").innerHTML = 'Error :' . err;
                console.log('Fetch Error :', err);
            });
    };

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector("#getdata").addEventListener("click", fetchAllData);
    }, false);

})();